import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL as string);

export const db = client.db(); // Optionally, specify the database name here

export const connectMongo = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
