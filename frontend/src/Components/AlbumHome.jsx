import { Link } from "react-router-dom";


export default function AlbumHome({ album }) {



  return (
    <Link to={{ pathname: `/album/${album.albumId}` }} state={{ album }}>
      {album ? (
        <div className="album bg-transparent text-white mb-6 mr-4 w-[250px] rounded-lg">
          <img
            loading="lazy"
            src={album.imageUrl}
            alt={album.name}
            className="rounded-md w-[250px]"
          />
          <div className=" pb-2 w-[250px]">
            <h3 className="text-lg font-bold my-1 break-words truncate px-1">{album.name}</h3>
            <p className="text-md text-slate-200 truncate px-1">
              {album.artist?.join("  ,")}
            </p>
          </div>
        </div>
      ) : (
        <div className="album bg-black bg-opacity-5 my-6 mr-4 w-[250px] rounded-lg">
          <span></span>
        </div>
      )}
    </Link>
  );
}
