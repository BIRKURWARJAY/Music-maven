import useCurrentSongStore from "./app/currentSongStore";

// Utility: Wait until SDK is available
function waitForSpotifySDK() {
  return new Promise((resolve) => {
    if (window.Spotify) return resolve();
    window.onSpotifyWebPlaybackSDKReady = () => {
      resolve();
    };
    // Inject the script only if not already added
    if (!document.getElementById("spotify-sdk")) {
      const script = document.createElement("script");
      script.id = "spotify-sdk";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }
  });
}



// Utility: Wait for token to be available in localStorage
function waitForAccessToken() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        clearInterval(interval);
        resolve(token);
      }
    }, 500);
  });
}


//function for setting player
export async function initializeSpotifyPlayer() {
  const setPlayer = useCurrentSongStore.getState().setPlayer;
   
  const token = await waitForAccessToken();
  await waitForSpotifySDK();

  const player = new Spotify.Player({
    name: "Music Maven",
    getOAuthToken: (cb) => {
      const refreshedToken = localStorage.getItem("accessToken");
      cb(refreshedToken);
    },
    enableMediaSession: true,
    volume: 1
  });

  player.connect()
    .then(() => {
      console.log("✅ Player is connected successfully");
      setPlayer(player);
    })
    .catch((err) => {
      console.error("❌ Player connection error:", err);
    });

  player.addListener("ready", async ({ device_id }) => {
    console.log("✅ Player ready:", device_id);
    localStorage.setItem("device_Id", device_id);

    try {
      await fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          device_ids: [device_id],
          play: false
        })
      });
      console.log("🎯 Playback transferred");
    } catch (error) {
      console.error("❌ Playback transfer failed:", error);
    }
  });

  player.addListener("not_ready", ({ device_id }) => {
    console.warn("⚠️ Player not ready:", device_id);
  });

  player.addListener("initialization_error", ({ message }) => {
    console.error("❌ Initialization error:", message);
  });

  player.addListener("authentication_error", ({ message }) => {
    console.error("❌ Authentication error:", message);
  });

  player.addListener("account_error", ({ message }) => {
    console.error("❌ Account error:", message);
  });
}


// Function that plays the song
export async function playSongById(songId) {
  const token = localStorage.getItem("accessToken");
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
    console.log("Song is Playing");
  } catch (error) {
    console.error("❌ Error playing song:", error);
  }
}


// Function that plays the album
export async function playAlbumById(albumId) {
  const token = localStorage.getItem("accessToken");
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
        context_uri: `spotify:album:${albumId}`,
      })
    });
    console.log("Song is Playing");
  } catch (error) {
    console.error("❌ Error playing song:", error);
  }
}