import { pipeline } from "@xenova/transformers";

// Load the SBERT model once (global caching)
let embedder;

async function loadModel() {
    if (!embedder) {
        embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    }
}

// Function to generate sentence embeddings
async function generateEmbedding(text) {
    await loadModel();
    
    try {
        const output = await embedder(text, { pooling: "mean", normalize: true });

        // console.log("Raw Output:", output);

        // Ensure the output has a valid structure
        if (!output || typeof output.tolist !== "function") {
            throw new Error("Embedding generation failed, output structure incorrect.");
        }

        const embedding = output.tolist()[0]; // Convert tensor to array

        // console.log("Generated Embedding:", embedding);

        if (!Array.isArray(embedding) || embedding.length === 0) {
            throw new Error("Invalid embedding format or empty embedding.");
        }

        return embedding;
    } catch (error) {
        console.error("Embedding Error:", error.message);
        throw error; // Rethrow the error to be caught in calling function
    }
}

// Function to calculate Cosine Similarity
function cosineSimilarity(vec1, vec2) {
    if (!Array.isArray(vec1) || !Array.isArray(vec2)) {
        throw new Error("Embedding vectors must be arrays");
    }

    if (vec1.length !== vec2.length) {
        throw new Error("Embedding vectors must have the same dimensions");
    }

    const dotProduct = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
    const normA = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
    const normB = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));

    if (normA === 0 || normB === 0) {
        throw new Error("Zero vector detected, cannot compute similarity");
    }

    return dotProduct / (normA * normB);
}

// Sample candidate and job data
const candidate = {
    skills: "JavaScript, React, Node.js",
    experience: "3 years as Full Stack Developer",
    education: "Bachelor's in Computer Science"
};

const job = {
    requiredSkills: "React, Node.js, JavaScript",
    experienceRequired: "2+ years of experience",
    qualification: "B.Tech in Computer Science or related field"
};

// Function to check candidate eligibility
export async function checkCandidateEligibility(candidate, job) {
    if (!candidate || !job) {
        return { error: "Candidate or Job not found" };
    }

    // Use correct property names
    const candidateText = `${candidate.skills} ${candidate.experience} ${candidate.education}`;
    const jobText = `${job.requiredSkills} ${job.experienceRequired} ${job.qualification}`;

    try {
        // Generate embeddings
        const candidateEmbedding = await generateEmbedding(candidateText);
        const jobEmbedding = await generateEmbedding(jobText);

        // console.log("Candidate Embedding:", candidateEmbedding);
        // console.log("Job Embedding:", jobEmbedding);

        // Compute match score
        const matchScore = cosineSimilarity(candidateEmbedding, jobEmbedding) * 100;

        console.log(matchScore)

        // Determine eligibility
        const isEligible = matchScore >= 70 ? "Eligible" : "Not Eligible";

        return { matchScore: matchScore.toFixed(2), eligibility: isEligible };
    } catch (error) {
        console.error("Error:", error.message);
        return { error: error.message };
    }
}


// Example usage:

