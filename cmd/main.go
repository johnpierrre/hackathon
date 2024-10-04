package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"github.com/johnpierrre/hackathon/cmd/api"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/api/resize", api.HandleVideoResize).Methods(http.MethodPost)

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"exp://x15yc3a-anonymous-8081.exp.direct"}),
		handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS", "DELETE"}),
		handlers.AllowedHeaders([]string{"Content-Type"}),
		handlers.AllowCredentials(),
	)(router)

	err := http.ListenAndServe(":8080", corsHandler)
	if err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
