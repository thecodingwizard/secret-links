package main

import (
	"log"

	"cloud.google.com/go/datastore"

	"golang.org/x/net/context"
)

func init() {
	DB, err := configureDatastoreDB("<your-project-id>")

	if err != nil {
		log.Fatal(err)
	}
}

func configureDatastoreDB(projectID string) (LinksDatabase, error) {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, projectID)
	if err != nil {
		return nil, err
	}
	return newDatastoreDB(client)
}
