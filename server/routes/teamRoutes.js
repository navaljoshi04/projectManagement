import express from "express";
import { createTeam } from "../controllers/teamController.js";

const router = express.Router();

router.get("/", createTeam);

export default router;
