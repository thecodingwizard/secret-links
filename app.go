package main

import (
	"net/http"

	"github.com/labstack/echo"
	"google.golang.org/appengine"
)

// DB is the Google Datastore interface
var DB = LinksDatabase{}

func main() {
	e := echo.New()

	e.GET("/api/links/:url", getLink)
	e.POST("/api/links", addLink)

	http.Handle("/", e)
	appengine.Main()
}

func getLink(c echo.Context) error {
	url := c.Param("url")

	link, err := DB.getLinksWithURL(url, c.Request())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, link)
}

func addLink(c echo.Context) error {
	link := new(Link)
	if err := c.Bind(link); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid Data")
	}

	if _, err := DB.addLink(link, c.Request()); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "OK")
}
