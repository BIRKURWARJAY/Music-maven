import { Link } from "react-router-dom";

function SongHome({ song }) {
  return (
    <Link to={"/SongDetails"}>
      <div className="song size-[10%] bg-black text-white">
        <img
          src={song.img}
          alt={song.title}
          className="bg-rose-300 w-full h-40 object-fill"
        />
        <div className="px-2 pb-2">
          <h3 className="text-lg font-bold text-ellipsis my-1 text-balance">
            {song.title}
          </h3>
          <p className="text-sm text-ellipsis">{song.artist}</p>
        </div>
      </div>
    </Link>
  );
}

export default SongHome;
