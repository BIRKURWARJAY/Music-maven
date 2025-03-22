import { fetchSongs } from "../../features/AccessToken";
import { useEffect, useState, useCallback } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    async (searchTerm) => {
      if (searchTerm?.length > 3 && searchTerm !== prevSearch) {
        const songs = await fetchSongs(searchTerm, 3);
        console.log("Search term:", searchTerm);
        console.log("Found songs:", songs);
        setPrevSearch(searchTerm);
      }
    },
    [prevSearch]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(search);
    }, 1000);

    // Cleanup timeout on every search change
    return () => clearTimeout(timeoutId);
  }, [search, debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search for songs, artists, albums, podcasts"
      className="rounded-lg p-3 bg-white bg-opacity-5 backdrop-blur-lg text-slate-400 caret-slate-400 border-none outline-none focus:bg-slate-950 hover:bg-opacity-15"
      style={{ width: "70%" }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}