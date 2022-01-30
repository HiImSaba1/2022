import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMusic,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Nav = ({ libraryOpen, setLibraryOpen, audioRef }) => {
  const [volume, setVolume] = useState(1.0)
  const [prevVolume, setPrevVolume] = useState(null)
  if (audioRef.current) audioRef.current.volume = volume

  const volumeIcon = () => {
    if (volume === 0) return faVolumeMute
    if (volume > 0 && volume < 0.5) return faVolumeDown
    if (volume >= 0.5) return faVolumeUp
  }

  const volumeToggle = () => {
    setPrevVolume(volume)
    volume > 0 ? setVolume(0) : setVolume(prevVolume)
  }

  const sliderOverlayStyle = {
    width: `${(volume * 100).toFixed(0)}%`,
  }

  return (
    <nav>
      <h1>Waves</h1>
      <div className="right-nav">
        <span className="volume">
          <div className="volume-slider">
            <div
              className="volume-slider-overlay"
              style={sliderOverlayStyle}
            ></div>
            <input
              type="range"
              value={(volume * 100).toFixed(0)}
              onChange={e => setVolume(e.target.value / 100)}
            ></input>
          </div>
          <FontAwesomeIcon
            icon={volumeIcon()}
            onClick={volumeToggle}
          />
        </span>
        <button onClick={() => setLibraryOpen(!libraryOpen)}>
          {!libraryOpen ? "Library" : "Close Library"}
          <FontAwesomeIcon icon={!libraryOpen ? faMusic : faTimes} />
        </button>
      </div>
    </nav>
  )
}

export default Nav
