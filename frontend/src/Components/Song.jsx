import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SongProvider } from "../Contexts/SongContext";

function Song( {song} ) {

  const [songDetail, setSongDetail] = useState({});
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState(""); 
 
  const getSong = (song) => { {song} }

  useEffect(() => {
    setSongDetail(song);
    setThumbnail(song.thumbnail);
    setTitle(song.title);
    setArtist(song.artist);
  })

  useEffect(() => {
    getSong(songDetail);
  })



  return (
    <SongProvider value={{ song, getSong }}>
      <Link to={`trendingsong/${song.title}/${song.id}/details`}>
        <div className="song size-[15%] bg-black text-white rounded-lg p-4">
          <img src={thumbnail} alt="song img" className="w-full h-[75%]" />
          <h3 className="text-lg font-bold my-3 text-balance">{title}</h3>
          <p className="text-sm my-2 text-ellipsis">{artist}</p>
        </div>
      </Link>
    </SongProvider>
  );
}


export default Song;