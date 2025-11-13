import express from "express";
import {
  createTask,
  getTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTask);
router.post("/create", createTask);
router.patch("/:taskID/status", updateTaskStatus);
export default router;
