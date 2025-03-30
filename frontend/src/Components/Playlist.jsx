import { lazy, useState } from "react";
const SongPlaylist = lazy(() => import("./SongPlaylist") );

export default function Playlist() {

  const [playlist, setPlaylist] = useState([]);
  console.log("skjugbkh");

  return (
    <div className="w-full flex flex-col items-center bg-black text-white">
      {
        playlist?.map((song) => {
          return (
            
            <SongPlaylist key={song.songId} song={song} duration={song.songDuration} />
          )
        })
      }
    </div>
  );
}
