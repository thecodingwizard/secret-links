package server

// Link holds information about a secret link
type Link struct {
	AccessURL string `json:"accessURL"`
	Name      string `json:"name"`
	Link      string `json:"link"`
	Tag       string `json:"tag"`
}

// AddLinkData holds information needed to create a new secret link
type AddLinkData struct {
	AccessURL string `json:"accessURL"`
	Name      string `json:"name"`
	Link      string `json:"link"`
	Tag       string `json:"tag"`
	Password  string `json:"password"`
}

// LinksDatabase provides access to a database of links
type LinksDatabase struct{}

// LinkPassword contains the password to decrypt the link
type LinkPassword struct {
	Password string `json:"password"`
}
