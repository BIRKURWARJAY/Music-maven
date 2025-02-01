// Function to get the access token
const getAccessToken = async () => {
  const clientId = '6165f00cf08c4e44837ce912f57d6e6d'; // Replace with your client ID
  const clientSecret = '1dfb3383fba14678b42d3e66159d1e6c'; // Replace with your client secret

  const auth = 'Basic ' + btoa(clientId + ':' + clientSecret);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();
  return data.access_token; // Return the access token
};

let accessToken = await getAccessToken();
// console.log(accessToken);


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


let trendingSongs = await fetchSongs(accessToken, 'trending');
let albumSongs = await fetchSongs(accessToken, "albums")

let songs = {trendingSongs, albumSongs}

export default songs;