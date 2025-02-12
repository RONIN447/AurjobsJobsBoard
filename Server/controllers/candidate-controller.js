import supabase from "../config/supabase-client.js";
import { createCandidate, findByCandidateEmail, findByCandidateID } from "../models/candidate-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class CandidateController {
    //  Candidate Signup
    static async signupCandidate(req, res) {
        try {
            const { email, password, firstname, lastname, phone, location, resume_url } = req.body;

            // Check if the candidate already exists
            const candidate = await findByCandidateEmail(email);
            if (candidate) {
                return res.status(400).json({ error: "Candidate already exists", success: false });
            }

            // Hash the password before storing
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new candidate
            const newCandidate = await createCandidate(email, hashedPassword, firstname, lastname, phone, location, resume_url);

            if (!newCandidate) {
                return res.status(500).json({ error: "Failed to create Candidate", success: false });
            }

            return res.status(201).json({ success: true, message: "Candidate created successfully" });
        } catch (error) {
            console.error("Signup Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // ✅ Candidate Login
    static async loginCandidate(req, res) {
        try {
            const { email, password } = req.body;

            // Checking if the candidate exists
            const candidate = await findByCandidateEmail(email);
            if (!candidate) {
                return res.status(401).json({ error: "Invalid email or password", success: false });
            }

            // Compare the password
            const isMatch = await bcrypt.compare(password, candidate.candidate_password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid email or password", success: false });
            }

            // Creating a JWT token
            console.log("-------", candidate.candidate_id);
            const token = jwt.sign({ candidate_id: candidate.candidate_id },
                process.env.JWT_SECRET, { expiresIn: "72h" }
            );

            // Setting the token in the cookie
            res.cookie("authToken", token, { httpOnly: true });

            return res.status(200).json({ message: "Login successful", token, candidate, success: true });
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async getCandidateProfile(req, res) {
        try {
            const candidate_id = req.candidateId; // Ensure candidateId is set from authentication middleware
            console.log(candidate_id)
            if (!candidate_id) {
                return res.status(400).json({ error: "Candidate ID is missing", success: false });
            }

            const candidate = await findByCandidateID(candidate_id);

            if (!candidate) {
                return res.status(404).json({ error: "Candidate not found", success: false });
            }

            console.log("Candidate Profile:", candidate);
            return res.status(200).json({ success: true, candidate });
        } catch (error) {
            console.error("Error fetching candidate profile:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}




export default CandidateController;