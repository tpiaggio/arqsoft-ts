import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("Authorization");
  const token = authorization ? authorization.replace("Bearer ", "") : null;

  if (!token) {
    return res.status(403).send("A token is required for auth");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.params.userId = decoded.id;
  } catch (e) {
    return res.status(500).send("There was an error verifying the token");
  }
  return next();
};
