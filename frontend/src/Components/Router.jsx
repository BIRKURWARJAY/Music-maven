
import { Login, Playlist, App, SongDetails, Home, SignUp } from "./indexComp"
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={ <SignUp /> } />
      <Route path='home' element={<Home />} />
      <Route path='playlist' element={<Playlist />} />
    </Route>
  )
)


export default router;