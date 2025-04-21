import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { player } from "./SongDetails";
import { fetchSongById } from "../../features/AccessToken";
import usePlayerStore from "../../app/playerStore";
import useAlbumPlayerStore from "../../app/albumPlayerStore";

export default function CurrentSong() {
  const [song, setSong] = useState(null);
  const [position, setPosition] = useState(0);
  const intervalRef = useRef(null);
  const [stateId, setStateId] = useState(null);
  const [playing, setPlaying] = useState(false);

  // ✅ Zustand reactive states
  const { currentTrackId, isPlaying, setIsPlaying } = usePlayerStore();
  const { currentTrackIdAS, isPlayingAS, setIsPlayingAS, isAlbumTrack, setCurrentTrackIdAS } = useAlbumPlayerStore();

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const songDuration = formatTime(song?.duration / 1000 || 0);
  const currSongDuration = formatTime(position);
  

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const state = await player.getCurrentState();
      if (!state) return;

      const currentId = state.track_window.current_track.id;
      const isPaused = state.paused;

      if (playing !== !isPaused) {
        setPlaying(!isPaused)
      }

      if (stateId !== currentId) {
        setStateId(currentId);
      }

      if (currentTrackIdAS !== currentId) {
        setCurrentTrackIdAS(currentId);
      }

      setPosition(Math.floor(state.position / 1000));

      // Update Zustand only if needed
      if (currentId === currentTrackId && isPlaying !== !isPaused) {
        setIsPlaying(!isPaused);
        setPlaying(!isPaused);
      } else if (currentId === currentTrackIdAS && isPlayingAS !== !isPaused) {
        setIsPlayingAS(!isPaused);
        setPlaying(!isPaused);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [currentTrackId, currentTrackIdAS, isPlaying, isPlayingAS]);

  useEffect(() => {
    if (!stateId) return;

    async function getSongInfo() {
      const song = await fetchSongById(stateId);
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

      setSong(formatted);
      setPosition(0);
    }

    getSongInfo();
  }, [stateId]);

  async function resumeSong() {
    const isAlbum = isAlbumTrack && currentTrackIdAS === song?.songId;
    const isSingle = currentTrackId === song?.songId && !isAlbumTrack;

    if (isAlbum || isSingle) {
      await player.resume();
    }
  }

  async function pauseSong() {
    const isAlbum = isAlbumTrack && currentTrackIdAS === song?.songId;
    const isSingle = currentTrackId === song?.songId && !isAlbumTrack;

    if (isAlbum || isSingle) {
      await player.pause();
    }
  }

  function seek(value) {
    const ms = value * 1000;
    player.seek(ms);
    setPosition(Number(value));
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
              value={position}
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
            
            {playing ? (
              <i className="fas fa-pause text-2xl cursor-pointer" onClick={pauseSong} />
            ) : (
              <i className="fas fa-play text-2xl cursor-pointer" onClick={resumeSong} />
            )}
            
            {isAlbumTrack ? (
              <Link to={`/album/${isAlbumTrack}`}>
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
