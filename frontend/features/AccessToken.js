import axios from "axios";



export const fetchAccessToken = async () => {
 try {
   const res = await axios.get("/api/accessToken");
   return res.data.accessToken;

 } catch (err) {
   console.log("Error fetching accessToken", err);
   return null;
 }
};


//function that fetch the demanded songs
const fetchSongs = async (accessToken, query) => {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  let song = data.tracks.items;
  return song;
};

export default fetchSongs;
