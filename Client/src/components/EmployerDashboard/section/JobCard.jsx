// JobCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, ArrowRight, Users } from 'lucide-react';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side - Job Title */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900">{job.job_title}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <p>{job.job_location} {job.remote && "(Remote)"}</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <p>{job.salary_range}</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-gray-500" />
                        <p>{job.job_experience_required} Experience</p>
                    </div>
                </div>

                {/* Right Side - Skills and Status */}
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {job.job_skills_required.slice(0, 3).map(skill => (
                                <span 
                                    key={skill}
                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                            {job.job_skills_required.length > 3 && (
                                <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm font-medium">
                                    +{job.job_skills_required.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        job.status === 'Open' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        Status: {job.status}
                    </div>

                    <button
                        onClick={() => navigate(`/employer_dashboard/jobs/${job.job_id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
