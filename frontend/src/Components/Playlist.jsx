import { lazy, useState, useEffect } from "react";
const SongPlaylist = lazy(() => import("./SongPlaylist"));
import { playSongById } from "../../index";
import axios from "axios";
import useCurrentSongStore from "../../app/currentSongStore";

export default function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const { currentSongId, player } = useCurrentSongStore();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/getLikedSongs");
        if (res.status === 200) {
          setPlaylist(res.data.likedSongs);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    })();
  }, []);


  async function resumeSong(songId) {
    if (currentSongId === songId) {
      await player.resume();
    } else {
      playSongById(songId);
    }
  }

  async function pauseSong() {
    await player.pause();
  }

  return (
    <div className="flex flex-col mt-28 ml-28 mr-16 items-center text-white">
      {Array.isArray(playlist) && playlist.length > 0 ? (
        playlist.map((song) => (
          <SongPlaylist
            key={song?.songId}
            song={song}
            duration={song?.songDuration || 0.0}
            resumeSong={resumeSong}
            pauseSong={pauseSong}
          />
        ))
      ) : (
        <p className="bg-black text-white w-full text-center">No songs in the playlist</p>
      )}
    </div>
  );
}
