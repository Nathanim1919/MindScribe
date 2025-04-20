// Entry Point for the server.
import dotenv from "dotenv";
dotenv.config();

import app from './app.ts';


const PORT = process.env.PORT || 3000;

const start = async () => {

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();

