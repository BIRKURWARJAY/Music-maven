import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './db/index.js';


// connectDB();


// Function to get the access token
const getAccessToken = async () => {
  const clientId = process.env.CLIENTID; 
  const clientSecret = process.env.CLIENTSECRET;

  const auth = 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();
  
  return data.access_token; // Return the access token
};

let accessToken = await getAccessToken();

export default accessToken;