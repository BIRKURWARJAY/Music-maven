import { create } from 'zustand';


const useCurrentSongStore = create((set) => ({
  currentSongId: null,
  currentAlbumId: null,
  isPlaying: false,
  currentArtistId: null,
  currentPosition: 0,
  setCurrentSongId: (value) => set({ currentSongId: value }),
  setCurrentAlbumId: (value) => set({ currentAlbumId: value }),
  setIsPlaying: (value) => set({ isPlaying: value }),
  setCurrentArtistId: (id) => set({ currentArtistId: id }),
  setCurrentPosition: (position) => set({ currentPosition: position })
}));

export default useCurrentSongStore;
