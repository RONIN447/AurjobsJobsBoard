
import React, { useEffect, useState } from 'react';
import { CalendarDays, MapPin, Building2, Briefcase, Clock, DollarSign, GraduationCap, Laptop2, LogIn, IndianRupee } from 'lucide-react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../utility/config';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const JobDetailsPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [incompleteFields, setIncompleteFields] = useState([]);
  const navigate = useNavigate();
  const { candidateProfile, isAuthenticated } = useSelector((state) => state.candidate);
  console.log(candidateProfile)
  const candidate_id = candidateProfile?.candidate_id;
  const params = useParams()


  const [jobDetails, setJobDetails] = useState(null);

  const fetchJobDetails = async (jobId) => {
    const res = await axios.get(`${BASEURL}/jobs_post/job_details/${jobId}`)

    if (res?.data?.success) {
      console.log(res?.data?.job)
      setJobDetails(res?.data?.job)

    }

  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };






  const validateProfile = () => {
    const requiredFields = {
      'First Name': candidateProfile?.candidate_first_name,
      'Last Name': candidateProfile?.candidate_last_name,
      'Email': candidateProfile?.candidate_email,
      'Phone': candidateProfile?.candidate_phone,
      // 'Current Role': candidateProfile?.candidate_current_role,
      // 'Availability': candidateProfile?.candidate_availability,
      'Education': candidateProfile?.education?.length > 0,
      'Skills': candidateProfile?.skills?.length > 0,
      'Languages': candidateProfile?.languages?.length > 0,
      // 'Certifications': candidateProfile?.certifications?.length > 0,
      'Addresses': candidateProfile?.addresses?.length > 0,
      'Date of Birth': candidateProfile?.candidate_date_of_birth,
      'Gender': candidateProfile?.candidate_gender,
      // 'Github': candidateProfile?.candidate_github_link,
      'LinkedIn': candidateProfile?.candidate_linkedin_link,
      'Image': candidateProfile?.candidate_image_link,
      'Location': candidateProfile?.candidate_location,
      'Resume': candidateProfile?.candidate_resume_link,
      'Work Preference': candidateProfile?.candidate_work_preference,
    };

    const missing = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field]) => field);

    setIncompleteFields(missing);
    return missing.length === 0;
  };

  const handleApply = async () => {


    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    const isProfileComplete = validateProfile();
    // const isProfileComplete = false;


    if (!isProfileComplete) {
      setShowModal(true);
      return;
    }

    try {
      const res = await axios.post(`${BASEURL}/jobs_post/apply_job`, {
        job_id: jobDetails.job_id,
        candidate_id
      });

      if (res?.data?.success) {

        setIsSubmitted(true);
        setShowModal(true);
        toast.success(res?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error);
    }
  };

  const parseJobDescription = (text) => {
    if (!text) return [];

    const sections = text.split(/(?=\|\|\| :)/g);
    return sections.map(section => section.trim()).filter(Boolean);
  };

  const sections = parseJobDescription(jobDetails?.job_description);


  const handleLogin = () => {
    navigate('/candidate_login');
    setShowLoginModal(false);
  };

  const handleSignup = () => {
    navigate('/candidate_register');
    setShowLoginModal(false);
  };

  const handleCompleteProfile = () => {
    navigate('/candidate_dashboard');
    setShowModal(false);
  };

  useEffect(() => {

    fetchJobDetails(params.jobId)

  }, []);

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{jobDetails?.job_title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <span>{jobDetails?.company_display_name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{jobDetails?.job_location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  <span>{jobDetails?.salary_range}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {jobDetails?.employment_type}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {jobDetails?.work_mode}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {jobDetails?.industry}
                </span>
              </div>
            </div>
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </button>

            <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
              <div className="text-center">
                <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-12 h-12 text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Login Required
                </h2>
                <p className="text-gray-600 mb-6">
                  Please login or create an account to apply for this job.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="w-full bg-white text-blue-600 border border-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              {incompleteFields.length === 0 && isSubmitted ? (
                <div className="text-center">
                  <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Application Submitted!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your application has been successfully submitted. We'll review your profile and get back to you soon.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-12 h-12 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Complete Your Profile
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Please complete the following information in your profile before applying:
                  </p>
                  <div className="bg-red-50 rounded-lg p-4 mb-6">
                    <ul className="text-left space-y-2">
                      {incompleteFields.map((field, index) => (
                        <li key={index} className="text-red-600 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                          <span>{field}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={handleCompleteProfile}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                    >
                      Complete Profile
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Job Details */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              {/* <p className="text-gray-600 mb-6">{jobDetails?.job_description}</p> */}

              <div className="space-y-8">
                {sections.map((section, index) => {
                  const [title, ...content] = section.split('\n');
                  return (
                    <div key={index} className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                      {content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-600 leading-relaxed">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>




              <h3 className="text-lg font-semibold mt-4 mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {jobDetails?.job_skills_required.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>

              {/* <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul> */}
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Posted On</p>
                    <p className="text-gray-700">{formatDate(jobDetails?.posted_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Experience Required</p>
                    <p className="text-gray-700">{jobDetails?.job_experience_required}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Laptop2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Work Mode</p>
                    <p className="text-gray-700">{jobDetails?.work_mode}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Company Info</h2>
              <img
                src={jobDetails?.company_logo}
                alt="Company Logo"
                className="mb-4 rounded"
              />
              <p className="text-gray-600 mb-4">
                Stark Industries is a leading technology company specializing in innovative solutions
                for the modern world. Join our team of exceptional talents working on cutting-edge
                technologies.
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Learn more about {jobDetails?.company_display_name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;




const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Backdrop with blur effect and softer opacity */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content with enhanced animation */}
      <div className="relative bg-white rounded-xl w-full max-w-md mx-4 p-8 shadow-2xl transform transition-all duration-300 ease-out opacity-100 scale-100 translate-y-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};