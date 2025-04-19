import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { auth } from "./lib/auth.ts";
import { toNodeHandler } from "better-auth/node";

const app = express();

// Middleware stack
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Authentication middleware
app.use("/api/v1/auth", toNodeHandler(auth)); // Authentication routes

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(morgan("dev")); // HTTP request logger

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// other routes

export default app;
