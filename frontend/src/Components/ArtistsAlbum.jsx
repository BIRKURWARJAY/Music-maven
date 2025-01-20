import SongHome from "./SongHome";


const ArtsitsAlbum = () => {
  return (
    <div>
      <div className="trending-songs-list flex flex-nowrap overflow-x-auto gap-4 bg-black">
        {/* {songs.map((song) => (
            <SongHome key={song.id} song={song} />
        ))} */}
      </div>
    </div>
  );
};

export default ArtsitsAlbum;
