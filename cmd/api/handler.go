package api

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func HandleMemeCreation(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20) // 10 MB max file size
	if err != nil {
		http.Error(w, "Error parsing form", http.StatusInternalServerError)
		return
	}

	file, _, err := r.FormFile("video")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	// Save the video to a local file
	outFile, err := os.Create("./uploads/video.mp4")
	if err != nil {
		http.Error(w, "Error saving the file", http.StatusInternalServerError)
		return
	}
	defer outFile.Close()

	_, err = io.Copy(outFile, file)
	if err != nil {
		http.Error(w, "Error saving the file", http.StatusInternalServerError)
		return
	}

	// Get the text overlay from the request
	text := r.FormValue("text")

	// For now, just print the details (later, this will be processed)
	fmt.Printf("Received video file and text: %s\n", text)

	// Respond with success
	w.Write([]byte("Meme created successfully!"))
}
