import { lazy, useState } from "react";
const SongPlaylist = lazy(() => import("./SongPlaylist"));

export default function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  
  return (
    <div className="flex flex-col mt-28 ml-28 mr-16 items-center bg-black text-white">
      {Array.isArray(playlist) && playlist.length > 0 ? (
        playlist.map((song) => (
          <>
            <SongPlaylist
              key={song?.songId}
              song={song}
              duration={song?.songDuration || 0.0}
              setSong={setPlaylist}
            />
          </>
          
        ))
      ) : (
        <p>No songs in the playlist</p>
      )}
    </div>
  );
}
