import { create } from 'zustand';


const useAlbumPlayerStore = create((set) => ({
  isPlayingAS: false,
  isAlbumTrack: null,
  currentAlbumId: null,
  setIsPlayingAS: (value) => set({ isPlayingAS: value }),
  setIsAlbumTrack: (value) => set({ isAlbumTrack: value }),
  setCurrentAlbumId: (value) => set({ currentAlbumId: value })
}));

export default useAlbumPlayerStore;
