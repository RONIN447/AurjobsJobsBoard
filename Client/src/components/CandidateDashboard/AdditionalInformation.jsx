import React from 'react'

const AdditionalInformation = ({ isEditing, candidateData, handleInputChange }) => {
  return (
    <section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Additional Information</h2>
        </div>
        <div className="flex items-center gap-4">
          {isEditing && (
            <span className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium">
              Editing Mode
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Availability */}
        <div className="relative group">
          {isEditing ? (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                Availability
              </label>
              <select
                name="candidate_availability"
                value={candidateData.candidate_availability || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-300 transition-all duration-300 ease-in-out"
              >
                <option value="">Select availability</option>
                <option value="immediately">Immediately</option>
                <option value="2_weeks">2 Weeks Notice</option>
                <option value="1_month">1 Month Notice</option>
                <option value="3_months">3 Months Notice</option>
              </select>
            </>
          ) : (
            <div className="py-3">
              <span className="text-sm text-gray-600">Availability</span>
              <p className="mt-1 text-gray-900">{candidateData.candidate_availability || 'Not provided'}</p>
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div className="relative group">
          {isEditing ? (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                Date of Birth
              </label>
              <input
                type="date"
                name="candidate_date_of_birth"
                value={candidateData.candidate_date_of_birth || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-300 transition-all duration-300 ease-in-out"
              />
            </>
          ) : (
            <div className="py-3">
              <span className="text-sm text-gray-600">Date of Birth</span>
              <p className="mt-1 text-gray-900">{candidateData.candidate_date_of_birth || 'Not provided'}</p>
            </div>
          )}
        </div>

        {/* Gender */}
        <div className="relative group">
          {isEditing ? (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                Gender
              </label>
              <select
                name="candidate_gender"
                value={candidateData.candidate_gender || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-300 transition-all duration-300 ease-in-out"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </>
          ) : (
            <div className="py-3">
              <span className="text-sm text-gray-600">Gender</span>
              <p className="mt-1 text-gray-900">{candidateData.candidate_gender || 'Not provided'}</p>
            </div>
          )}
        </div>

        {/* Profile Status */}
        {/* <div className="relative group">
          {isEditing ? (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                Profile Status
              </label>
              <select
                name="candidate_profile_status"
                value={candidateData.candidate_profile_status || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-300 transition-all duration-300 ease-in-out"
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
                <option value="in_review">In Review</option>
              </select>
            </>
          ) : (
            <div className="py-3">
              <span className="text-sm text-gray-600">Profile Status</span>
              <p className="mt-1 text-gray-900">
                {candidateData.candidate_profile_status ? 
                  candidateData.candidate_profile_status.charAt(0).toUpperCase() + 
                  candidateData.candidate_profile_status.slice(1).replace('_', ' ') 
                  : 'Not provided'}
              </p>
            </div>
          )}
        </div> */}
      </div>
    </section>
  )
}

export default AdditionalInformation
