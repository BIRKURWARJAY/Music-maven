import axios from "axios";

export default async function sendId(id) {
  try {
    await axios.post("/api/accessSongId", { songId: id });
    console.log("ID send successfully");
  } catch (error) {
    console.error("Error sending song ID:", error);
  }
}