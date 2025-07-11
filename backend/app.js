import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './src/routes/routes.js';
import { connectDB } from "./src/db/index.js"
import dotenv from "dotenv";
dotenv.config();

connectDB();



const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());



app.use("/api", routes);



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