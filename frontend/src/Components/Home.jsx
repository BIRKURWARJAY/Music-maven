import { lazy } from "react";


const Genres = lazy(() => import("./Genres") );
const TrendingSongsList = lazy(() => import("./TrendingSongsList") );
const ArtistsAlbum = lazy(() => import("./ArtistsAlbum") );



export const isLoggedIn = localStorage.getItem("accessToken") ? true : false;


export default function Home() {



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
