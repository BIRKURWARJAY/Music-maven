import { useLocation } from "react-router-dom"



export default function SingerDetails() {

  const location = useLocation();
  const { artist, artistId } = location.state || "";

  return (
    <>
      <div className="mt-28 mx-28 bg-black text-white font-2xl text-center py-2">Name: {artist} :::::  Id: { artistId }</div>
    </>
  )
}
