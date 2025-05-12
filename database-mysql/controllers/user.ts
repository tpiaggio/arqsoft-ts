import {Request, Response} from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
};

export const createUser = async (req: Request, res: Response) => {
  const {firstName, lastName} = req.body;
  try {
    // Create a new user
    const user = await User.create({ firstName, lastName });
    console.log("auto-generated ID:", user.id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      const updatedUser = await user.update(req.body);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.status(200).json(user);
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
};
