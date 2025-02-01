import mongoose from "mongoose";

const playlistSong = mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  ref: "Song"
});

const playlistSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  playlistSong: [ playlistSong ]
  
}, { timestamps: true });

export const Playlist = mongoose.model("Playlist", playlistSchema);