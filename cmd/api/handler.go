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

	// Parse the multipart form containing the video and text
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

	text := r.FormValue("text")

	//  just print the details (later, this will be processed)
	fmt.Printf("Received video file and text: %s\n", text)

	w.Write([]byte("Meme created successfully!"))
}
