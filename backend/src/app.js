import express from 'express';
import accessToken from './index.js';

const app = express();

app.get("/api/accessToken", async (req, res) => {
  try {
    const newAccessToken = await accessToken;
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});



app.listen(3000, () => {
  console.log('server is started on http://localhost:3000/api/accessToken');
})