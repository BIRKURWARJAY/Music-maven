import { useEffect, useState } from "react";
import SongHome from "./SongHome";
import axios from "axios";



function TrendingSongsList() { 

  let [trendingSongs, setTrendingSongs] = useState([]);
  
  
  useEffect(() => {
    axios.get('/api/Songs')
      .then((res) => {
        setTrendingSongs(res.data[0].trendingSongs);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <div className="trending-songs-container flex flex-col bg-transparent my-4 ml-28 mx-16">
        <h2 className="text-white text-4xl font-bold">Trending Songs</h2>
        <div className="songs-list flex flex-nowrap overflow-x-scroll">
          {trendingSongs.map((song) => (
            <SongHome key={song.id} song={song} />
          ))}
       </div>
      </div>
    </>
  )
}


export default TrendingSongsList;