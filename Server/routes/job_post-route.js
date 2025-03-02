import { getalljobs, CreateJobPost, getJobsbyId, employer_jobs, applyForJob, getCandidateApplications, job_application, job_applicants } from "../controllers/job_post-controller.js";
import { Router } from "express";
import { verifyToken } from "../middleware/employer-auth.js";

const router = Router();

router.get("/jobs", getalljobs); //to get some details of all the jobs in db
router.post("/create_Job_Post", CreateJobPost); //to create a job post by filling the required fields
router.get("/job_details/:id", getJobsbyId); //to get a job full details of a particular job
router.get("/employer_jobs/:id", employer_jobs);
router.post("/apply_job", applyForJob) //
router.get("/applied_jobs/:id", getCandidateApplications);
router.get("/job_application/:id", job_application);
router.get("/job_applicants/:id", job_applicants);

console.log("in job post route", );
export default router;