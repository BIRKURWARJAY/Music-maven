import { lazy, useEffect, useState } from "react";
import axios from "axios";
const SongHome = lazy(() => import("./SongHome"));

export default function TrendingSongsList() {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/api/Songs")
      .then((res) => {
        setTrendingSongs(res.data[0]?.trendingSongs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="trending-songs-container flex flex-col bg-transparent my-4 ml-28 mx-16">
      <h2 className="text-white text-4xl font-bold">Trending Songs</h2>

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
        ) : trendingSongs.length > 0 ? (
          // Display Songs
          trendingSongs.map((song) => (
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
          <div className="text-gray-400 text-xl">
            No trending songs available
          </div>
        )}
      </div>
    </div>
  );
}
