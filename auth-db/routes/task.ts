import {Router} from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  getTasksByUser,
  updateTask,
} from "../controllers/task";
import {verifyToken} from "../middlewares/auth";

const router = Router();
router.use(verifyToken);

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.get("/users/:id/tasks", getTasksByUser);

export default router;
