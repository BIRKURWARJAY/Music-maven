import { create } from 'zustand';


const usePlayerStore = create((set) => ({
  isPlaying: false,
  currentArtistId: null,
  setIsPlaying: (value) => set({ isPlaying: value }),
  setCurrentArtistId: (id) => set({ currentArtistId: id })
}));

export default usePlayerStore;
