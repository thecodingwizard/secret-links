package server

import (
	"net/http"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

func (db *LinksDatabase) getLinkWithURL(url string, r *http.Request) (*Link, error) {
	ctx := appengine.NewContext(r)

	q := datastore.NewQuery("Link").Filter("AccessURL =", url)
	var result []Link
	if _, err := q.GetAll(ctx, &result); err != nil {
		return nil, err
	}

	if len(result) < 1 {
		return nil, nil
	}

	return &result[0], nil
}

func (db *LinksDatabase) addLink(link *Link, r *http.Request) (*datastore.Key, error) {
	ctx := appengine.NewContext(r)

	return datastore.Put(ctx, datastore.NewIncompleteKey(ctx, "Link", nil), link)
}

func (db *LinksDatabase) getLinksWithTag(tag string, r *http.Request) (*[]Link, error) {
	ctx := appengine.NewContext(r)

	q := datastore.NewQuery("Link").Filter("Tag =", tag)
	var result []Link
	if _, err := q.GetAll(ctx, &result); err != nil {
		return nil, err
	}

	return &result, nil
}

func (db *LinksDatabase) linkExists(accessURL string, r *http.Request) (bool, error) {
	response, err := db.getLinkWithURL(accessURL, r)
	return response != nil, err
}
