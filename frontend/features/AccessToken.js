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

export const accessToken = await fetchAccessToken();


//function that fetch the demanded songs
export const fetchSongs = async (query, limit = 20) => {
  try {
    if (accessToken) {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=${limit}&offset=10`,
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
      return "access Token Expired";
    }

  } catch (error) {
    console.error("Error fetching songs", error);
    return error;
  }
};



//function that fetch the demanded album;
export const fetchAlbum = async (query, limit = 20) => {
  try {
    if (accessToken) {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=album&limit=${limit}&offset=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const data = await response.json();
      console.log(data);
      
        let song = data.albums.items;
        return song;
    } else {
      return "access Token Expired";
    }

  } catch (error) {
    console.error("Error fetching songs", error);
    return error;
  }
};




//function that fetch the demanded album tracks;
export const fetchAlbumsTracks = async (albumId) => {
  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await res.json();
  const trackIds = data.items.map(track => track.id);

  if (!trackIds.length) return [];

  // Fetch full track details (limit to 50 at a time)
  const fullTrackRes = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIds.slice(0, 50).join(',')}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const fullTrackData = await fullTrackRes.json();
  
  return fullTrackData.tracks;
};
