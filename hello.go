package main

import (
	"net/http"

	"github.com/labstack/echo"
	"google.golang.org/appengine"
)

func main() {
	e := echo.New()

	e.GET("/", handle)

	http.Handle("/", e)
	appengine.Main()
}

func handle(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
