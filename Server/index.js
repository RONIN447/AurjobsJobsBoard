import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import candidateRoutes from "./routes/candidate-route.js";
import employerRoutes from "./routes/employer-routes.js";
import jobRoutes from "./routes/job_post-route.js";
import matchRoutes from "./routes/matchRoutes.js"

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if not set

const corsOptions = {
    origin: true,
    credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser());

// Middleware
app.use(bodyParser.json()); // Allow JSON requests

// Candidate Routes
app.use("/candidates", candidateRoutes);
app.use("/employers", employerRoutes)
app.use("/jobs_post", jobRoutes);
app.use("/match",matchRoutes)

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});