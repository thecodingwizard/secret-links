package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha1"
	"encoding/base64"
	"errors"
	"io"
	"net/http"

	"github.com/labstack/echo"
	"golang.org/x/crypto/pbkdf2"
	"google.golang.org/appengine"
)

// DB is the Google Datastore interface
var DB = LinksDatabase{}

func main() {
	e := echo.New()

	e.POST("/api/links/:url", getLink)
	e.POST("/api/links", addLink)

	http.Handle("/", e)
	appengine.Main()
}

func getLink(c echo.Context) error {
	url := c.Param("url")
	pass := new(LinkPassword)
	if err := c.Bind(pass); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	link, err := DB.getLinkWithURL(url, c.Request())
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}
	if link != nil {
		if err := decryptLink(link, pass.Password); err != nil {
			return c.String(http.StatusUnauthorized, err.Error())
		}
	}

	return c.JSON(http.StatusOK, link)
}

func addLink(c echo.Context) error {
	linkData := new(AddLinkData)
	if err := c.Bind(linkData); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid Data")
	}

	link := &Link{
		URL:  linkData.URL,
		Name: linkData.Name,
		Link: linkData.Link,
	}
	if err := encryptLink(link, linkData.Password); err != nil {
		return c.JSON(http.StatusBadRequest, "Error during encryption")
	}

	if _, err := DB.addLink(link, c.Request()); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "OK")
}

func encryptLink(link *Link, pass string) error {
	plaintext := link.Link
	key := keyFromPass(pass)
	encrypted, err := encrypt(key, plaintext)

	if encrypted == "" || err != nil {
		return errors.New("Error during encryption")
	}

	link.Link = encrypted

	return nil
}

func decryptLink(link *Link, pass string) error {
	encrypted := link.Link
	key := keyFromPass(pass)
	decrypted, err := decrypt(key, encrypted)

	if decrypted == "" || err != nil {
		return errors.New("Error during decryption")
	}

	link.Link = decrypted
	return nil
}

func keyFromPass(pass string) []byte {
	dk := pbkdf2.Key([]byte(pass), []byte("012345678901234567890123456789012"), 4096, 32, sha1.New)
	return dk
}

func encrypt(key []byte, message string) (encmess string, err error) {
	plainText := []byte(message)

	block, err := aes.NewCipher(key)
	if err != nil {
		return
	}

	//IV needs to be unique, but doesn't have to be secure.
	//It's common to put it at the beginning of the ciphertext.
	cipherText := make([]byte, aes.BlockSize+len(plainText))
	iv := cipherText[:aes.BlockSize]
	if _, err = io.ReadFull(rand.Reader, iv); err != nil {
		return
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(cipherText[aes.BlockSize:], plainText)

	//returns to base64 encoded string
	encmess = base64.URLEncoding.EncodeToString(cipherText)
	return
}

func decrypt(key []byte, securemess string) (decodedmess string, err error) {
	cipherText, err := base64.URLEncoding.DecodeString(securemess)
	if err != nil {
		return
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return
	}

	if len(cipherText) < aes.BlockSize {
		err = errors.New("ciphertext block size is too short")
		return
	}

	//IV needs to be unique, but doesn't have to be secure.
	//It's common to put it at the beginning of the ciphertext.
	iv := cipherText[:aes.BlockSize]
	cipherText = cipherText[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)
	// XORKeyStream can work in-place if the two arguments are the same.
	stream.XORKeyStream(cipherText, cipherText)

	decodedmess = string(cipherText)
	return
}
