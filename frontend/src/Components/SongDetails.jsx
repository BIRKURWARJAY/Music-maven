import { useLocation, useParams } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import sendId from "../../features/songId";
import { playSongById } from "../../index";
import { fetchSongById } from "../../features/AccessToken";


export const player = window.onSpotifyWebPlaybackSDKReady(); 
const SongPlaylist = lazy(() => import("./SongPlaylist"));
const CurrentSong = lazy(() => import("./CurrentSong"));





// Log the playback state and return the current track
export const logPlaybackState = async () => {  
  try {
    const state = await player.getCurrentState();
    if (!state) {
      console.error('User is not playing music through the Web Playback SDK');
      return null;
    }
    
    const isSongPaused = state.paused;
    const currentTrack = state.track_window.current_track;
    const nextTrack = state.track_window.next_tracks[0];
    
    console.log('Currently Playing', currentTrack.id);
    console.log('Playing Next', nextTrack);
    
    return { currentTrack, isSongPaused };
  } catch (error) {
    console.error('❌ Error retrieving player state:', error);
  }
};

export default function SongDetails() {
  const params = useParams();
  const songId = params.songId
  const location = useLocation();
  const [song, setSong] = useState(null)
  
    
    
  useEffect(() => {

    async function gs(){
      let fs = await fetchSongById(songId);
      let fetchedSong = {
        songId: fs?.id,
        imageUrl: fs.album?.images[0]?.url,
        name: fs?.name,
        artist: fs?.artists?.map((artist) => artist.name),
        release: fs.album?.release_date,
        duration: fs?.duration_ms,
        artistId: fs.artists?.map((artist) => artist.id)
      }      
      setSong(location?.state?.song || fetchedSong);
    }
    
    if (songId) {
      gs();
    }

    async function ct() { 
      const {currentTrack, isSongPaused} = await logPlaybackState();    
      setPlayState(!isSongPaused && (currentTrack.id === songId));
    }
    ct()

    return () => null
  }, [songId])

  const songMin = Math.floor(song?.duration / 60000);
  const songSec = ((song?.duration % 60000) / 1000).toFixed(0);
  const songDuration = `${songMin} : ${songSec < 10 ? "0" : ""} ${songSec}`;
  const [playState, setPlayState] = useState(false);
  console.log(song);
  
  sendId(song?.songId);




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

  const pauseSong = () => {
    player.pause().then(() => {
      console.log('Paused!');
    });
    setPlayState(false);
  };

  return (
    <div className="mt-28 mx-28">
      {song ? (
        <>
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
                  <marquee
                    behavior="alternate"
                    scrollamount="5"
                    scrolldelay="100"
                  >
                    {song.name}
                  </marquee>
                ) : (
                  song.name
                )}
              </h1>
              <p>Music Maven</p>
              <p className="text-slate-300 font-semibold text-pretty">
                {song.artist?.join("  , ")}
                <i className="fa-solid fa-circle mx-2 text-[4px]"></i>
                {songDuration}
              </p>
              <div className="flex gap-8 items-center">
                <i
                  className="fa-regular fa-square-plus px-3 py-2 rounded-full bg-white bg-opacity-5 text-xl"
                  title="Add all to Playlist"
                ></i>
                {!playState ? (
                  <i
                    className="fa-solid fa-play px-8 py-6 bg-white rounded-full text-black text-2xl"
                    onClick={() => playSongById(songId)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-pause px-8 py-6 bg-white rounded-full text-black text-2xl"
                    onClick={pauseSong}
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
                playState={playState}
                resumeSong={resumeSong}
                pauseSong={pauseSong}
              />
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
