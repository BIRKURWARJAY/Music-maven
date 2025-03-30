import { lazy } from "react";
import { useLocation } from "react-router-dom";



const Genres = lazy(() => import("./Genres") );
const TrendingSongsList = lazy(() => import("./TrendingSongsList") );
const ArtistsAlbum = lazy(() => import("./ArtistsAlbum") );

export const isLoggedIn = localStorage.getItem("isLoggedIn");


export default function Home() {

  const location = useLocation();
  const { state } = location || false;
  if (state) {
    localStorage.setItem("isLoggedIn", state.success);
  }

  return (
    <> 
      <div className="flex flex-col gap-y-8">
        <Genres />
        <TrendingSongsList />
        <ArtistsAlbum />
      </div>
    </>
  )
}
