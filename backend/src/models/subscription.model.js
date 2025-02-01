import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true
  },

  paymentStatus: {
    type: String,
    required: true,
    enum: ["pending", "cancelled", "successful"]
  },

  paymentMode: {
    type: String,
    required: true
  },

}, { timestamps: true });

export const Subscription = mongoose.model("Subscription", subscriptionSchema);