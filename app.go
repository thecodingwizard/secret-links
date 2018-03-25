package main

import (
	"log"
	"net/http"

	"github.com/labstack/echo"
	"google.golang.org/appengine"
)

// DB is the Google Datastore interface
var DB = LinksDatabase{}

// CheckString will be prepended to every link before encryption.
// After encryption, if CheckString is not at the beginning of the result,
// the decryption has failed (incorrect password).
const CheckString = "check"

func main() {
	e := echo.New()

	e.POST("/api/links/:query", getLink)
	e.POST("/api/links", addLink)
	e.GET("/api/links/:query", getLinksWithTag)

	http.Handle("/", e)
	appengine.Main()
}

func getLink(c echo.Context) error {
	url := c.Param("query")
	pass := new(LinkPassword)
	if err := c.Bind(pass); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	link, err := DB.getLinkWithURL(url, c.Request())
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}
	if link != nil {
		if err := DecryptLink(link, pass.Password); err != nil {
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
		AccessURL: linkData.AccessURL,
		Name:      linkData.Name,
		Link:      linkData.Link,
		Tag:       linkData.Tag,
	}
	if err := EncryptLink(link, linkData.Password); err != nil {
		return c.JSON(http.StatusBadRequest, "Error during encryption")
	}

	if _, err := DB.addLink(link, c.Request()); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "OK")
}

func getLinksWithTag(c echo.Context) error {
	tag := c.Param("query")
	log.Println(tag)
	links, err := DB.getLinksWithTag(tag, c.Request())

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, links)
}
