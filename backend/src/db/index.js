import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js";


export const connectDB = async () => {

  try {
    console.warn(`${process.env.MONGODB_URL}`)
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    console.log("DB Connected:::");

  } catch (error) {
    console.error("ERROR connecting DB :::", error);
    process.exit(1);
  }

}