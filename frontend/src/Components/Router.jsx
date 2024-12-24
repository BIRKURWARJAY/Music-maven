
import { Login, Playlist, App, SongDetails, Home } from "./indexComp"
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Login />}>
        <Route path='trendingsong/:title/:id/details' element={<SongDetails />} />
      </Route>
      <Route path='Home' element={<Home />} />
      <Route path='Playlist' element={<Playlist />} />
    </Route>
  )
)


export default router;