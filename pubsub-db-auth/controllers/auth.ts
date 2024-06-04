import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (user) {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (isValid) {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
        res.json({token});
      } else {
        res.status(401).json({error: "Invalid Password"});
      }
    } else {
      res.status(401).json({error: "User does not exist"});
    }
  } catch (e) {
    res.status(500).send();
  }
};
