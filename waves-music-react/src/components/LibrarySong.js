import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons"
import "animate.css"

const LibrarySong = ({
  song,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song)
    if (isPlaying) audioRef.current.play()
  }

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song${song.id === currentSong.id ? " selected" : ""}`}
    >
      <img src={song.cover} alt={song.album + " album cover"} />
      <div className="song-description">
        <h3>
          {song.name}
          {isPlaying && currentSong === song ? (
            <FontAwesomeIcon className="animated pulse" icon={faVolumeUp} />
          ) : null}
        </h3>
        <h4>{song.artist}</h4>
      </div>
      {/* <h4>{song.album}</h4> */}
    </div>
  )
}

export default LibrarySong
