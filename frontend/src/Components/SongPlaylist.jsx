const SongPlaylist = ({Song}) => {
  return (
    <>
      <div className="p-2 w-[40%] h-20 bg-black text-white content-center rounded-lg">
        <div className="song-playlist flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <img
              src={Song.img}
              alt={Song.name}
              className="size-16 object-cover bg-rose-300"
            />
            <div className="song-playlist-info">
              <marquee>
                <h3>{Song.title}</h3>
              </marquee>
              <p>{ Song.artist }</p>
            </div>
          </div>
          <div className="song-playlist-options flex items-center gap-2">
            <input
              type="checkbox"
              className="size-4"
            />
            <button type="button">:</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongPlaylist;
