import React, { useState } from 'react';
import Song from './Song';
import { SongProvider } from '../Contexts/SongContext';


function TrendingSongsList() { 
  const [songs, setSongs] = useState([])


  //fetch to setSongs

  return (
    <>
      <div className="trending-songs-list flex flex-nowrap overflow-x-auto gap-4 bg-slate-800">
        {songs.map((song) => (
            <Song key={song.id} song={song} />
        ))}
      </div>
    </>
  )
}


export default TrendingSongsList;