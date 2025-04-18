// Entry Point for the server.
import express from 'express';
import env from 'dotenv';
import { connectMongo } from '@lib/db';

// Load environment variables from .env file
env.config();
// Connect to MongoDB
connectMongo()

const app = express();


app.listen(3000, ()=> {
    console.log('Listening on port 3000');
})