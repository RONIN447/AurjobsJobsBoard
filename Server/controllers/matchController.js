import { checkCandidateEligibility } from "../utils/embeddings.js";

export const getJobMatch = async (req, res) => {
    try {
        const { candidate, job } = req.body;

        console.log(candidate,job)
        
     
        if (!candidate || !job) {
            return res.status(404).json({
                success: false,
                error: "Candidate or job not found"
            });
        }
        
        // Get detailed match analysis
        const matchResult = await checkCandidateEligibility(candidate, job);
        
        res.status(200).json({
            success: true,
            match: matchResult
        });
    } catch (error) {
        console.error("Error in getJobMatch:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}