import { useLocation, useParams } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import { playAlbumById, playSongById } from "../../index";
import { fetchAlbumsTracks, fetchAlbumById } from "../../features/AccessToken"
import useCurrentSongStore from "../../app/currentSongStore";

const SongPlaylist = lazy(() => import("./SongPlaylist"));




export default function AlbumDetails() {
  const { currentSongId, isPlaying, setCurrentAlbumId, player } = useCurrentSongStore();
  const location = useLocation();
  const params = useParams();
  const AlbumId = params.albumId;
  
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]); 
  const songsIds = songs.map(song => song.id);
  const iscurrentAlbumPlaying = songsIds.includes(currentSongId);


  useEffect(() => {
    setCurrentAlbumId(iscurrentAlbumPlaying ? AlbumId : null);
  }, [isPlaying])
  
  
 

  useEffect(() => {
    const fetchSongs = async () => {
      const songs = await fetchAlbumsTracks(AlbumId);
      
      setSongs(songs);
    }
    
    fetchSongs();
    
    async function ga() {
      if (location?.state?.album) {
        setAlbum(location.state.album);
        return;
      }

      let fa = await fetchAlbumById(AlbumId);
      let fetchedAlbum = {
        songId: fa?.id,
        imageUrl: fa?.images[0]?.url,
        name: fa?.name,
        artist: fa?.artists?.map((artist) => artist.name),
        release: fa.album?.release_date,
        duration: fa?.duration_ms,
        artistId: fa.artists?.map((artist) => artist.id)
      }
      setAlbum(fetchedAlbum);
    }

    ga(); 

  }, [AlbumId])

  
  
  const totalDurationMs = songs.reduce((acc, song) => acc + song.duration_ms, 0);
  const albumMin = Math.floor(totalDurationMs / 60000);
  const albumSec = ((totalDurationMs % 60000) / 1000).toFixed(0);
  const albumDuration = `${albumMin} : ${albumSec < 10 ? "0" : ""} ${albumSec}`;
  

  
  async function resumeSong(songId) {
 
    if (currentSongId === songId) {
      player.resume()
    } else if (songId) {
      playSongById(songId); 
      setCurrentAlbumId(AlbumId);
    } else if (iscurrentAlbumPlaying) {
      player.resume();
    } else {
      playAlbumById(AlbumId);
    }
  };
  
  
  async function pauseSong(){
    await player.pause();
  };
  
  

  return (
    <>
      {album ? (
        <div className="mx-28 mt-28 grid grid-cols-12 bg-transparent gap-x-20 h-[calc(100vh-7rem)] max-h[calc(100vh - 80px)] overflow-hidden">
          <div className="col-span-4 px-6 py-4 w-[80%] items-center text-white flex flex-col gap-y-3 sticky top-0 left-12">
            <img
              loading="lazy"
              src={album.imageUrl}
              alt=""
              className="w-full rounded-xl"
            />
            <h1 className="text-2xl font-bold max-w-[100%] truncate text-center w-full">
              {album.name.length > 40 ? (
                <marquee behavior="alternate" scrollamount="5" scrolldelay="100">
                  {album.name}
                </marquee>
              ) : (
                album.name
              )}
            </h1>
            <p>Music Maven</p>
            <p className="text-slate-300 font-semibold text-pretty">
              {album.artist?.join(" , ")}
            </p>
            {albumDuration}
            <div className="flex gap-8 items-center">
              <i
                className="fa-regular fa-square-plus px-3 py-2 rounded-full bg-white bg-opacity-5 text-xl"
                title="Add all to Playlist"
              ></i>
              {iscurrentAlbumPlaying && isPlaying ? (
                  <i
                    className="fa-solid fa-pause px-8 py-6 bg-white rounded-full text-black text-2xl"
                    onClick={pauseSong}
                    ></i>
                  ) : (
                    <i
                    className="fa-solid cursor-pointer fa-play px-8 py-6 bg-white rounded-full text-black text-2xl"
                    onClick={() => resumeSong()}
                  ></i>
                )}
              <i
                className="fa-solid cursor-pointer fa-ellipsis-vertical px-5 py-2 rounded-full bg-white bg-opacity-5 text-xl"
                title="Details"
              ></i>
            </div>
          </div>
  
          <div className="col-span-8 pb-28 px-6 py-4 overflow-y-auto pr-4 songs-list h-full">
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
                  artistId: song.artists?.map((artist) => artist.id),
                }}
                resumeSong={resumeSong}
                pauseSong={pauseSong}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No song data available</p>
      )}
    </>
  );
  

}