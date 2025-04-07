import { useLocation } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import sendId from "../../features/songId";
import { playSong } from "../../index";
import {fetchAlbumsTracks} from "../../features/AccessToken"



const SongPlaylist = lazy(() => import("./SongPlaylist"));
const CurrentSong = lazy(() => import("./CurrentSong"));




export default function AlbumDetails() {


  useEffect(() => {
    const fetchSongs = async (albumId) => {
      const songs = await fetchAlbumsTracks(albumId);
      console.log(songs.map((song) => song.album.images[0]));
      
      setSongs(songs);
    }

    fetchSongs(album.albumId);
  }, [])
  
  const location = useLocation();
  const { album } = location?.state || {};
  const [songs, setSongs] = useState([]);   


  const [playState, setPlayState] = useState(false);
  sendId(album.albumId);  

  const handleSong = (albumId) => {
    playSong(album.albumId);
  }




  return (
    <div className="mt-28 mx-28">
      {album ? (
        <>
          <div className="flex justify-between mx-20 bg-transparent gap-x-20">
            <div className="w-1/4 px-6 py-4 justify-items-center items-center bg-transparent text-white gap-y-3 grid">
              <img
                loading="lazy"
                src={album.imageUrl}
                alt=""
                className="w-full"
              />
              <h1 className="text-2xl font-bold">{((album.name).length > 50 ? (<marquee behavior="alternate" scrollamount="5" scrolldelay="100">{album.name}</marquee>) : album.name)}</h1>
              <p>Music Maven</p>
              <p className="text-slate-300 font-semibold text-pretty">
                {album.artist?.join("  , ")}
              </p>
              <div className="flex gap-8 items-center">
                <i className="fa-regular fa-square-plus px-3 py-2 rounded-full bg-white bg-opacity-5 text-xl" title="Add all to Playlist"></i>
                <i className="fa-solid fa-play px-8 py-6 bg-white rounded-full text-black text-2xl" onClick={() => handleSong(album.songId)}></i>
                <i className="fa-solid fa-ellipsis-vertical px-5 py-2 rounded-full bg-white bg-opacity-5 text-xl" title="Details"></i>
              </div>
            </div>

            <div className="w-3/4 px-6 py-4">
              {songs.map((song) => (
                <SongPlaylist 
                  key={song.id}
                  song={{
                    songId: song?.id,
                    imageUrl: song.album?.images[0]?.url,
                    name: song?.name,
                    artist: song?.artists?.map((artist) => artist.name),
                    release: song.album?.release_date,
                    duration: song?.duration_ms,
                    artistId: song.artists?.map((artist) => artist.id)
                  }}
                />
              ))}
            </div>
          {/* <CurrentSong currentSong={song} /> */}
          </div>
        </>
      ) : (
        <p>No song data available</p>
      )}
    </div>
  );

}