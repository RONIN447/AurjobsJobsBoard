import supabase from "../config/supabase-client.js";
import { employer_jobs } from "../controllers/job_post-controller.js";
console.log("in models job post"); // Ensure supabase is properly imported

const getEmployerDetails = async (employerIds) => {
  if (employerIds.length === 0) return [];

  const { data: employers, error } = await supabase
    .from("employers")
    .select("employer_id, company_display_name, company_logo")
    .in("employer_id", employerIds);

  if (error) throw error;
  return employers;
};
export const employer_Jobs = async (employer_id) => {
  try {
    // Find all jobs posted by the employer using employer_id
    const { data: jobs, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("employer_id", employer_id); // Filtering by employer_id

    if (error) {
      throw new Error(error.message);
    }

    if (!jobs || jobs.length === 0) {
      throw new Error("No jobs found for this employer");
    }

    return jobs;
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error.message}`);
  }
};

export const alljobs = async () => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*");

    if (error) throw error;

    const employerIds = data.map(job => job.employer_id).filter(id => id);
    console.log(employerIds, "employer id");
    const employers = await getEmployerDetails(employerIds);

    const jobsWithCompany = data.map(job => {
      const employer = employers.find(emp => emp.employer_id === job.employer_id);
      return {
        ...job,
        company_display_name: employer ? employer.company_display_name : null,
        company_logo: employer ? employer.company_logo : null
      };
    });

    return jobsWithCompany;
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return [];
  }
};

//this job details for user

export const getJobDetailsByJobId = async (job_id) => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*, employer_id")
      .eq("job_id", job_id)
      .single();

    if (error) throw error;
    if (!data) return null;

    const employers = await getEmployerDetails([data.employer_id]);
    // console.log(employerIds, "employer id");
    const employerData = employers.length > 0 ? employers[0] : null;

    const jobWithCompany = {
      ...data,
      company_display_name: employerData ? employerData.company_display_name : null,
      company_logo: employerData ? employerData.company_logo : null
    };

    console.log("Job details with company info for job_id", job_id, jobWithCompany);
    return jobWithCompany;
  } catch (error) {
    console.error("Error fetching job details with job_id", job_id, error);
    return null;
  }
}

export const getjobsdetailsbyid = async (job_id) => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*, employer_id")
      .eq("job_id", job_id)
      .single();

    if (error) throw error;
    if (!data) return null;

    const employers = await getEmployerDetails([data.employer_id]);
    // console.log(employerIds, "employer id");
    const employerData = employers.length > 0 ? employers[0] : null;

    const jobWithCompany = {
      ...data,
      company_display_name: employerData ? employerData.company_display_name : null,
      company_logo: employerData ? employerData.company_logo : null
    };

    console.log("Job details with company info for job_id", job_id, jobWithCompany);
    return jobWithCompany;
  } catch (error) {
    console.error("Error fetching job details with job_id", job_id, error);
    return null;
  }
};
export const createJobPost = async (
  job_title,
  job_description,
  employment_type,
  job_location,
  salary_range,
  job_experience_required,
  job_skills_required,
  industry,
  work_mode,
  employer_id // Accept employer_id here
) => {
  try {
    const { data, error } = await supabase.from("jobs").insert([{
      job_title,
      job_description,
      employment_type,
      job_location,
      salary_range,
      job_experience_required,
      job_skills_required,
      industry,
      work_mode,
      employer_id, // Now inserting employer_id
      status: "active",
    }]).select("*");

    if (error) throw error;

    console.log("Job created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error inserting job:", error.message);
    return [];
  }
};




//apply job

export const createJobApplication = async (
  job_id,
  candidate_id,
  screening_score
) => {
  try {
    const { data, error } = await supabase
      .from("applications")
      .insert([{
        job_id,
        candidate_id,
        status: 'pending',
        screening_score,
        applied_at: new Date().toISOString(),
      }])
      .select("*");

    if (error) throw error;

    console.log("Job application created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating job application:", error.message);
    throw error;
  }
};


//applied jobs of candidate

export const getApplicationsByCandidateId = async (candidate_id) => {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(`
          *,
          jobs (
            *,
            employer_id (
              company_display_name,
              company_logo
            )
          )
        `)
      .eq("candidate_id", candidate_id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching applications by candidate ID:", error.message);
    throw error;
  }
};

export const Job_application = async (job_id) => {
  try {
    // Fetch the job with the specific job_id
    const { data: job, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("job_id", job_id)  // Filtering by job_id
      .single();  // Ensures only one job is returned
    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

    if (!job) {
      throw new Error("No job found with this job_id");
    }

    return job;
  } catch (error) {
    throw new Error(`Error fetching job application: ${error.message}`);
  }
};

export const getCandidatesForJob = async(job_id) => {

  try {

      // Step 1: Fetch all applications for the given job_id, including screening_score

      const { data: applications, error: applicationError } = await supabase

          .from("applications")

          .select("candidate_id, screening_score")

          .eq("job_id", job_id);



      if (applicationError) throw applicationError;



      if (!applications || applications.length === 0) {

          return { message: "No candidates have applied for this job." };

      }



      // Step 2: Extract candidate_ids and their screening_scores

      const candidateMap = applications.reduce((acc, app) => {

          acc[app.candidate_id] = app.screening_score;

          return acc;

      }, {});



      const candidateIds = Object.keys(candidateMap);



      // Step 3: Fetch all candidate details in parallel

      const candidateDetailsPromises = candidateIds.map(async(candidateID) => {

          const [

              candidate,

              experiences,

              skills,

              languages,

              education,

              certifications,

              addresses

          ] = await Promise.all([

              supabase.from("candidates").select("*").eq("candidate_id", candidateID).single(),

              supabase.from("candidate_experience").select("*").eq("candidate_id", candidateID),

              supabase.from("candidate_skills").select("*").eq("candidate_id", candidateID),

              supabase.from("candidate_languages").select("*").eq("candidate_id", candidateID),

              supabase.from("candidate_education").select("*").eq("candidate_id", candidateID),

              supabase.from("candidate_certifications").select("*").eq("candidate_id", candidateID),

              supabase.from("candidate_address").select("*").eq("candidate_id", candidateID)

          ]);



          if (candidate.error) {

              console.error(`Error fetching candidate ${candidateID}:`, candidate.error.message);

              return null;

          }



          return {

              ...candidate.data,

              job_id,

              screening_score: candidateMap[candidateID], // Include screening_score

              experiences: experiences.data || [],

              skills: skills.data || [],

              languages: languages.data || [],

              education: education.data || [],

              certifications: certifications.data || [],

              addresses: addresses.data || []

          };

      });



      // Wait for all candidate details to resolve

      const candidates = await Promise.all(candidateDetailsPromises);



      // Filter out any null results (in case of errors)

      const validCandidates = candidates.filter((candidate) => candidate !== null);



      if (validCandidates.length === 0) {

          return { message: "No detailed candidate information found." };

      }



      return validCandidates;

  } catch (error) {

      console.error("Error fetching candidates for job:", error.message);

      return { error: error.message };

  }

};







