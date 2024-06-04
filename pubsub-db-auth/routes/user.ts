import {Router} from "express";
import {
  blockUser,
  createUser,
  followUser,
  unblockUser,
  unfollowUser,
} from "../controllers/user";
import {verifyToken} from "../middlewares/auth";

const router = Router();

router.post("/users", createUser);
router.post("/follow", verifyToken, followUser);
router.post("/unfollow", verifyToken, unfollowUser);
router.post("/block", verifyToken, blockUser);
router.post("/unblock", verifyToken, unblockUser);

export default router;
