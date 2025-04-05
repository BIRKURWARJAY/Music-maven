



const token = document.cookie.split(";").find(cookie => cookie.trim().startsWith("token="))?.split("=")[1];


function initializeSpotifyPlayer() {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'My Web Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });
  
    // Connect to the player
    player.connect()
      .then(res => console.log("Player is Connected Successfully:::"))
      .catch(err => console.error("Player Connection error:::" , err))
  
    // Error and state handling
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
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
