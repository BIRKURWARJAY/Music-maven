import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend")
})



// const port = 3000;

app.listen(4000, () => {
  console.log(`listening on port http://localhost:${4000}`)
})