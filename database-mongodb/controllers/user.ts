import {Request, Response} from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const getUser = async (req: Request, res: Response) => {
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
};

export const createUser = async (req: Request, res: Response) => {
  const {name, email} = req.body;
  try {
    const user = new User({name, email});
    const response = await user.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const updateUser = async (req: Request, res: Response) => {
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
};

export const deleteUser = async (req: Request, res: Response) => {
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
};
