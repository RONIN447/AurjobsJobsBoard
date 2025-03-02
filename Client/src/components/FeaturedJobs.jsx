import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, IndianRupee } from 'lucide-react';
import { BASEURL } from '../utility/config';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FeaturedJobs = () => {

  const [jobs, setJobs] = useState()
  const [jobLoading, setJobLoading] = useState(false)
  const [error, setError] = useState()
 



  const fetchAllJobs = async () => {
    try {
      console.log("APi calling initated")
      setJobLoading(true); // Set loading to true before the API call
      setError(null);
      const res = await axios.get(`${BASEURL}/jobs_post/jobs`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      console.log("Api called")

      console.log(res?.data)
      setJobLoading(false);
      setJobs(res?.data);
      // setLoading(false);


    } catch (err) {
      console.log(err)
      setJobLoading(false);
    } finally {
      setJobLoading(false);
    }
  }


  const featuredJobs = jobs?.slice(0, 6)

  useEffect(() => {
    fetchAllJobs()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-2 text-gray-900 text-center">Featured Jobs</h2>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
        Explore our curated list of featured jobs that match your skills and interests.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredJobs?.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
          >
            <div className="flex items-center mb-4">
              <img
                src={job?.company_logo
                }
                alt={job?.job_title}
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
              />
              <div>
                <h3 className="font-bold text-xl text-gray-800">{job?.job_title}</h3>
                <p className="text-gray-500 text-sm">{job?.company_display_name}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">{job?.job_location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">{job?.employment_type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-purple-500" />
                <span className="text-sm">{job.posted_at}</span>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
              {job.job_description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {job?.job_skills_required
                .map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
            </div>

            <div className="flex justify-between items-center">
              {/* <div className="text-green-600 font-semibold"> <span>{job?.salary_range}<IndianRupee/></span></div> */}
              <div className="text-green-600 font-semibold flex items-center">
                <IndianRupee className="mr-1" /><span>{job?.salary_range}</span>
              </div>
              <Link to={`/jobs/${job.job_id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  Apply Now
                </button>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;