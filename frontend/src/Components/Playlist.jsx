import { lazy } from "react";
const SongPlaylist = lazy(() => import("./SongPlaylist") );

export default function Playlist() {
  return (
    <div className="w-full flex flex-col items-center bg-black text-white">
      {
        // Playlist.map((song) => {
        //   return (
        //     // <SongPlaylist key={song.id} song={song} />
        //   )
        // })
      }
    </div>
  );
}
