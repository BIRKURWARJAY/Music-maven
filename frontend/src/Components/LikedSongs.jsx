const LikedSongs = () => {
  const { likedSongs } = useContext(SongContext);

  return (
    <div>
      <h1>Liked Songs</h1>
      <ul>
        {likedSongs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default LikedSongs;