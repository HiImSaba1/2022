import { useState, useRef } from "react"
import "./styles/app.scss" // all styles
import Player from "./components/Player"
import Song from "./components/Song"
import Library from "./components/Library"
import Nav from "./components/Nav"
import data from "./data"

function App() {
  // HTML reference
  const audioRef = useRef(null)

  //state
  const [songs] = useState(data())
  const [currentSong, setCurrentSong] = useState(
    songs[Math.floor(Math.random() * songs.length)]
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  })
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // functions
  const timeUpdateHandler = e => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    const animationPercentage = (currentTime / duration) * 100 + "%"

    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage })
  }

  const songEndHandler = async () => {
    let currentIndex = songs.indexOf(currentSong)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if (isPlaying) audioRef.current.play()
  }

  return (
    <div
      className={`App${libraryOpen ? " active" : ""}${
        darkMode ? " dark-mode" : ""
      }`}
      onDoubleClick={() => setDarkMode(!darkMode)}
    >
      <div className="main-container">
        <Nav
          libraryOpen={libraryOpen}
          setLibraryOpen={setLibraryOpen}
          audioRef={audioRef}
        />
        <Song currentSong={currentSong} />
        <Player
          songs={songs}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
        />
        <p className="mode-instructions">
          Double click anywhere for{" "}
          <strong>{!darkMode ? "dark mode." : "light mode."}</strong>
        </p>
      </div>
      <Library
        audioRef={audioRef}
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        libraryOpen={libraryOpen}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  )
}

export default App
