import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import sendId from "../../features/songId";
import { fetchSongById } from "../../features/AccessToken";
import useCurrentSongStore from "../../app/currentSongStore";

export default function CurrentSong() {
  const [song, setSong] = useState(null);
  const intervalRef = useRef(null);
  const currentSongIdRef = useRef(null);

  const { currentSongId, setCurrentSongId, isPlaying, setIsPlaying, setCurrentArtistId, currentAlbumId, setCurrentAlbumId, currentPosition, setCurrentPosition, player } = useCurrentSongStore();

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const songDuration = formatTime(song?.duration / 1000 || 0);
  const currSongDuration = formatTime(currentPosition);
  

  useEffect(() => {    

    const playerState = ({ paused }) => {
      if (!paused) {
        setIsPlaying(true);
      }

      if (paused) {
        setIsPlaying(false);
      }
    }

    player?.addListener('player_state_changed', playerState);

    return () => {
      player?.removeListener('player_state_changed', playerState);
    }
  }, [player])


  useEffect(() => {
    (async () => {
      const state = await player?.getCurrentState();
      if (!state) return;


      if (!state?.context.uri.includes("album:")) {
        const currArtId = state?.track_window.current_track.artists[0].uri?.split("artist:")[1];

        setCurrentAlbumId(null);
        console.log(currArtId, "currArtId");
        
        setCurrentArtistId(currArtId);
      }
      console.log(state.track_window.current_track.name);
    
      sendId(state.track_window.current_track.name);

    })();

  }, [currentSongId, player])


  useEffect(() => {
    

    intervalRef.current = setInterval(async () => {

      const state = await player?.getCurrentState();
      if (!state) return;
      const currentId = state.track_window.current_track.id;
      
      if (state?.context.uri.includes("album:") && currentAlbumId !== state.context.uri.split("album:")[1]) {
        setCurrentAlbumId(state.context.uri.split("album:")[1]);        
      }


      if (currentId !== (currentSongId || currentSongIdRef.current)) {
        setCurrentSongId(currentId);
        currentSongIdRef.current = currentId;
      }

      setCurrentPosition(Math.floor(state.position / 1000));

    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, player]);


  useEffect(() => {
    if (!currentSongId) return;

    async function getSongInfo() {
      const song = await fetchSongById(currentSongId);
      if (!song) return;

      const formatted = {
        songId: song.id,
        imageUrl: song.album?.images[0]?.url,
        name: song.name,
        artists: song.artists?.map((artist) => artist.name),
        release: song.album?.release_date,
        duration: song.duration_ms,
        artistId: song.artists?.map((artist) => artist.id),
      };

      sendId(song.name);
      setSong(formatted);
    }


    getSongInfo();
  }, [currentSongId, player]);
  

  async function resumeSong() {
    await player.resume();
    setIsPlaying(false);
  }

  async function pauseSong() {
    await player.pause();
    setIsPlaying(true);
  }

  async function seek(value) {
    await player.seek(value * 1000);
    setCurrentPosition(Number(value));
  }

  return (
    <>
      {song && (
        <div className="sticky bottom-0 left-0 right-0 max-h-24 bg-black text-white flex items-center justify-between w-full px-6 py-4 z-50 border-t-2 border-gray-700">
          <div className="flex max-h-full items-center w-1/4 max-w-1/4 overflow-hidden gap-x-8">
            <img src={song.imageUrl} alt={song.name} className="size-16 rounded-lg" />
            <div className="current-song-info overflow-hidden">
              <h3 className="text-lg font-bold max-h-12 truncate">
                {song.name.length > 60 ? (
                  <span className="inline-block max-h-4 animate-marqueeSongName hover:[animation-play-state:paused]">{song.name}</span>
                ) : (
                  song.name
                )}
              </h3>
              <p className="font-semibold truncate max-h-8">
                {song.artists.map((artist, index) => (
                  <span key={`${song.songId}-${index}`}>
                    <span className="hover:text-[#7f7676]">
                      <Link
                        to={`/artist/${artist.split(" ").join("")}`}
                        state={{ artist, artistId: song.artistId[index] }}
                        onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                      >
                        {artist}
                      </Link>
                    </span>
                    {index < song.artists.length - 1 ? ", " : ""}
                    {index === song.artists.length - 2 ? " & " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="flex gap-8 w-2/4 items-center justify-between mx-16">
            <input
              type="range"
              className="slider max-w-2/4 w-2/4"
              min={0}
              max={Math.floor((song.duration || 0) / 1000)}
              value={currentPosition}
              onChange={(e) => seek(Number(e.target.value))}
            />
            <div className="flex gap-8 w-2/4 justify-center">
              <span className="currentTime">{currSongDuration}</span>
              <span className="mx-4">/</span>
              <span className="totalTime flex">{songDuration}</span>
            </div>
          </div>

          <div className="flex items-center w-1/4 justify-end gap-4 mx-5">
            <input type="checkbox" className="size-5" />
            
            {isPlaying ? (
              <i className="fas fa-pause text-2xl cursor-pointer" onClick={pauseSong} />
            ) : (
              <i className="fas fa-play text-2xl cursor-pointer" onClick={resumeSong} />
            )}
            {isPlaying && currentAlbumId ? (
              <Link to={`/album/${currentAlbumId}`}>
                <i className="fa-solid fa-angle-up"></i>
              </Link>
            ) : (
              <Link to={`/song/${song.songId}`}>
              <i className="fa-solid fa-angle-up"></i>
            </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
