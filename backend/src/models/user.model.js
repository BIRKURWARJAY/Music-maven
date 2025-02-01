import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  subscriptionType: {
    type: String,
    default: "free"
  },

  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription"
    }
  ],

  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist"
    }
  ],

  streams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stream"
    }
  ]

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);