import { Link } from "react-router-dom";


export default function SongHome({ song }) {

  return (
    <Link to={{ pathname: `/song/${song.songId}` }} state={{ song }}>
      {song ? (
        <div className="song bg-transparent text-white mb-6 mr-4 w-[250px] rounded-lg">
          <img
            loading="lazy"
            src={song.imageUrl}
            alt={song.name}
            className="rounded-md w-[250px]"
          />
          <div className=" pb-2 w-[250px]">
            <h3 className="text-lg font-bold my-1 break-words truncate px-1">{song.name}</h3>
            <p className="text-md text-slate-200 truncate px-1">
              {song.artist?.join("  ,")}
            </p>
          </div>
        </div>
      ) : (
        <div className="song bg-black bg-opacity-5 my-6 mr-4 w-[250px] rounded-lg">
          <span></span>
        </div>
      )}
    </Link>
  );
}
