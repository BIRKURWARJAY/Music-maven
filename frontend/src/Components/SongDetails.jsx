import { useLocation } from "react-router-dom";
import { lazy } from "react";
import sendId from "../../features/songId";

const SongPlaylist = lazy(() => import("./SongPlaylist"));
const CurrentSong = lazy(() => import("./CurrentSong"));


export default function SongDetails() {
  const location = useLocation();
  const { song } = location?.state || {};
  const songMin = Math.floor(song.duration / 60000);
  const songSec = ((song.duration % 60000) / 1000).toFixed(0);
  const songDuration = `${songMin} : ${songSec < 10 ? "0" : ""} ${songSec}`
  sendId(song.songId);  
  
  return (
    <div className="mt-28 mx-28">
      {song ? (
        <>
          <div className="flex justify-between mx-20 bg-transparent gap-x-20">
            <div className="w-1/4 px-6 py-4 justify-items-center items-center bg-transparent text-white gap-y-3 grid">
              <img
                loading="lazy"
                src={song.imageUrl}
                alt=""
                className="w-full"
              />
              <h1 className="text-2xl font-bold">{((song.name).length > 50 ? (<marquee behavior="alternate" scrollamount="5" scrolldelay="100">{song.name}</marquee>) : song.name)}</h1>
              <p>Music Maven</p>
              <p className="text-slate-300 font-semibold text-pretty">
                {song.artist?.join("  , ")}
                <i className="fa-solid fa-circle mx-2 text-[4px]"></i>
                {songDuration}
              </p>
              <div className="flex gap-8 items-center">
                <i className="fa-regular fa-square-plus px-3 py-2 rounded-full bg-white bg-opacity-5 text-xl" title="Add all to Playlist"></i>
                <i className="fa-solid fa-play px-8 py-6 bg-white rounded-full text-black text-2xl"></i>
                <i className="fa-solid fa-ellipsis-vertical px-5 py-2 rounded-full bg-white bg-opacity-5 text-xl" title="Details"></i>
              </div>
            </div>

            <div className="w-3/4 px-6 py-4">
              <SongPlaylist song={song} duration={songDuration} />
            </div>
          <CurrentSong currentSong={song} />
          </div>
        </>
      ) : (
        <p>No song data available</p>
      )}
    </div>
  );
}
