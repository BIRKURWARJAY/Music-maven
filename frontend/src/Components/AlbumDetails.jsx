import { useLocation, useParams } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import sendId from "../../features/songId";
import { playAlbumById, playSongById } from "../../index";
import { fetchAlbumsTracks, fetchAlbumById } from "../../features/AccessToken"
import {logPlaybackState, player} from "./SongDetails"

const SongPlaylist = lazy(() => import("./SongPlaylist"));
const CurrentSong = lazy(() => import("./CurrentSong"));




export default function AlbumDetails() {

  const location = useLocation();
  const params = useParams();
  const AlbumId = params.albumId;
  
  const [album, setAlbum] = useState(null);
  
  useEffect(() => {
    const fetchSongs = async (albumId) => {
      const songs = await fetchAlbumsTracks(albumId);
      
      setSongs(songs);
    }
    
    fetchSongs(AlbumId);
    
    
    async function ga(albumId) {
      console.log(albumId);
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
      setAlbum(location?.state?.album || fetchedAlbum);
    }

    ga(); 

    async function ct() { 
      const {currentTrack, isSongPaused} = await logPlaybackState();    
      setPlayState(!isSongPaused && songs.filter((song) => {
        currentTrack.id === song.id;
      }) );
    }
    ct()
  }, [AlbumId])


  const [songs, setSongs] = useState([]); 
  const [playState, setPlayState] = useState(false);


  sendId(AlbumId);  



  //To play whole album::
  function handleAlbum(albumId) {
    playAlbumById(albumId)
  }


  //checks if current playing song is same then it will resume or play song::
  const resumeSong = async (songId) => {
    const state = await logPlaybackState();
    
    if (state.currentTrack.id === songId) {
      player.resume().then(() => {
        console.log('Resumed!');
      });
      setPlayState(true);
    } else {
      playSongById(songId);
      setPlayState(true);
    }
  };
  

  const pauseSong = async () => {
    player.pause().then(() => {
      console.log('Paused!');
    });
    setPlayState(false);
  };




  return (
    <>
      {album ? (
        <div className="mx-28 mt-28 grid grid-cols-12 bg-transparent gap-x-20 h-[calc(100vh-7rem)] overflow-hidden">
          <div className="col-span-4 px-6 py-4 w-[80%] max-h-[400px] items-center text-white gap-y-3 flex flex-col sticky top-0 left-12">
            <img
              loading="lazy"
              src={album.imageUrl}
              alt=""
              className="w-full rounded-xl"
            />
            <h1 className="text-2xl font-bold text-center w-full">
              {album.name.length > 50 ? (
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
            <div className="flex gap-8 items-center">
              <i
                className="fa-regular fa-square-plus px-3 py-2 rounded-full bg-white bg-opacity-5 text-xl"
                title="Add all to Playlist"
              ></i>
              <i
                className="fa-solid fa-play px-8 py-6 bg-white rounded-full text-black text-2xl"
                onClick={() => handleAlbum(AlbumId)}
              ></i>
              <i
                className="fa-solid fa-ellipsis-vertical px-5 py-2 rounded-full bg-white bg-opacity-5 text-xl"
                title="Details"
              ></i>
            </div>
          </div>
  
          <div className="col-span-8 px-6 py-4 overflow-y-auto pr-4 songs-list h-full">
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
                playState={playState}
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