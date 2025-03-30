import mongoose from "mongoose";
import bcrypt from "bcrypt";



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



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
})


export const isPasswordCorrect = userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}



export const User = mongoose.model("User", userSchema);