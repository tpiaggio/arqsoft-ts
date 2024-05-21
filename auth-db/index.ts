import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user";
import taskRoutes from "./routes/task";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;

app.use(userRoutes);
app.use(taskRoutes);
app.use(authRoutes);

const MONGODB_URI = "mongodb://localhost:27017/arquitectura";
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Example publisher listening on port ${port}`);
});
