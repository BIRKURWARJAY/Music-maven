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
const Payment = lazy(() => import("./Payment"));
const Profile = lazy(() => import("./Profile"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="" element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='home' element={<Home />} />
      <Route path='playlist' element={<Playlist />} />
      <Route path=":songId" element={<SongDetails />} />
      <Route path="history" element={<History />} />
      <Route path="liked-songs" element={<LikedSongs />} />
      <Route path="premium" element={<Premium />} />
      <Route path="payment" element={<Payment />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

export default router;