import { Header, Genres, TrendingSongsList, ArtistsAlbum } from "./indexComp";



function Home() {


  return (
    <>
      <Header />  
      <div className="flex flex-col gap-y-8">
        <Genres />
        <TrendingSongsList />
        <ArtistsAlbum />
      </div>
    </>
  )
}

export default Home;