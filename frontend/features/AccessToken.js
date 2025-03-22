import axios from "axios";

export const fetchAccessToken = async () => {
  try {
    const res = await axios.get("/api/accessToken");
    return res.data.accessToken;
  } catch (err) {
    console.error(" error accessing token");
    
    return null;
  }
};

let accessToken = await fetchAccessToken();

//function that fetch the demanded songs
export const fetchSongs = async (query, limit = 20) => {
  try {
    if (accessToken) {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const data = await response.json();
      
      let song = data.tracks.items;
      return song;
    } else {
      return "erraccess";
    }

  } catch (error) {
    console.error("Error fetching songs", error);
    return err;
  }
};
