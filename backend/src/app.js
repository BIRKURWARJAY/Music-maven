import express from 'express';
import accessToken from './index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { registerUser, loginUser } from './controllers/user.controller.js';


const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json());



//Sending accessToken on api to get fetch from frontend 
app.get("/api/accessToken", async (req, res) => {
  try {
    const newAccessToken = await accessToken;
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch access token" });
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



const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
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