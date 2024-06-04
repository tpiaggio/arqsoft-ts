import {Router} from "express";
import {
  createPost,
  getPostsByUser,
  likePost,
  dislikePost,
} from "../controllers/post";
import {verifyToken} from "../middlewares/auth";

const router = Router();

router.post("/posts", verifyToken, createPost);
router.get("/users/:id/posts", verifyToken, getPostsByUser);
router.post("/posts/:id/like", verifyToken, likePost);
router.post("/posts/:id/dislike", verifyToken, dislikePost);

export default router;
