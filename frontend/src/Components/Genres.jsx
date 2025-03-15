export default function Genres() {
  const genres = [
    { genre: "Podcasts" },
    { genre: "Romance" },
    { genre: "Relax" },
    { genre: "Feel Good" },
    { genre: "Party" },
    { genre: "Energize" },
    { genre: "sad" },
    { genre: "Focus" },
    { genre: "Workout" }
  ];

  return (
    <ul className="flex gap-4 mt-28 mx-28">
      {genres.map((genre, index) => (
        <li key={index} className=" text-white py-2 px-6 bg-white bg-opacity-5 hover:bg-opacity-15 rounded-lg font-semibold">
          {genre.genre}
        </li>
      ))}
    </ul>
  );
}
