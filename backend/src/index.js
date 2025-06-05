
import {connectDB} from "./db/index.js"
import dotenv from "dotenv";
dotenv.config();
connectDB();

const clientId = "6165f00cf08c4e44837ce912f57d6e6d";
const clientSecret = "1dfb3383fba14678b42d3e66159d1e6c";

let accessToken = null;
let tokenExpiryTime = null;

const getAccessToken = async () => {
  const auth =
    "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials"
    })
  });

  const data = await response.json();
  
  accessToken = data.access_token;
  tokenExpiryTime = Date.now() + data.expires_in * 1000;

  console.log("✅ Spotify access token refreshed");

  return accessToken;
};


// Public function to always get a valid token
const getValidAccessToken = async () => {
  if (!accessToken || Date.now() >= tokenExpiryTime - 60 * 1000) {
    return await getAccessToken();
  }
  
  return accessToken;
};

setInterval(async () => {
 accessToken =  await getValidAccessToken()
}, 59 * 60 * 1000 + 1000);


export default getValidAccessToken;