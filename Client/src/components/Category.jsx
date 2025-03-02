// import React from "react";
// import { FiShoppingBag, FiPenTool, FiUsers, FiSearch, FiCode, FiDollarSign, FiTrendingUp, FiTv } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";

// const Category = () => {
//   const categories = [
//     { title: "Technology", icon: <FiShoppingBag />, count: 4 },
//     { title: "Design", icon: <FiPenTool />, count: 4 },
//     { title: "Science", icon: <FiUsers />, count: 4 },
//     { title: "Business", icon: <FiSearch />, count: 4 },
//     { title: "Finance", icon: <FiCode />, count: 4 },
//     { title: "Customer Service", icon: <FiDollarSign />, count: 4 },
//     { title: "Human Resource", icon: <FiTrendingUp />, count: 4 },
//     { title: "Marketing", icon: <FiTv />, count: 4 },
//   ];

//   const navigate = useNavigate();

//   const handleIndustry = (title) => {
//     // Navigate to jobs page with filters
//     const queryParams = new URLSearchParams(title).toString();
//     // window.location.href = `/jobs?${queryParams}`;
//     navigate(`/jobs?${queryParams}`)
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
//       <h2 className="text-4xl font-bold mb-2 text-gray-900 text-center">Browse by Industry</h2>
//       <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
//         Find the jobs you're looking for in your desired industry.
//       </p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {categories.map((category, index) => (
        
//              <div
//             key={index}
//             onClick={()=>handleIndustry(category.title)}
//             className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 cursor-pointer group"
//           >
//             <div className="flex items-center mb-4">
//               <div className="bg-blue-100 text-blue-600 rounded-full p-4 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
//                 {category.icon}
//               </div>
//               <h3 className="font-semibold text-lg text-gray-800 ml-4 group-hover:text-blue-600 transition-all">
//                 {category.title}
//               </h3>
//             </div>
//             <p className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-all">
//               {category.count} job{category.count !== 1 ? "s" : ""} available
//             </p>
//           </div>
         
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Category;


import React from "react";
import { 
  FiShoppingBag, 
  FiPenTool, 
  FiUsers, 
  FiSearch, 
  FiCode, 
  FiDollarSign, 
  FiTrendingUp, 
  FiTv,
  FiCpu,
  FiMonitor,
  FiActivity,
  FiBriefcase,
  FiTrello,
  FiTruck,
  FiFileText,
  FiDatabase
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Category = () => {
  // Mapping of categories with more appropriate icons
  const categories = [
    { title: "Technology", icon: <FiCpu />, count: 4 },
    { title: "Design", icon: <FiPenTool />, count: 4 },
    { title: "Science", icon: <FiActivity />, count: 4 },
    { title: "Business", icon: <FiBriefcase />, count: 4 },
    { title: "Finance", icon: <FiDollarSign />, count: 4 },
    { title: "Customer Service", icon: <FiUsers />, count: 4 },
    { title: "Human Resource", icon: <FiTrello />, count: 4 },
    { title: "Marketing", icon: <FiTv />, count: 4 },
    // { title: "Software", icon: <FiCode />, count: 3 },
    // { title: "Logistics", icon: <FiTruck />, count: 2 },
    // { title: "Legal", icon: <FiFileText />, count: 5 },
    // { title: "Data Science", icon: <FiDatabase />, count: 6 },
  ];

  const navigate = useNavigate();

  const handleIndustry = (title) => {
    // Create a proper query parameter with a key
    const queryParams = new URLSearchParams({ industry: title }).toString();
    navigate(`/jobs?${queryParams}`);
  };

  // Function to get dynamic icon color based on category
  const getCategoryColor = (title) => {
    const colors = {
      "Technology": "blue",
      "Design": "purple",
      "Science": "green",
      "Business": "amber",
      "Finance": "emerald",
      "Customer Service": "orange",
      "Human Resource": "pink",
      "Marketing": "red",
      "Software": "indigo",
      "Logistics": "cyan",
      "Legal": "yellow",
      "Data Science": "violet"
    };
    
    return colors[title] || "blue";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold mb-2 text-gray-900 text-center">Browse by Industry</h2>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
        Find the jobs you're looking for in your desired industry.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => {
          const color = getCategoryColor(category.title);
          const bgClass = `bg-${color}-100`;
          const textClass = `text-${color}-600`;
          const hoverBgClass = `group-hover:bg-${color}-600`;
          const hoverTextClass = `group-hover:text-${color}-600`;
          
          return (
            <div
              key={index}
              onClick={() => handleIndustry(category.title)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className={`${bgClass} ${textClass} rounded-full p-4 text-2xl ${hoverBgClass} group-hover:text-white transition-all`}>
                  {category.icon}
                </div>
                <h3 className={`font-semibold text-lg text-gray-800 ml-4 ${hoverTextClass} transition-all`}>
                  {category.title}
                </h3>
              </div>
              <p className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-all">
                {category.count} job{category.count !== 1 ? "s" : ""} available
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;