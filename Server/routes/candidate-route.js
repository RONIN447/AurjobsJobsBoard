import { Router } from "express";
import CandidateController from "../controllers/candidate-controller.js";
import { verifyToken } from "../middleware/candidate-auth.js";

const router = Router();

// Candidate Signup Route
router.post("/CandidateSignup", CandidateController.signupCandidate); // Handle candidate signup
router.post("/CandidateLogin", CandidateController.loginCandidate); // Handles candidate login
router.get("/CandidateProfile/:id", CandidateController.getCandidateProfile); // Handles candidate profile
router.put("/CandidateProfile/:id", verifyToken, CandidateController.updateCandidateProfile); // Updates candidate profile and related tables
console.log("hey im in candidate-route.js file");
export default router;