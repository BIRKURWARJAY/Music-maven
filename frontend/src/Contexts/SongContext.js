import { createContext, useContext } from "react";

export const SongContext = createContext({ 
  song: {},
  getSong: (song) => {}
 });

export const useSongContext = () => useContext(SongContext);

export const SongProvider = SongContext.Provider;