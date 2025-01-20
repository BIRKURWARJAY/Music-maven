import SongPlaylist from "./SongPlaylist";

function Playlist() {
  return (
    <div className="w-full flex flex-col items-center bg-black text-white">
      {
        Playlist.map((song) => {
          return (
            <SongPlaylist key={song.id} song={song} />
          )
        })
      }
    </div>
  );
}

export default Playlist;