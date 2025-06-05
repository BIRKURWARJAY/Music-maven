import mongoose from 'mongoose';


export const connectDB = async () => {

  try {
      
    const connectionInstance = await mongoose.connect(`mongodb+srv://birkurwarjay01:Birk@musicmaven.pxl0o.mongodb.net`);
    console.log("DB Connected:::");

  } catch (error) {
    console.error("ERROR connecting DB :::", error);
    process.exit(1);
  }

}