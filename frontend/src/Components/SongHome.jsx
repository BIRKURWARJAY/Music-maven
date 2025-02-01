import { Link } from "react-router-dom";

function SongHome({ song }) {
  return (
    <Link to={"/SongDetails"}>
      {song ? (
        <div className="song bg-transparent text-white my-6 mr-4 w-[250px] rounded-lg">
          <img
            src={song.album.images[0].url}
            alt={song.name}
            className="bg-rose-300  rounded-md w-[250px]"
          />
          <div className=" pb-2 w-[250px]">
            <h3 className="text-lg font-bold my-1 break-words">{song.name}</h3>
            <p className="text-md text-slate-200 truncate">
              {song.artists[0].name}
            </p>
          </div>
        </div>
      ) : (
        <div className="song bg-transparent text-white my-6 mr-4 w-[250px] rounded-lg">
          <img
            src={""}
            alt={""}
            className="bg-rose-300  rounded-md w-[250px]"
          />
          <div className=" pb-2 w-[250px]">
            <h3 className="text-lg font-bold my-1 break-words">{""}</h3>
            <p className="text-md text-slate-200 truncate">
              {""}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
}

export default SongHome;
