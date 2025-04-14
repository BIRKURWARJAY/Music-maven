import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { player } from "./SongDetails";
import { fetchSongById } from "../../features/AccessToken";
import usePlayerStore from "../../app/playerStore";

export default function CurrentSong() {
  const [song, setSong] = useState(null);
  const { isPlaying, currentTrackId, setIsPlaying } = usePlayerStore();
  
  
  
  useEffect(() => {
    if (!currentTrackId) return;
    async function getSongInfo() {
      const song = await fetchSongById(currentTrackId);
      const formattedSong = {
        songId: song?.id,
        imageUrl: song.album?.images[0]?.url,
        name: song?.name,
        artists: song?.artists?.map((artist) => artist.name),
        release: song.album?.release_date,
        duration: song?.duration_ms,
        artistId: song.artists?.map((artist) => artist.id)
      };
      setSong(formattedSong);
    }
    getSongInfo();
  }, [currentTrackId]);

  async function resumeSong() {

    if (currentTrackId === song.songId) {
      player.resume().then(() => {
        console.log("Resumed!");
      });
      setIsPlaying(true);
    }
  }

  function pauseSong() {
    player.pause().then(() => {
      console.log("Paused!");
    });
    setIsPlaying(false);
  }

  return (
    <>
      {currentTrackId ? (
        <div className="sticky bottom-0 left-0 right-0 bg-black text-white flex items-center justify-between px-6 py-4 z-50 border-t-2 border-gray-700">
          <div className="flex items-center gap-x-8">
            <img
              src={song?.imageUrl}
              alt={song?.name}
              className="size-16 aspect-square rounded-lg"
            />
            <div className="current-song-info">
              <h3 className="text-lg font-bold">{song?.name}</h3>
              <p className="font-semibold truncate">
                {song?.artists?.map((artist, index) => (
                  <span key={`${song.songId}-${index}`}>
                    <span className="hover:text-[#7f7676]">
                      <Link
                        to={`/artist/${artist.split(" ").join("")}`}
                        state={{ artist, artistId: song.artistId[index] }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.textDecoration = "underline";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = "none";
                        }}
                      >
                        {artist}
                      </Link>
                    </span>
                    {index < song.artists.length - 1 ? "  ,  " : ""}
                    {index === song.artists.length - 2 ? "  &  " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mx-5">
            <input
              type="checkbox"
              className="size-5"
            />
            {isPlaying ? (
              <i className="fas fa-pause text-2xl"
              onClick={pauseSong}
              />
            ) : (
                <i className="fas fa-play text-2xl"
                onClick={resumeSong}
                />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
