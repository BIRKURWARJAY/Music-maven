import mongoose from "mongoose";

const songSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  imgUrl: {
    type: String,
    required: true
  },

  artist: {
    type: String,
    required: true
  },

  genre: {
    type: String,
    required: true
  },

  duration: {
    type: String,
    required: true
  },

  releaseDate: {
    type: Date,
    required: true
  }

});

export const Song = mongoose.model("Song", songSchema);