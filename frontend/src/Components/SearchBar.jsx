import { Link } from "react-router-dom";
import { fetchSongs } from "../../features/AccessToken";
import { useEffect, useState, useCallback, useRef } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();

  // Debounced search function
  const debouncedSearch = useCallback(
    async (searchTerm) => {
      if (searchTerm?.length > 3 && searchTerm !== prevSearch) {
        let songs = await fetchSongs(searchTerm, 3);
        setSongs(songs);
        console.log(songs);

        console.log("Search term:", searchTerm);
        console.log("Found songs:", songs);
        setPrevSearch(searchTerm);
      } else if (searchTerm.length < 4){
        setSongs([]);
      }
    },
    [prevSearch]
  );

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", () => setIsFocused(true));
      inputElement.addEventListener("blur", () => setIsFocused(false));
    }

    const timeoutId = setTimeout(() => {
      debouncedSearch(search);
    }, 1000);

    // Cleanup timeout on every search change
    return () => clearTimeout(timeoutId);
  }, [search, debouncedSearch]);

  return (
    <>
      <div className="w-[70%]">
        <input
          type="text"
          placeholder="Search for songs, artists, albums, podcasts"
          className="rounded-lg p-3 w-full bg-white bg-opacity-5 backdrop-blur-lg text-slate-400 caret-slate-400 border-none outline-none focus:bg-slate-950 hover:bg-opacity-15"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
        />
        {songs.length > 2 && isFocused ? (
          <span className=" w-full">
            {songs?.map((song, index) => (
              <Link to={`/${song.id}`}>
                <button
                  key={index}
                  value={song}
                  className="rounded-lg p-3 w-full bg-opacity-5 backdrop-blur-lg text-slate-400 outline-none hover:bg-opacity-15"
                >
                  {song.name}
                </button>
              </Link>
            ))}
          </span>
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
}
