import { useEffect, useState } from "react";
import SongHome from "./SongHome";
import axios from "axios";

const ArtsitsAlbum = () => {

  let [albumSongs, setAlbumSongs] = useState([])

  useEffect(() => {
    axios.get("/api/Songs")
      .then((res) => {
        setAlbumSongs(res.data[0].albumSongs)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="artistsAlbum flex flex-col mx-16 ml-28 bg-transparent">
      <h2 className="text-white text-4xl font-bold">Top Artists</h2>

      <div className="songs-list flex flex-nowrap overflow-x-scroll">
        {albumSongs.map((song) => (
          <SongHome key={song.id} song={song} />
        ))}
        
      </div>
    </div>
  );
};

export default ArtsitsAlbum;
