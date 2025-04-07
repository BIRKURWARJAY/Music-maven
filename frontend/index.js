const token = localStorage.getItem("accessToken")



if (!token) {
  console.error("❌ Token not found in cookies. Please log in to retrieve a valid token.");
}


// Initialize the Spotify Player
function initializeSpotifyPlayer() {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'My Web Player',
      getOAuthToken: cb => { cb(token); },
      volume: 1
    });

    // Connect to the player
    player.connect()
      .then(res => console.log("✅ Player is connected successfully"))
      .catch(err => console.error("❌ Player connection error:", err));

    player.addListener('ready', async ({ device_id }) => {
      console.log('✅ Player ready:', device_id);
      localStorage.setItem("device_Id", device_id);
      try {
        // Transfer playback to the new device
        await fetch(`https://api.spotify.com/v1/me/player`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: true
          })
        });
        console.log('🎯 Playback transferred');

        
      } catch (error) {
        console.error('❌ Playback failed:', error);
      }
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.warn('⚠️ Player not ready:', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
      console.error('❌ Initialization error:', message);
    });

    player.addListener('authentication_error', ({ message }) => {
      console.error('❌ Authentication error:', message);
    });

    player.addListener('account_error', ({ message }) => {
      console.error('❌ Account error:', message);
    });
  };
}

// Ensure the Spotify Web Playback SDK script is loaded before initializing
if (typeof Spotify === 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  script.onload = initializeSpotifyPlayer;
  document.head.appendChild(script);
} else {
  initializeSpotifyPlayer();
}



// Function that plays the song
export async function playSong(songId) {
  const device_id = localStorage.getItem("device_Id");
  if (!device_id) {
    console.error("❌ Device ID not found. Ensure the player is ready.");
    return;
  }

  try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
     method: 'PUT',
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       uris: [`spotify:track:${songId}`]
     })
   });

    

  } catch (error) {
      console.error("❌ Error playing song:", error);
  }
}



