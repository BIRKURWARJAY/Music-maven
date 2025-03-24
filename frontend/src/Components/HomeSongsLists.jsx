import { useEffect, useState } from "react";
import SongHome from "./SongHome";
import { fetchSongs, fetchAccessToken } from "../../features/AccessToken";


fetchAccessToken();

export default function HomeSongsList({displayName, songQuery}) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [arrOfSongs, setArrOfSongs] = useState([]);
  
  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);

      const songs = await fetchSongs(songQuery);
    
      if (songs === "errAccess" ) {
        setError(true);
      } else {
        setArrOfSongs(songs);
      }
    
      setLoading(false);
    }

    loadSongs();
  }, []);

  return (
    <div className="trending-songs-container flex flex-col bg-transparent my-4 ml-28 mx-16">
      <h2 className="text-white text-4xl font-bold mb-6">{ displayName }</h2>

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
        ) : (
          // Display Songs
          arrOfSongs.map((song) => (
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
        )}
      </div>
    </div>
  );

}