import { create } from 'zustand';


const useAlbumPlayerStore = create((set) => ({
  isPlayingAS: false,
  currentTrackIdAS: null,
  isAlbumTrack: false,
  setIsPlayingAS: (value) => set({ isPlayingAS: value }),
  setCurrentTrackIdAS: (id) => set({ currentTrackIdAS: id }),
  setIsAlbumTrack: (value) => set({ isAlbumTrack: value })
}));

export default useAlbumPlayerStore;
