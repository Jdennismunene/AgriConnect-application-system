import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import locationRoutes from "./routes/locationRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "AgriConnect API is running",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "AgriConnect backend is healthy",
  });
});

// API routes
app.use("/api/locations", locationRoutes);

app.listen(PORT, () => {
  console.log(`AgriConnect server running on port ${PORT}`);
});