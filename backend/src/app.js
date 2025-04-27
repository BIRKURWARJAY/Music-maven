import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import getValidAccessToken from './index.js';
import { registerUser, loginUser, logoutUser } from './controllers/user.controller.js';


export const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());



//Sending accessToken on api to get fetch from frontend 
app.get("/api/generalToken", async (req, res) => {
  try {
    const newAccessToken = await getValidAccessToken();    
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});


//Getting code if user is new and sending AT, RT
app.post("/api/getAccessToken", async (req, res) => {
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
app.post("/api/refreshAccessToken", async (req, res) => {
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
app.post("/api/accessSongId", async (req, res) => {
  try {
    const { songId } = await req.body;
    console.log(songId);
  } catch (error) {
    console.error("ERROR Receiving songId:::");   
  }
})


//Getting user data from frontend for signup
app.post("/api/register", registerUser)



//Getting user data from frontend for login
app.post("/api/login", loginUser)


//Logging out user
app.post("/api/logout", logoutUser)



const server = app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

// Handle graceful shutdown
process.on('SIGTERM' || "EADDRINUSE", () => {
  console.info('SIGTERM signal received.');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT' || "EADDRINUSE", () => {
  console.info('SIGINT signal received.');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});