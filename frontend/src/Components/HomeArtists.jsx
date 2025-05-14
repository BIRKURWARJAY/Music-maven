import { useEffect, useState } from "react";
import AlbumHome from "./AlbumHome"
import { fetchAlbum } from "../../features/AccessToken";



export default function HomeArtists({ displayName, songQuery }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [arrOfAlbums, setArrOfAlbums] = useState([]);

  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);

      const albums = await fetchAlbum(songQuery, 20, 10);

      if (albums === "errAccess") {
        setError(true);
      } else {
        setArrOfAlbums(albums);
      }

      setLoading(false);
    };

    loadSongs();
  }, []);

  return (
    <div className="trending-songs-container flex flex-col bg-transparent my-4 ml-28 mx-16">
      <h2 className="text-white text-4xl font-bold mb-6">{displayName}</h2>

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
        ) : arrOfAlbums.length >= 1 ? (
          // Display Songs
          arrOfAlbums?.map((album) => (
            <AlbumHome
              key={album.id}
              album={{
                albumId: album?.id,
                imageUrl: album?.images[0]?.url,
                name: album.name.includes("(") ? album.name.split("(")[0] : album.name.includes("-") ? album.name.split("-")[0] : album.name,
                artist: album?.artists?.map((artist) => artist.name),
                release: album?.release_date,
                duration: album?.duration_ms,
                artistId: album.artists?.map((artist) => artist.id),
                totalTracks: album?.total_tracks
              }}
            />
          ))
        ) : (
          <div className="text-red-500 text-2xl">Something Went Wrong</div>
        )}
      </div>
    </div>
  );
}
