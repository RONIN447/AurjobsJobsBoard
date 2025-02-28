import React from 'react';
import { FiChevronRight, FiStar } from 'react-icons/fi';

const TopRecruiters = () => {
    const recruiters = [
        { name: "Tesla", logo: "🔷", rating: 4.8, jobs: 5 },
        { name: "Exela", logo: "🔹", rating: 4.5, jobs: 2 },
        { name: "Ibotta", logo: "🔶", rating: 4.7, jobs: 3 },
        { name: "Aceable, Inc", logo: "🔗", rating: 4.6, jobs: 0 },
        { name: "Fire Works", logo: "💬", rating: 4.3, jobs: 1 },
        { name: "Callaway", logo: "🟣", rating: 4.9, jobs: 4 },
        { name: "Baseball", logo: "⚾", rating: 4.4, jobs: 2 },
        { name: "Carols", logo: "🎭", rating: 4.2, jobs: 0 },
        // { name: "Wanderu", logo: "🗺️", rating: 4.7, jobs: 3 },
        // { name: "Amazon", logo: "🛒", rating: 4.9, jobs: 6 },
        // { name: "Fire Works", logo: "💬", rating: 4.3, jobs: 2 },
        // { name: "Linkedin", logo: "📇", rating: 4.7, jobs: 5 },
      ];
      
  return (
   
    
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Top Recruiters</h2>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
        Discover your next career move, freelance gig, or internship
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recruiters.map((recruiter, index) => (
          <div
            key={index}
            className="border outline-none border-none rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition bg-white"
          >
            <div className="text-5xl mb-3">{recruiter.logo}</div>
            <h3 className="font-semibold text-lg text-gray-800">{recruiter.name}</h3>
            <p className="text-gray-500 text-sm mt-1">⭐ {recruiter.rating} (27 Reviews)</p>
            <p className="text-gray-400 text-xs mt-1">📍 Chicago, US</p>
            <p className={`text-sm font-medium mt-2 px-3 py-1 rounded-lg ${recruiter.jobs > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {recruiter.jobs > 0 ? `${recruiter.jobs} Jobs Available` : "Not open a job"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRecruiters;