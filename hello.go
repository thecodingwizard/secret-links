package main

import (
	"net/http"

	"github.com/labstack/echo"
	"google.golang.org/appengine"
)

func main() {
	e := echo.New()

	e.GET("/api/links/:id", getLink)

	http.Handle("/", e)
	appengine.Main()
}

func getLink(c echo.Context) error {
	id := c.Param("id")
	return c.String(http.StatusOK, "Hello, World! You are requesting "+id)
}
