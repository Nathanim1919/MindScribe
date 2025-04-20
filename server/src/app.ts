import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { auth } from "./lib/auth.ts";
import { toNodeHandler } from "better-auth/node";
import { connectMongo } from "./lib/db.ts";

const app = express();

connectMongo();


app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

const betterAuthHandler = toNodeHandler(auth);
app.all("/api/auth/*", toNodeHandler(auth)); // For ExpressJS v4


// Security headers
app.use(helmet());

// console.log("Better Auth Object:", auth);


// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
app.use(morgan("dev"));

app.use(express.json());

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Export the app
export default app;