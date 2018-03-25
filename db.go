package main

import (
	"net/http"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

func (db *LinksDatabase) getLinksWithURL(url string, r *http.Request) (*[]Link, error) {
	ctx := appengine.NewContext(r)

	q := datastore.NewQuery("Link").Filter("URL =", "google")
	var result []Link
	if _, err := q.GetAll(ctx, &result); err != nil {
		return nil, err
	}

	return &result, nil
}

func (db *LinksDatabase) addLink(link *Link, r *http.Request) (*datastore.Key, error) {
	ctx := appengine.NewContext(r)

	return datastore.Put(ctx, datastore.NewIncompleteKey(ctx, "Link", nil), link)
}
