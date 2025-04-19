// Entry Point for the server.
import dotenv from "dotenv";
dotenv.config();

import app from './app.ts';
import { connectMongo } from "./lib/db.ts";

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
