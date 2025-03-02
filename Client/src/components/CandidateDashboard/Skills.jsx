import React from 'react'

const Skills = ({addSkillArrayItem, isEditing,removeSkillArrayItem,handleSkillsArrayItemChange, candidateData, handleInputChange, errors, removeArrayItem, addArrayItem,handleArrayItemChange }) => {
  return (
//     <section id="skills" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-12">
//     <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center">
//             <span className="text-2xl mr-3">⚡</span>
//             <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
//         </div>
//         {isEditing && (
//             <button
//                 type="button"
//                 onClick={() => addSkillArrayItem('skills', { candidate_skill: '', level: 'Beginner' })}
//                 className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
//             >
//                 <span className="mr-2">+</span>
//                 Add Skill
//             </button>
//         )}
//     </div>
//     <div className="grid grid-cols-1 gap-4">
//         {candidateData.skills.map((skill) => (
//             <div key={skill.skill_id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
//                 <div className="flex-grow">
//                     <input
//                         type="text"
//                         value={skill.candidate_skill}
//                         onChange={(e) => handleSkillsArrayItemChange('skills', skill.skill_id, 'candidate_skill', e.target.value)}
//                         disabled={!isEditing}
//                         placeholder="Skill name"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                 </div>
//                 <div className="w-48">
//                     <select
//                         value={skill.level}
//                         onChange={(e) => handleSkillsArrayItemChange('skills', skill.skill_id, 'level', e.target.value)}
//                         disabled={!isEditing}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
//                     >
//                         <option value="Beginner">Beginner</option>
//                         <option value="Intermediate">Intermediate</option>
//                         <option value="Advanced">Advanced</option>
//                         <option value="Expert">Expert</option>
//                     </select>
//                 </div>
//                 {isEditing && (
//                     <button
//                         type="button"
//                         onClick={() => removeSkillArrayItem('skills', skill.skill_id)}
//                         className="text-red-600 hover:text-red-800 transition-colors p-2"
//                     >
//                         🗑
//                     </button>
//                 )}
//             </div>
//         ))}
//     </div>
// </section>

<section className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 mt-12">
<div className="flex items-center justify-between mb-8">
  <div className="flex items-center space-x-4">
    <span className="text-3xl">⚡</span>
    <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
  </div>
  {isEditing && (
    <button
      type="button"
      onClick={() => addSkillArrayItem('skills', { candidate_skill: '', level: 'Beginner' })}
      className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 
      transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 
      flex items-center shadow-md"
    >
      <span className="mr-2 text-lg">+</span>
      Add Skill
    </button>
  )}
</div>

<div className="space-y-4">
  {candidateData.skills.map((skill) => (
    <div
      key={skill.skill_id}
      className="relative group rounded-xl bg-white p-6 border border-gray-200 
      shadow-sm hover:shadow-md transition-all duration-200"
    >
      {isEditing ? (
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Skill</label>
            <input
              type="text"
              value={skill.candidate_skill}
              onChange={(e) => handleSkillsArrayItemChange('skills', skill.skill_id, 'candidate_skill', e.target.value)}
              placeholder="Enter skill name"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
              focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
              required
            />
          </div>
          <div className="md:w-48 space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Proficiency</label>
            <select
              value={skill.level}
              onChange={(e) => handleSkillsArrayItemChange('skills', skill.skill_id, 'level', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
              focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Skill</p>
            <p className="text-gray-800 font-medium">{skill.candidate_skill || '-'}</p>
          </div>
          <div className="mt-2 md:mt-0">
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              {
                'Beginner': 'bg-blue-50 text-blue-600',
                'Intermediate': 'bg-green-50 text-green-600',
                'Advanced': 'bg-purple-50 text-purple-600',
                'Expert': 'bg-orange-50 text-orange-600'
              }[skill.level]
            }`}>
              {skill.level}
            </span>
          </div>
        </div>
      )}
      
      {isEditing && (
        <button
          type="button"
          onClick={() => removeSkillArrayItem('skills', skill.skill_id)}
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

export default Skills
