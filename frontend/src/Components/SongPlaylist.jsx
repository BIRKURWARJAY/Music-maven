import { useState } from "react";
import { Link } from "react-router-dom";
import sendId from "../../features/songId";
import useCurrentSongStore from "../../app/currentSongStore";




export default function SongPlaylist({ song, duration, resumeSong, pauseSong}) {
  const [isHovered, setIsHovered] = useState(false);
  const songMin = Math.floor(song.duration / 60000);
  const songSec = ((song.duration % 60000) / 1000).toFixed(0);
  const songDuration = `${songMin} : ${songSec < 10 ? "0" : ""} ${songSec}`;
  const { currentSongId, isPlaying } = useCurrentSongStore();
  
  const isCurrentSongPlaying = currentSongId === song.songId && isPlaying;  
  

  return (
    <div
      className="p-2 w-full text-white rounded-lg mb-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="song-playlist w-full flex justify-between items-center relative">
        <div className="flex gap-3 w-[75%] items-center relative">
          <div className="relative cursor-pointer">
            <img
              loading="lazy"
              src={song.imageUrl}
              alt={song.name}
              className={`size-16 rounded-md transition-all duration-300 ${isHovered ? "brightness-50" : ""}`}
            />
            {((!isCurrentSongPlaying) )  && (
              <i
                className="fa-solid fa-play text-xl absolute inset-0 flex items-center justify-center text-white"
                onClick={() => {
                  resumeSong(song.songId);
                  sendId(song.name);
                }}
              ></i>
            )}
  
            {(isCurrentSongPlaying && isPlaying ) && (
              <i
                className="fa-solid fa-pause text-xl absolute inset-0 flex items-center justify-center text-white"
                onClick={() => {
                  pauseSong();
                }}
              ></i>
            )}
          </div>
          <div className="song-playlist-info max-w-[100%] overflow-hidden">
            <h3 className="font-bold text-xl">{song.name}</h3>
            {song.artist.join(", ").length < 70 ? (
              <p className="text-[#7F7676] font-semibold">
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
            ) : (
              <p className="text-[#7F7676] animate-marqueeArtistName whitespace-nowrap hover:[animation-play-state:paused] font-semibold">
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
            )}
          </div>
        </div>
        {isHovered ? (
          <div className="flex gap-2 items-center">
            <i
              className={`fa-regular cursor-pointer fa-thumbs-up text-2xl text-white px-3 py-2 rounded-full hover:bg-white hover:bg-opacity-5 `}
              title="Like the Song"
            ></i>
            <input
              type="checkbox"
              className=" size-4 cursor-pointer"
              title="Add to Playlist"
            />
            <i
              className="fa-solid cursor-pointer fa-ellipsis-vertical text-xl px-5 py-2 hover:bg-white hover:bg-opacity-5 rounded-full"
              title="Details"
            ></i>
          </div>
        ) : (
          duration ? duration : songDuration
        )}
      </div>
    </div>
  );
}
