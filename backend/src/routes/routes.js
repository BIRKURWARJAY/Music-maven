import getValidAccessToken from "../utils/getAccessToken.js";
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js';
import { Router } from 'express';

const routes = Router();

//Sending accessToken on api to get fetch from frontend 
routes.get("/generalToken", async (req, res) => {
  try {
    const newAccessToken = await getValidAccessToken();
    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch access token" });
  }
});


//Getting code if user is new and sending AT, RT
routes.post("/getAccessToken", async (req, res) => {
  const { code } = req.body;

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append("client_id", process.env.CLIENTID);
  params.append("client_secret", process.env.CLIENTSECRET);

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();
    res.json(data); // contains access_token, refresh_token, expires_in
  } catch (err) {
    console.error("Error getting token", err);
    res.status(500).json({ error: "Failed to get token" });
  }
});


//Getting refresh token and sending back accessToken
routes.post("/refreshAccessToken", async (req, res) => {
  const { refreshToken } = req.body;

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);
  params.append("client_id", process.env.CLIENTID);
  params.append("client_secret", process.env.CLIENTSECRET);

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();
    res.json(data);
    
  } catch (err) {
    console.error("Error refreshing token", err);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});



//Getting SongId from frontend to play a song from songId
routes.post("/accessSongId", async (req, res) => {
  try {
    const { songId } = await req.body;
    console.log(songId);
  } catch (error) {
    console.error("ERROR Receiving songId:::");   
  }
})


//Getting user data from frontend for signup
routes.post("/register", registerUser)



//Getting user data from frontend for login
routes.post("/login", loginUser)


//Logging out user
routes.post("/logout", logoutUser)


export default routes;