import { fetchTracksByGenre } from "../../features/AccessToken";
import { useState } from "react";


export default function Genres() {

  const [genreTracks, setGenreTracks] = useState(null);
  const [currGenre, setCurrGenre] = useState(null);


  const genres = [
    { genre: "pop" },
    { genre: "rock" },
    { genre: "hip-hop" },
    { genre: "jazz" },
    { genre: "classical" },
    { genre: "acoustic" },
    { genre: "chill" },
    { genre: "edm" },
    { genre: "party" }
  ];
  

  const handleClick = async (genre) => {
    setCurrGenre(genre);
    if (genre === currGenre) {
      return;
    }
    const tracks = await fetchTracksByGenre(genre);
    setGenreTracks(tracks);
  }


  /////fetch album with genre by fetch albumutility func() and navigate it to that album page:::::

  return (
    <ul className="flex gap-4 mt-28 mx-28">
      {genres.map((genre, index) => (
        <li key={index} className=" text-white py-2 px-6 bg-white bg-opacity-5 hover:bg-opacity-15 rounded-lg font-semibold" onClick={() => handleClick(genre.genre)}>
          {genre.genre}
        </li>
      ))}
    </ul>
  );
}
