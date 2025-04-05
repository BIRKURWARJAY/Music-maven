import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from "../App";

// Lazy load components
const Login = lazy(() => import("./Login"));
const SignUp = lazy(() => import("./SignUp"));
const Playlist = lazy(() => import("./Playlist"));
const Home = lazy(() => import("./Home"));
const SongDetails = lazy(() => import("./SongDetails"));
const History = lazy(() => import("./History"));
const LikedSongs = lazy(() => import("./LikedSongs"));
const Premium = lazy(() => import("./Premium"));
const Profile = lazy(() => import("./Profile"));
const SingerDetails = lazy(() => import("./SingerDetails"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const Callback = lazy(() => import("./Callback"));


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="callback" element={<Callback />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='home' element={<Home />} />
      <Route path="song/:songId" element={<SongDetails />} />
      <Route path="playlist" element={<ProtectedRoute Children={ Playlist } /> } />
      <Route path="history" element={<History />} />
      <Route path="liked-songs" element={<LikedSongs />} />
      <Route path="premium" element={<Premium />} />
      <Route path="profile" element={<Profile />} />
      <Route path="artist/:name" element={<SingerDetails />} />
    </Route>
  )
);

export default router;