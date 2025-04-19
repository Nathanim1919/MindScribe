import dotenv from "dotenv";
dotenv.config();


import mongoose from "mongoose";

export const connectMongo = async () => {
  const mongoURI = process.env.MONGO_URI as string;
  console.log("Mongo URI:", mongoURI);
  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in .env file");
  }
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
