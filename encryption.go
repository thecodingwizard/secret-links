package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha1"
	"encoding/base64"
	"errors"
	"io"
	"strings"

	"golang.org/x/crypto/pbkdf2"
)

// EncryptLink encrypts a given link with a given password
func EncryptLink(link *Link, pass string) error {
	plaintext := CheckString + link.Link
	key := keyFromPass(pass)
	encrypted, err := encrypt(key, plaintext)

	if encrypted == "" || err != nil {
		return errors.New("Error during encryption")
	}

	link.Link = encrypted

	return nil
}

// DecryptLink decrypts a given link with a given password
func DecryptLink(link *Link, pass string) error {
	encrypted := link.Link
	key := keyFromPass(pass)
	decrypted, err := decrypt(key, encrypted)

	if decrypted == "" || err != nil {
		return errors.New("Error during decryption")
	}

	if !strings.HasPrefix(decrypted, CheckString) {
		return errors.New("Invalid password")
	}

	link.Link = strings.TrimPrefix(decrypted, CheckString)
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

	// IV needs to be unique, but doesn't have to be secure.
	// It's common to put it at the beginning of the ciphertext.
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

	// IV needs to be unique, but doesn't have to be secure.
	// It's common to put it at the beginning of the ciphertext.
	iv := cipherText[:aes.BlockSize]
	cipherText = cipherText[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)
	// XORKeyStream can work in-place if the two arguments are the same.
	stream.XORKeyStream(cipherText, cipherText)

	decodedmess = string(cipherText)
	return
}
