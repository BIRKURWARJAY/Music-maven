import { create } from 'zustand';

const useAlbumPlayerStore = create((set) => ({
  isPlayingAS: false,
  currentTrackIdAS: null,
  setIsPlayingAS: (value) => set({ isPlayingAS: value }),
  setCurrentTrackIdAS: (id) => set({ currentTrackIdAS: id }),
}));

export default useAlbumPlayerStore;
