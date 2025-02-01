import mongoose from "mongoose";

const streamSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song"
  },

  Duration: {
    type: Number,
    required: true
  }

}, {timestamps: true});

export const Stream = mongoose.model("Stream", streamSchema);