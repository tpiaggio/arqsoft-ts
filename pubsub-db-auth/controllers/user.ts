import bcrypt from "bcrypt";
import {Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const {username, email, password} = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password: hash});
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
    res.json({token});
  } catch (error) {
    res.status(500).json({error});
  }
};

export const followUser = async (req: Request, res: Response) => {
  const {userId} = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (user && !user.followers.includes(userId)) {
      user.followers.push(userId);
      await user.save();
    }
    res.status(200).send("User followed");
  } catch (err) {
    res.status(500).send("There was a problem following the user");
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  const {userId} = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      user.followers = user.followers.filter(
        (follower) => follower.toString() !== userId
      );
      await user.save();
    }
    res.status(200).send("User unfollowed");
  } catch (err) {
    res.status(500).send("There was a problem unfollowing the user");
  }
};

export const blockUser = async (req: Request, res: Response) => {
  const {userId} = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (user && !user.blocked.includes(userId)) {
      user.blocked.push(userId);
      await user.save();
    }
    res.status(200).send("User blocked");
  } catch (err) {
    res.status(500).send("There was a problem blocking the user");
  }
};

export const unblockUser = async (req: Request, res: Response) => {
  const {userId} = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      user.blocked = user.blocked.filter(
        (blockedUser) => blockedUser.toString() !== userId
      );
      await user.save();
    }
    res.status(200).send("User unblocked");
  } catch (err) {
    res.status(500).send("There was a problem unblocking the user");
  }
};
