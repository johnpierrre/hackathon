package main

import (
	"fmt"
	"net/http"

	"github.com/johnpierrre/hackathon/cmd/api"
)

func main() {
	http.Handle("/uploads/", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	// Route for meme creation, using the api package
	http.HandleFunc("/api/meme", api.HandleMemeCreation)

	fmt.Println("Server listening on port 8080...")
	http.ListenAndServe(":8080", nil)
}
