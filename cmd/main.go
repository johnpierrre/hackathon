package main

import (
	"fmt"
	"main/api"
	"net/http"
)

func main() {

	http.Handle("/uploads/", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	http.HandleFunc("/api/meme", api.HandleMemeCreation)

	fmt.Println("Server listening on port 8080...")
	http.ListenAndServe(":8080", nil)
}
