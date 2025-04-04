import { lazy } from "react";
import { useLocation } from "react-router-dom";



const Genres = lazy(() => import("./Genres") );
const TrendingSongsList = lazy(() => import("./TrendingSongsList") );
const ArtistsAlbum = lazy(() => import("./ArtistsAlbum") );

export const isLoggedIn = document.cookie?.split("isLoggedIn=").at(-1) === "true" ? true : false;



export default function Home() {

  const location = useLocation();
  const { state } = location || false;
  if (state) {
    document.cookie = `isLoggedIn=${state.success}; path=/;`;
    
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
