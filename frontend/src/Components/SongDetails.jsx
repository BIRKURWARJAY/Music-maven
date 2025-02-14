import { useLocation } from "react-router-dom";
import { lazy } from "react";

const SongPlaylist = lazy(() => import("./SongPlaylist"))

export default function SongDetails() {
  const location = useLocation();
  const { song } = location.state || {};
  console.log(song.artist)
  return (
    <div className="mt-28 mx-28">
      {song ? (
        <>
          <div className="flex justify-between mx-20 bg-transparent gap-x-20">
            <div className="w-1/3 p-6 justify-items-center items-center bg-transparent text-white gap-y-3 grid">
              <img src={song.imageUrl} alt="" className="w-full" />
              <h1 className="text-2xl font-bold ">{ song.name }</h1>
              <p>Music Maven</p>
              <p className="text-slate-300 font-semibold text-pretty">{song.artist.join("  , ")}<i className="fa-solid fa-circle mx-2 text-[4px]"></i>{ song.artist.join("  , ")}</p>
              <div className="flex gap-8 items-center">
                <i className="fa-regular fa-square-plus px-3 py-2 rounded-full bg-white bg-opacity-5 text-xl"></i>
                <i className="fa-solid fa-play px-8 py-6 bg-white rounded-full text-black text-2xl"></i>
                <i className="fa-solid fa-ellipsis-vertical px-5 py-2 rounded-full bg-white bg-opacity-5 text-xl"></i>
              </div>
            </div>

            <div className="w-2/3 p-6">
             <SongPlaylist song={ song } />
            </div>
          </div>
        </>
      ) : (
        <p>No song data available</p>
      )}
    </div>
  );
}
