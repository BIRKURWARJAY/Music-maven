import { create } from 'zustand';


const useCurrentSongStore = create((set) => ({
  currentSong: null,
  setCurrentSong: (value) => set({ currentSong: value })
}));

export default useCurrentSongStore;
