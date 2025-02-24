import { lazy, useEffect, useState } from "react";
import { fetchAccessToken } from "../../features/AccessToken";
import fetchSongs from "../../features/AccessToken";
const SongHome = lazy(() => import("./SongHome"));



export default function ArtsitsAlbum() {
  const [albumSongs, setAlbumSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);
      const accessToken = await fetchAccessToken();

      if (accessToken) {
        const songs = await fetchSongs(accessToken, "album");
        setAlbumSongs(songs);
      } else {
        setError(true);
      }

      setLoading(false);
    }

    loadSongs();
  }, []);

  return (
    <div className="artistsAlbum flex flex-col mx-16 ml-28 bg-transparent">
      <h2 className="text-white text-4xl font-bold mb-6">Top Artists</h2>

      <div className="songs-list flex flex-nowrap overflow-x-scroll">
        {loading ? (
          // Loading Animation (Skeleton Loader)
          [...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-10 mx-3 animate-pulse size-[250px] rounded-lg"
            ></div>
          ))
        ) : error ? (
          // Error Message
          <div className="text-red-500 text-2xl">Error loading songs</div>
        ) : albumSongs.length > 0 ? (
          // Display Songs
          albumSongs.map((song) => (
            <SongHome
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
          ))
        ) : (
          // No Songs Found
          <div className="text-gray-400 text-xl">No albums songs available</div>
        )}
      </div>
    </div>
  );
}
