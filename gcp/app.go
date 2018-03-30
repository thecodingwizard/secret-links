package main

import (
	"net/http"

	"github.com/thecodingwizard/secret-links/server"

	"google.golang.org/appengine"
)

func main() {
	e := server.GetInstance()

	http.Handle("/", e)
	appengine.Main()
}
