import express from 'express';
import accessToken from './index.js';
import cors from 'cors';


const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/api/accessToken", async (req, res) => {
  try {
    const newAccessToken = await accessToken;
    setTimeout(async () => {
      newAccessToken = await accessToken;
      return newAccessToken;
    }, 3600000);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});

app.post("/api/accessSongId", async (req, res) => {
  try {
    const { songId } = await req.body;
    console.log(songId);
  } catch (error) {
    console.error("ERROR Receiving songId:::");   
  }
})

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});