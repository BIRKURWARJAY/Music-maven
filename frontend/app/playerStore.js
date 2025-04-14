import { create } from 'zustand';

const usePlayerStore = create((set) => ({
  isPlaying: false,
  currentTrackId: null,
  setIsPlaying: (value) => set({ isPlaying: value }),
  setCurrentTrackId: (id) => set({ currentTrackId: id }),
}));

export default usePlayerStore;
