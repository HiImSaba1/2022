import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons"

const Player = ({
  songs,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
  // Event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const getTime = time => {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
  }

  const dragHandler = e => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }

  const skipTrackHandler = async direction => {
    let currentIndex = songs.indexOf(currentSong)
    if (direction === "skip-back") {
      await setCurrentSong(
        songs[currentIndex <= 0 ? songs.length - 1 : currentIndex - 1]
      )
      if (isPlaying) audioRef.current.play()
    }
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      if (isPlaying) audioRef.current.play()
    }
  }

  // Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage})`,
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>
          {songInfo.duration ? (
            getTime(songInfo.duration)
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin />
          )}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          icon={faStepBackward}
          size="lg"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          icon={faStepForward}
          size="lg"
        />
      </div>
    </div>
  )
}

export default Player
