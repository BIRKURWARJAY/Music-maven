import { Link } from "react-router-dom";

export default function CurrentSong({ currentSong }) {
  return (
    <>
      <div className="current-song p-2 bg-rose-400 rounded-lg text-white flex items-center justify-between bottom-0 fixed  w-3/4 content-center">
        <div className="flex items-center gap-2">
          <img
            src={currentSong.imageUrl}
            alt={currentSong.name}
            className="size-16 aspect-square rounded-lg"
          />
          <div className="current-song-info">
            <h3 className="text-lg font-bold">{currentSong.name}</h3>
            <p className="font-semibold truncate">
              {currentSong.artist?.map((artist, index) => (
                <span>
                  <span
                    key={`${currentSong.songId}-${index}`}
                    className="hover:text-[#7f7676]"
                  >
                    <Link
                      onMouseOver={(e) => {
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      {artist}
                    </Link>
                  </span>
                  {index < currentSong.artist.length - 1 ? "  ,  " : ""}
                  {index === currentSong.artist.length - 2 ? "  &  " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 mx-5">
          <input
            type="checkbox"
            className="size-5"
          />
          <i className="fas fa-pause text-2xl"></i>
        </div>
      </div>
    </>
  );
}
