function SearchBar() {
  return (
      <input
        type="text"
        placeholder="Search for songs, artists, albums, podcasts"
        className="rounded-lg p-3 bg-white bg-opacity-5 backdrop-blur-lg text-slate-400 caret-slate-400 border-none outline-none focus:bg-slate-950 hover:bg-opacity-15"
        style={{ width: "70%" }}
      />
  );
}

export default SearchBar; 