import { useState } from "react";
import { Link } from "react-router-dom";

export default function SongPlaylist({ song }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-2 bg-transparent text-white rounded-lg mb-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="song-playlist flex justify-between items-center relative">
        <div className="flex gap-3 items-center relative">
          <div className="relative">
            <img
              src={song.imageUrl}
              alt={song.name}
              className={`size-16 rounded-md transition-all duration-300 ${isHovered ? "brightness-50" : ""}`}
            />
            {isHovered && (
              <i className="fa-solid fa-play text-xl absolute inset-0 flex items-center justify-center text-white"></i>
            )}
          </div>
          <div className="song-playlist-info">
            <h3 className="font-bold text-xl">{song.name}</h3>
            <p className="text-[#7F7676] font-semibold truncate">
              {song.artist?.map((artist, index) => (
                <span>
                  <Link
                    key={artist}
                    onMouseOver={(e) => {
                      e.currentTarget.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = "none";
                    }}
                  >
                    {artist}
                  </Link>
                  {index < song.artist.length - 2 ? "  ,  " : ""}
                  {index === song.artist.length - 2 ? "  &  " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
        {isHovered ? (
          <div className="flex gap-2 items-center">
            <i className="fa-regular fa-thumbs-up rotate-180 text-2xl text-white px-3 py-2 rounded-full hover:bg-white hover:bg-opacity-5"></i>
            <i
              className={`fa-regular fa-thumbs-up text-2xl text-white px-3 py-2 rounded-full hover:bg-white hover:bg-opacity-5 `}
            ></i>
            <input
              type="checkbox"
              className=" size-4 "
            />
            <i className="fa-solid fa-ellipsis-vertical text-xl px-5 py-2 hover:bg-white hover:bg-opacity-5 rounded-full"></i>
          </div>
        ) : (
          <div className="song-playlist-options flex items-center gap-x-4">
            <input
              type="checkbox"
              className="size-4"
            />
            <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
          </div>
        )}
      </div>
    </div>
  );
}
