import { useLocation, useParams } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import sendId from "../../features/songId";
import { playSongById } from "../../index";
import { fetchSongById } from "../../features/AccessToken";
import usePlayerStore from "../../app/playerStore";

export const player = window.onSpotifyWebPlaybackSDKReady();

const SongPlaylist = lazy(() => import("./SongPlaylist"));




export default function SongDetails() {
  const params = useParams();
  const songId = params.songId;
  const location = useLocation();
  const { setCurrentTrackId, setIsPlaying, isPlaying, currentTrackId } = usePlayerStore();

  const [song, setSong] = useState(null);
  console.log(isPlaying);
  

  const isCurrentSongPlaying = isPlaying && currentTrackId === songId;


  useEffect(() => {
    async function loadSongDetails() {
      const fs = await fetchSongById(songId);
      const fetchedSong = {
        songId: fs?.id,
        imageUrl: fs?.album.images[0].url,
        name: fs?.name,
        artist: fs?.artists?.map((artist) => artist.name),
        release: fs?.album?.release_date,
        duration: fs?.duration_ms,
        artistId: fs?.artists?.map((artist) => artist.id),
      };
      setSong(location?.state?.song || fetchedSong);
    }    
    loadSongDetails();
  }, [songId]);


  
  const songMin = Math.floor(song?.duration / 60000);
  const songSec = ((song?.duration % 60000) / 1000).toFixed(0);
  const songDuration = `${songMin} : ${songSec < 10 ? "0" : ""} ${songSec}`;

  async function resumeSong(songId) {

    if (currentTrackId === songId) {
      player.resume();
      setIsPlaying(true);
    } else {
      sendId(songId);
      setCurrentTrackId(songId);
      playSongById(songId);
      setIsPlaying(true);
    }
  }

  function pauseSong() {
    player.pause();
    setIsPlaying(false);
  }

  return (
    <div className="mt-28 mx-28">
      {song ? (
        <div className="flex justify-between bg-transparent gap-x-20">
          <div className="w-1/4 px-6 py-4 justify-items-center items-center bg-transparent text-white gap-y-3 grid">
            <img
              loading="lazy"
              src={song.imageUrl}
              alt=""
              className="w-full"
            />
            <h1 className="text-2xl font-bold">
              {song.name?.length > 50 ? (
                <marquee behavior="alternate" scrollamount="5" scrolldelay="100">
                  {song.name}
                </marquee>
              ) : (
                song.name
              )}
            </h1>
            <p>Music Maven</p>
            <p className="text-slate-300 font-semibold text-pretty">
              {song.artist?.join(" , ")}
              <i className="fa-solid fa-circle mx-2 text-[4px]"></i>
              {songDuration}
            </p>
            <div className="flex gap-8 items-center">
              <i
                className="fa-regular fa-square-plus px-3 py-2 rounded-full bg-white bg-opacity-5 text-xl"
                title="Add all to Playlist"
              ></i>
              {isPlaying && isCurrentSongPlaying ? (
                <i
                  className="fa-solid fa-pause px-8 py-6 bg-white rounded-full text-black text-2xl"
                  onClick={pauseSong}
                  ></i>
                ) : (
                  <i
                  className="fa-solid fa-play px-8 py-6 bg-white rounded-full text-black text-2xl"
                  onClick={() => resumeSong(songId)}
                ></i>
              )}
              <i
                className="fa-solid fa-ellipsis-vertical px-5 py-2 rounded-full bg-white bg-opacity-5 text-xl"
                title="Details"
              ></i>
            </div>
          </div>

          <div className="w-3/4 px-6 py-4">
            <SongPlaylist
              song={song}
              duration={songDuration}
              resumeSong={resumeSong}
              pauseSong={pauseSong}
              currentTrackId={currentTrackId}
              isPlaying={isPlaying}
            />
          </div>
        </div>
      ) : (
        <p>No song data available</p>
      )}
    </div>
  );
}
