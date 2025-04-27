import { create } from 'zustand';


const useCurrentSongStore = create((set) => ({
  isLoggedIn: false,
  webAccessToken: null,
  currentSongId: null,
  currentAlbumId: null,
  isPlaying: false,
  currentArtistId: null,
  currentPosition: 0,
  player: null,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setWebAccessToken: (value) => set({ webAccessToken: value }),
  setCurrentSongId: (value) => set({ currentSongId: value }),
  setCurrentAlbumId: (value) => set({ currentAlbumId: value }),
  setIsPlaying: (value) => set({ isPlaying: value }),
  setCurrentArtistId: (id) => set({ currentArtistId: id }),
  setCurrentPosition: (position) => set({ currentPosition: position }),
  setPlayer: (instance) => set({player: instance})
}));

export default useCurrentSongStore;
