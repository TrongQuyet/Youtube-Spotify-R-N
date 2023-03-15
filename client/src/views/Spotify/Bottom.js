import React, { useState } from 'react';
import SpotifyPlayer from "react-spotify-web-playback";
import { FaStepBackward, FaPlay, FaPause, FaStepForward, FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import "./scss/Bottom.scss"
function Bottom(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  // const [trackUri, setTrackUri] = useState("spotify:track:3n3Ppam7vgaVa1iaRUc9Lp");

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Code để phát hoặc tạm dừng bài hát
  };

  const handlePrev = () => {
    // Code để chuyển đến bài hát trước đó
  };

  const handleNext = () => {
    // Code để chuyển đến bài hát tiếp theo
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    // Code để thay đổi âm lượng
  };

  const handleMute = () => {
    setVolume(0);
    // Code để tắt âm thanh
  };

  return (
    
    <div className="bottombar">
     {/* <SpotifyPlayer
        token="BQCSZwqof6UsuSOH3g6JA5UPNQHqtSxzzimecHUmQ4sPj4pUPN7IS-qFv7fQkbtzgsYF73hbr6NdsD5F2PhoXtjeHice2v_NG-EYV0ARWz6zxfc92SIc"
        uris={[trackUri]}
        play={isPlaying}
        volume={volume}
        callback={(state) => {
          if (!state.isPlaying) {
            setIsPlaying(false);
          }
        }}
      /> */}
      <div className="bottombar-left">
        <div className="bottombar-info">
          <h4></h4>
          <p></p>
        </div>
      </div>
      <div className="bottombar-center">
        <button className="prev-btn" onClick={handlePrev}>
          <FaStepBackward />
        </button>
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="next-btn" onClick={handleNext}>
          <FaStepForward />
        </button>
      </div>
      <div className="bottombar-right">
        <button className="volume-btn" onClick={handleMute}>
          {volume === 0 ? <FaVolumeMute /> : volume < 50 ? <FaVolumeDown /> : <FaVolumeUp />}
        </button>
        <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className="volume-slider" />
      </div>
    </div>
  );
}

export default Bottom;