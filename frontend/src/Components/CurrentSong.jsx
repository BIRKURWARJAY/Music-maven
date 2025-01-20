const CurrentSong = ({ currentSong }) => {
  return (
    <>
      <div className="current-song p-2 bg-rose-400 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={currentSong.image} alt={currentSong.name} className="size-16" />
          <div className="current-song-info">
            <marquee>
            <h3 className="text-lg font-bold">{currentSong.name}</h3>
            </marquee>
            <p className="text-sm">{currentSong.artist}</p>
          </div>
        </div>
        <div>
          <input type="checkbox" className="size-4" />
          <i className="fas fa-pause"></i>
        </div>
      </div>  
    </>
  );
}

export default CurrentSong;