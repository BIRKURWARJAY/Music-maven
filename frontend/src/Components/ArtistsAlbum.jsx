import { lazy, useEffect, useState } from "react";
import axios from "axios";
const SongHome = lazy(() => import("./SongHome"))


export default function ArtsitsAlbum() {

  const [albumSongs, setAlbumSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get("/api/Songs")
      .then((res) => {
        setAlbumSongs(res.data[0].albumSongs)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
        setError(true)
      })
  }, [])

  return (
    <div className="artistsAlbum flex flex-col mx-16 ml-28 bg-transparent">
      <h2 className="text-white text-4xl font-bold">Top Artists</h2>

      <div className="songs-list flex flex-nowrap overflow-x-scroll">
        {loading ? (
            // Loading Animation (Skeleton Loader)
            [...Array(5)].map((_, index) => (
              <div key={index} className="bg-black bg-opacity-10 mx-3 animate-pulse size-[250px] rounded-lg"></div>
            ))
          ) : error ? (
            // Error Message
            <div className="text-red-500 text-2xl">Error loading songs</div>
          ) : albumSongs.length > 0 ? (
            // Display Songs
            albumSongs.map((song) => (
              <SongHome key={song.id} song={song} />
            ))
          ) : (
            // No Songs Found
            <div className="text-gray-400 text-xl">No albums songs available</div>
         )
        }
        
      </div>
    </div>
  );
};
