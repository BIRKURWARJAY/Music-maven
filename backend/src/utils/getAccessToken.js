import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.CLIENTID ;
const clientSecret = process.env.CLIENTSECRET ;

if (!clientId) {
  throw new Error("Spotify CLIENTID environment variable is not set.");
}
if (!clientSecret) {
  throw new Error("Spotify CLIENTSECRET environment variable is not set.");
}

let accessToken = null;
let tokenExpiryTime = 0;
let refreshPromise = null;
let refreshTimeout = null;

function scheduleTokenRefresh(expiresIn) {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }
  const refreshInMs = (expiresIn - 60) * 1000; // 1 min before expiry
  refreshTimeout = setTimeout(async () => {
    await getAccessToken();
  }, Math.max(refreshInMs, 1000));
}

const getAccessToken = async () => {
  const auth = "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("❌ Failed to refresh Spotify access token:", response.status, data);
    throw new Error(`Spotify token request failed: ${response.status}`);
  }

  if (!data.access_token || !data.expires_in) {
    throw new Error(`Invalid Spotify token response: ${JSON.stringify(data)}`);
  }

  accessToken = data.access_token;
  tokenExpiryTime = Date.now() + data.expires_in * 1000;
  console.log("✅ Spotify access token refreshed");

  scheduleTokenRefresh(data.expires_in);

  return accessToken;
};

const getValidAccessToken = async () => {
  if (!accessToken || Date.now() >= tokenExpiryTime - 60 * 1000) {
    if (!refreshPromise) {
      refreshPromise = getAccessToken().finally(() => {
        refreshPromise = null;
      });
    }
    await refreshPromise;
  }
  return accessToken;
};

getAccessToken();

export default getValidAccessToken;
