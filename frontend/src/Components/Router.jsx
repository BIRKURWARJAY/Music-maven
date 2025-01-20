
import { App, Login, SignUp, Playlist, Home, SongDetails, History, LikedSongs, Premium, Payment, Profile } from "./indexComp"
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="" element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={ <SignUp /> } />
      <Route path='home' element={<Home />} />
      <Route path='playlist' element={<Playlist />} />
    </Route>
  )
)


export default router;