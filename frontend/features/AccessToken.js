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

let accessToken = await fetchAccessToken();


//function that fetch the demanded songs
export const fetchSongs = async (query) => {
  try {
    if (accessToken) {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    
      const data = await response.json();
      let song = data.tracks.items;
      return song;
    } else {
      return "errAccess";
    }
  } catch (error) {
    console.error("Error fetching songs", error);
    return err;
  }
};
