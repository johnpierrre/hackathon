import React, { useState } from 'react';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [textOverlay, setTextOverlay] = useState('');

  const handleVideoUpload = (e) => {
    setVideoFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleTextChange = (e) => {
    setTextOverlay(e.target.value);
  };

  const handleSubmit = async () => {
    // send data to the backend (video frames, text...)
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('text', textOverlay);

    await fetch('http://localhost:8080/api/meme', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className="App">
      <h1>Memifier</h1>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {videoFile && (
        <div>
          <video controls width="500">
            <source src={videoFile} type="video/mp4" />
          </video>
        </div>
      )}
      <input
        type="text"
        placeholder="Enter meme text"
        value={textOverlay}
        onChange={handleTextChange}
      />
      <button onClick={handleSubmit}>Create Meme</button>
    </div>
  );
}

export default App;
