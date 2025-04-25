import { Link } from "react-router-dom";
import {
  fetchSongs,
  fetchAlbum
} from "../../features/AccessToken";
import { useEffect, useState, useCallback, useRef } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();

  const debouncedSearch = useCallback(
    async (searchTerm) => {
      const trimmedSearch = searchTerm.trim();

      if (trimmedSearch.toLowerCase().startsWith("album:")) {
        const albumName = trimmedSearch.split("album:")[1]?.trim();
        if (albumName !== prevSearch) {
          const album = await fetchAlbum(albumName, 1);

          setSongs([]);
          setAlbum(album);
          setPrevSearch(albumName);
        }
        return;
      }

      if (trimmedSearch.length < 1) {
        setSongs([]);
        setAlbum(null);
        setPrevSearch("");
        return;
      }

      if (trimmedSearch !== prevSearch) {
        const songs = await fetchSongs(trimmedSearch, 5, 1);
        setAlbum(null);
        setSongs(songs);
        setPrevSearch(trimmedSearch);
      }
    },
    [prevSearch]
  );

  useEffect(() => {
    const inputElement = inputRef.current;
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setTimeout(() => setIsFocused(false), 400);
  
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
    }
  
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("blur", handleBlur);
      }
    };
  }, []);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(search);  // This is where you call the debouncedSearch
    }, 1000);  // The debounce delay is set to 1000ms (1 second)
  
    return () => clearTimeout(timeoutId);  // Cleanup the timeout on every search change
  }, [search, debouncedSearch]);  // Run this effect whenever `search` changes
  

  
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
  <ul className="w-full flex flex-col absolute z-40 top-12 left-0 bg-opacity-5 backdrop-blur-lg">
    {songs.map((song) => (
      <Link
        to={`song/${song.id}`}
        key={song.id}
        state={{
          song: {
            songId: song.id,
            imageUrl: song.album?.images[0]?.url,
            name: song.name,
            artist: song.artists?.map((artist) => artist.name),
            release: song.album?.release_date,
            duration: song.duration_ms,
            artistId: song.artists?.map((artist) => artist.id)
          }
        }}
      >
        <button
          className="rounded-lg p-3 w-full text-slate-400 outline-none 
          bg-slate-950 hover:bg-opacity-15 hover:bg-white border-y-[1px] border-cyan-400"
          onClick={() => setSearch("")}
        >
          {song.name}
        </button>
      </Link>
    ))}
  </ul>
) : album?.length > 0 && isFocused ? (
  <ul className="w-full flex flex-col absolute z-40 top-12 left-0 bg-opacity-5 backdrop-blur-lg">
    {album.map((item) => (
      <Link
        to={`album/${item.id}`}
        key={item.id}
        state={{
          album: {
            albumId: item.id,
            imageUrl: item.images[0]?.url,
            name: item.name,
            artist: item.artists?.map((artist) => artist.name),
            release: item.album?.release_date,
            duration: item.duration_ms,
            artistId: item.artists?.map((artist) => artist.id)
          }
        }}
      >
        <button
          className="rounded-lg p-3 w-full text-slate-400 outline-none 
          bg-slate-950 hover:bg-opacity-15 hover:bg-white border-y-[1px] border-cyan-400"
          onClick={() => setSearch("")}
        >
          {item.name}
        </button>
      </Link>
    ))}
  </ul>
) : null}

      </div>
    </>
  );
}
