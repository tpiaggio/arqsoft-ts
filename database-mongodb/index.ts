import express from "express";
import dotenv from "dotenv";

import User from "./models/user";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;

const MONGODB_URI = "mongodb://localhost:27017/arquitectura";
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/users", async function (req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.get("/users/:id", async function (req, res) {
  const userId: string = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
});

app.post("/users", async function (req, res) {
  const {name, email} = req.body;
  try {
    const user = new User({name, email});
    const response = await user.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.put("/users/:id", async function (req, res) {
  const userId: string = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
});

app.delete("/users/:id", async function (req, res) {
  const userId: string = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
});

app.listen(port, () => {
  console.log(`Example publisher listening on port ${port}`);
});
