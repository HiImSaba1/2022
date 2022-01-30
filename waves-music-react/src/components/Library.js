import LibrarySong from "./LibrarySong"

const Library = ({ songs, currentSong, setCurrentSong, audioRef, isPlaying, libraryOpen }) => {
  return (
    <div className={`library${libraryOpen ? ' active' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong
            song={song}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
