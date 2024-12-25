import express from "express";

const exp = express();

exp.get("/", (req, res) => {
  res.send("Backend")
})

e

// const port = 3000;

exp.listen(4000, () => {
  console.log(`listening on port http://localhost:${4000}`)
})