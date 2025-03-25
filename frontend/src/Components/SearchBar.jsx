import { Link, Links } from "react-router-dom";
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
      <div className="w-[70%] relative">
        <input
          type="text"
          placeholder="Search for songs, artists, albums, podcasts"
          className="rounded-lg p-3 w-full bg-white bg-opacity-5 backdrop-blur-lg text-slate-400 caret-slate-400 border-none outline-none focus:bg-slate-950 hover:bg-opacity-15"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
        />
        {songs.length > 0 && isFocused ? (
          <ul className="w-full flex flex-col absolute top-12 left-0 bg-opacity-5 backdrop-blur-lg">
            {songs?.map((song, index) => (              
              <Link to={`/${song.id}`} key={index}>
                <li
                  value={song}
                  className="rounded-lg p-3 w-full text-slate-400 outline-none 
                bg-slate-950 hover:bg-opacity-15 hover:bg-white"
                >
                  {song.name}
                </li>
              </Link>    
            ))}
          </ul>
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
}
