package main

// Link holds information about a secret link
type Link struct {
	URL  string `json:"url"`
	Name string `json:"name"`
	Link string `json:"link"`
}

// AddLinkData holds information needed to create a new secret link
type AddLinkData struct {
	URL      string `json:"url"`
	Name     string `json:"name"`
	Link     string `json:"link"`
	Password string `json:"password"`
}

// LinksDatabase provides access to a database of links
type LinksDatabase struct{}

// LinkPassword contains the password to decrypt the link
type LinkPassword struct {
	Password string `json:"password"`
}
