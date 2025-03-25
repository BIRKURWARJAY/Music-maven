import { useState, lazy } from "react";
const SongPlaylist = lazy(() => import("./SongPlaylist"));


export default function History() {

  const [history, setHistory] = useState([]);

  return (
    <div>
      <h1>History</h1>
      <ul>
        {(history || []).map((item) => (
          <SongPlaylist key={item.songId} song={item} duration={item.songDuration} />
        ))}
      </ul>
    </div>
  );
}
