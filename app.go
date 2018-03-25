package main

import (
	"log"
	"net/http"

	"github.com/labstack/echo"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

func main() {
	e := echo.New()

	e.GET("/api/links/:url", getLink)
	e.POST("/api/links", addLink)

	http.Handle("/", e)
	appengine.Main()
}

func getLink(c echo.Context) error {
	url := c.Param("url")
	link := dbGetLink(url, c.Request())
	return c.JSON(http.StatusOK, link)
}

func addLink(c echo.Context) error {
	link := new(Link)
	if err := c.Bind(link); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid Data")
	}

	log.Print(link)

	if _, err := dbAddLink(link, c.Request()); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "OK")
}

func dbAddLink(link *Link, r *http.Request) (*datastore.Key, error) {
	ctx := appengine.NewContext(r)

	return datastore.Put(ctx, datastore.NewIncompleteKey(ctx, "Link", nil), link)
}

func dbGetLink(url string, r *http.Request) *[]Link {
	ctx := appengine.NewContext(r)

	q := datastore.NewQuery("Link").Filter("URL =", "google")
	var result []Link
	if _, err := q.GetAll(ctx, &result); err != nil {
		log.Println("datastore error", err.Error())
		return nil
	}

	if len(result) < 1 {
		return nil
	}

	return &result
}
