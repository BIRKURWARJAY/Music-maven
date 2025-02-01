import express from 'express';
import songs from "./index.js"

const app = express();

app.get('/api/Songs', (req, res) => {
  res.send([songs]);
})


app.listen(3000, () => {
  console.log('server is started on http://localhost:3000/api/songs');
})