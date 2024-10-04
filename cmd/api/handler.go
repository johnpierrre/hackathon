package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"

	"io"
)

func HandleVideoResize(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	videoURL := r.FormValue("videoUrl")
	width := r.FormValue("width")
	height := r.FormValue("height")

	// Download the video file
	videoFile, err := downloadVideo(videoURL)
	if err != nil {
		http.Error(w, "Failed to download video", http.StatusInternalServerError)
		return
	}
	defer os.Remove(videoFile) // Clean up the video file

	// Define output file path
	outputFile := fmt.Sprintf("%s-resized.mp4", videoFile[:len(videoFile)-4])

	// Construct the FFmpeg command
	cmd := exec.Command("ffmpeg", "-i", videoFile, "-vf", fmt.Sprintf("scale=%s:%s", width, height), outputFile)
	if err := cmd.Run(); err != nil {
		http.Error(w, "Failed to resize video", http.StatusInternalServerError)
		return
	}
	defer os.Remove(outputFile) // Clean up the output file

	// Prepare the response
	response := map[string]interface{}{
		"status": "success",
		"uri":    outputFile,
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	json.NewEncoder(w).Encode(response)
}

func downloadVideo(url string) (string, error) {
	// Download the video file and save it locally
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Create a temporary file to store the downloaded video
	tmpFile, err := os.CreateTemp("", "video-*.mp4")
	if err != nil {
		return "", err
	}
	defer tmpFile.Close()

	// Write the downloaded video to the temporary file
	if _, err = io.Copy(tmpFile, resp.Body); err != nil {
		return "", err
	}

	return tmpFile.Name(), nil
}
