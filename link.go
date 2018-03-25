package main

// Link holds information about a secret link
type Link struct {
	URL  string `json:"url"`
	Name string `json:"name"`
	Link string `json:"link"`
}

// LinksDatabase provides access to a database of links
type LinksDatabase struct{}
