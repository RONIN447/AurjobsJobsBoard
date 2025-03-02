import React from 'react'

const Education = ({ addEducationArrayItem, isEditing, removeEducationArrayItem, handleEducationArrayItemChange, candidateData, handleInputChange, errors, removeArrayItem, addArrayItem, handleArrayItemChange }) => {
  
 
  
  return (
    // <section id='education' className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-12">
    //   <div className="flex items-center justify-between mb-6">
    //     <div className="flex items-center">
    //       <span className="text-2xl mr-3">🎓</span>
    //       <h2 className="text-xl font-semibold text-gray-800">Education</h2>
    //     </div>
    //     {isEditing && (
    //       <button
    //         type="button"
    //         onClick={() => addEducationArrayItem('education', { candidate_degree: '', candidate_institute: '', candidate_end_year: '', candidate_start_year: '', candidate_score: '', candidate_education_level: '' })}
    //         className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
    //       >
    //         <span className="mr-2">+</span>
    //         Add Education
    //       </button>
    //     )}
    //   </div>

    //   <div className="space-y-6">
    //     {
    //       candidateData.education.map((edu) => (
    //         <div key={edu.education_id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
    //               <input
    //                 type="text"
    //                 value={edu.candidate_degree}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_degree', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
    //               <input
    //                 type="text"
    //                 value={edu.candidate_education_level}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_education_level', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
    //               <input
    //                 type="text"
    //                 value={edu.candidate_institute}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_institute', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
    //               <input
    //                 type="text"
    //                 value={edu.candidate_score}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_score', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
    //               <input
    //                 type="number"
    //                 value={edu.candidate_start_year}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_start_year', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
    //               <input
    //                 type="number"
    //                 value={edu.candidate_end_year}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_end_year', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>


    //           </div>
    //           {isEditing && (
    //           <button
    //               type="button"
    //               onClick={() => removeEducationArrayItem('education', edu.education_id)}
    //               className="text-red-600 hover:text-red-800 transition-colors p-2"
    //           >
    //               🗑
    //           </button>
    //       )}
    //         </div>

    //       ))
    //     }

    //   </div>
    // </section>

    <section className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 mt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-3xl">🎓</span>
          <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={() => addEducationArrayItem('education', {
              candidate_degree: '',
              candidate_institute: '',
              candidate_end_year: '',
              candidate_start_year: '',
              candidate_score: '',
              candidate_education_level: ''
            })}
            className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 
            transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 
            flex items-center shadow-md"
          >
            <span className="mr-2 text-lg">+</span>
            Add Education
          </button>
        )}
      </div>

      <div className="space-y-8">
        {candidateData.education.map((edu) => (
          <div
            key={edu.education_id}
            className="relative group rounded-xl bg-white p-6 border border-gray-200 
            shadow-sm hover:shadow-md transition-all duration-200"
          >
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Degree</label>
                  <input
                    type="text"
                    value={edu.candidate_degree}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_degree', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter degree name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Education Level</label>
                  <input
                    type="text"
                    value={edu.candidate_education_level}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_education_level', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter education level"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Institution</label>
                  <input
                    type="text"
                    value={edu.candidate_institute}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_institute', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter institution name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Score</label>
                  <input
                    type="text"
                    value={edu.candidate_score}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_score', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter score"
                   required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Start Year</label>
                  <input
                    type="number"
                    value={edu.candidate_start_year}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_start_year', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter start year"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">End Year</label>
                  <input
                    type="number"
                    value={edu.candidate_end_year}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_end_year', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter end year"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Degree</p>
                  <p className="text-gray-800">{edu.candidate_degree || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Education Level</p>
                  <p className="text-gray-800">{edu.candidate_education_level || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Institution</p>
                  <p className="text-gray-800">{edu.candidate_institute || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Score</p>
                  <p className="text-gray-800">{edu.candidate_score || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Start Year</p>
                  <p className="text-gray-800">{edu.candidate_start_year || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">End Year</p>
                  <p className="text-gray-800">{edu.candidate_end_year || '-'}</p>
                </div>
              </div>
            )}
            
            {isEditing && (
              <button
                type="button"
                onClick={() => removeEducationArrayItem('education', edu.education_id)}
                className="absolute -top-3 -right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 
                transition-colors duration-200 opacity-0 group-hover:opacity-100 shadow-sm"
              >
                <span className="text-lg">×</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
    

  )
}

export default Education
