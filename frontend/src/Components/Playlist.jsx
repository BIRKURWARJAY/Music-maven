import SongPlaylist from "./SongPlaylist";
import Aside from "./Aside";

function Playlist() {
  return (
    <div className="w-full flex flex-col items-center bg-black text-white">
      {
        // Playlist.map((song) => {
        //   return (
        //     // <SongPlaylist key={song.id} song={song} />
        //   )
        // })
        <Aside />
      }
    </div>
  );
}

export default Playlist;