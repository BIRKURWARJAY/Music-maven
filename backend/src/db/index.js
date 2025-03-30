import mongoose from 'mongoose';


export const connectDB = async () => {

  try {
      
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    console.log("DB Connected:::");

  } catch (error) {
    console.error("ERROR connecting DB :::", error);
    process.exit(1);
  }

}