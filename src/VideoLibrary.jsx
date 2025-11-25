import { useState, useEffect } from 'react';

function VideoLibrary() {
  // Load saved videos
  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem("myVideos");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [url, setUrl] = useState("");

  // Save whenever list changes
  useEffect(() => {
    localStorage.setItem("myVideos", JSON.stringify(videos));
  }, [videos]);

  // Helper: Extract Video ID from URL (Standard or Shortened)
  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const addVideo = () => {
    const videoId = getYouTubeID(url);
    if (!videoId) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    
    // Check if already exists
    if (videos.some(v => v.videoId === videoId)) {
        alert("This video is already in your list!");
        return;
    }

    const newVideo = {
      id: Date.now(),
      videoId: videoId,
      link: url,
      date: new Date().toLocaleDateString()
    };

    setVideos([newVideo, ...videos]);
    setUrl(""); // Clear input
  };

  const deleteVideo = (id) => {
    if(window.confirm("Remove this video?")) {
        setVideos(videos.filter(v => v.id !== id));
    }
  };

  return (
    <div className="video-container">
      <h2>📺 My Playlist</h2>

      {/* Input Section */}
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Paste YouTube Link here..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={addVideo} className="add-btn">Save Video</button>
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {videos.map(video => (
          <div key={video.id} className="video-card">
            <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noreferrer">
                <img 
                  src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
                  alt="Thumbnail" 
                  className="thumbnail"
                />
            </a>
            <div className="video-info">
                <span>Added: {video.date}</span>
                <button onClick={() => deleteVideo(video.id)} className="delete-btn">🗑️</button>
            </div>
            <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noreferrer" className="play-link">
                Watch on YouTube ↗
            </a>
          </div>
        ))}
      </div>

      {videos.length === 0 && <p className="empty-msg">No videos saved yet.</p>}
    </div>
  );
}

export default VideoLibrary;