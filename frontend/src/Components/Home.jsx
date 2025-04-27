import { lazy } from "react";

const Genres = lazy(() => import("./Genres") );
const TrendingSongsList = lazy(() => import("./TrendingSongsList") );
const ArtistsAlbum = lazy(() => import("./ArtistsAlbum"));



export default function Home() {

  return (
    <> 
      <div className="flex flex-col pb-28 gap-y-8">
        <Genres />
        <TrendingSongsList />
        <ArtistsAlbum />
      </div>
    </>
  )
}
