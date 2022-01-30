const Song = ({currentSong}) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.album + ' album cover'} />
      <h2 style={{color: currentSong.color[0]}} >{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
      {/* <h3>{currentSong.album}</h3> */}
    </div>
  )
}

export default Song
