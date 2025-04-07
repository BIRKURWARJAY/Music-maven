import { useState } from "react";
import { Link } from "react-router-dom";

export default function SongPlaylist({ song }) {
  const [isHovered, setIsHovered] = useState(false);
  const songMin = Math.floor(song.duration / 60000);
  const songSec = ((song.duration % 60000) / 1000).toFixed(0);
  const songDuration = `${songMin} : ${songSec < 10 ? "0" : ""} ${songSec}`




  return (
    <div
      className="p-2  text-white rounded-lg mb-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="song-playlist flex justify-between items-center relative">
        <div className="flex gap-3 items-center relative">
          <div className="relative">
            <img
              loading="lazy"
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
                <span key={`${song.songId}-${index}`}>
                  <span>
                    <Link
                      to={`/artist/${artist.split(" ").join("")}`}
                      state={{ artist, artistId: song.artistId[index] }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      {artist}
                    </Link>
                    {index < song.artist.length - 1 ? "  ,  " : ""}
                    {index === song.artist.length - 2 ? "  &  " : ""}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
        {isHovered ? (
          <div className="flex gap-2 items-center">
            <i
              className={`fa-regular fa-thumbs-up text-2xl text-white px-3 py-2 rounded-full hover:bg-white hover:bg-opacity-5 `}
              title="Like the Song"
            ></i>
            <input
              type="checkbox"
              className=" size-4 "
              title="Add to Playlist"
            />
            <i className="fa-solid fa-ellipsis-vertical text-xl px-5 py-2 hover:bg-white hover:bg-opacity-5 rounded-full"
            title="Details"></i>
          </div>
        ) : (
          songDuration
        )}
      </div>
    </div>
  );
}
