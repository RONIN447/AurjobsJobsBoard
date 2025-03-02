import express from "express";
import { getJobMatch } from "../controllers/matchController.js";



const router = express.Router();
router.post("/getJobMatch", getJobMatch);

export default router;