import { useSongContext } from "../Contexts/SongContext";


function SongDetails() {

  const { song } = useSongContext();

    return (
        <div>
            <h1>Details</h1>
        </div>
    );
}


export default SongDetails;