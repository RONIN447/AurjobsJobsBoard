import React, { useState } from 'react'

const Resume = ({ isEditing, candidateData, handleInputChange }) => {

    const [isFocused, setIsFocused] = useState(false);

  return (
//     <section id="resume" className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mt-12">
//     <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
//         <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
//             <span className="text-2xl">🔗</span>
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Resume</h2>
//     </div>

//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div className="group">
//             <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-purple-600 transition-colors duration-200">
//                 Resume URL:
//             </label>
//             <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
//                     </svg>
//                 </div>
//                 <input
//                     type="text"
//                     name="candidate_resume_link"
//                     value={candidateData?.candidate_resume_link
//                     }
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-purple-400"
//                     placeholder=""
//                 />
//             </div>
//         </div>

        

        
//     </div>
// </section>
<section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mt-12">
{/* Header */}
<div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
    <span className="text-2xl">🔗</span>
  </div>
  <h2 className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors duration-200">Resume</h2>
</div>

{/* Input Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  <div className="group transition-all duration-300 ease-in-out">
    <label className="block text-sm font-medium mb-2 group-hover:text-purple-600 transition-colors duration-200">
      Resume URL
    </label>
    <div className="relative">
      {/* Icon */}
      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${isFocused ? 'text-purple-500' : 'text-gray-400'}`}>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        name="candidate_resume_link"
        value={candidateData?.candidate_resume_link}
        onChange={handleInputChange}
        disabled={!isEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full pl-10 pr-4 py-3.5 
          rounded-lg
          border-2
          outline-none
          transition-all duration-200
          ${isEditing 
            ? 'bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 border-gray-200' 
            : 'bg-gray-50 text-gray-500 border-gray-100 cursor-not-allowed'
          }
          ${isFocused ? 'border-purple-500 ring-4 ring-purple-100' : ''}
        `}
        placeholder={isEditing ? "Enter resume URL..." : ""}
        required
      />
      
      {/* Status Indicator */}
      {isEditing && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className={`w-2 h-2 rounded-full ${isFocused ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
        </div>
      )}
    </div>
    
    {/* Helper Text */}
    {isEditing && (
      <p className="mt-2 text-sm text-gray-500 transition-opacity duration-200">
        Paste your resume URL here
      </p>
    )}
  </div>
</div>
</section>
  )
}

export default Resume
