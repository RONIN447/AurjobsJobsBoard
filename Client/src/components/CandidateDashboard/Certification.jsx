import React from 'react'

const Certification = ({ addCertificationArrayItem,isEditing,handleCertificationArrayItemChange,removeCertificateArrayItem, candidateData, handleInputChange, errors, removeArrayItem, addArrayItem,handleArrayItemChange }) => {
  return (
  
    <section id='certifications' className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 mt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-3xl">📜</span>
          <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={() => addCertificationArrayItem('certifications', {
              candidate_certificate_name: '',
              certificate_issuing_organization: '',
              certificate_issue_date: ''
            })}
            className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 
            transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 
            flex items-center shadow-md"
          >
            <span className="mr-2 text-lg">+</span>
            Add Certification
          </button>
        )}
      </div>

      <div className="space-y-6">
        {candidateData.certifications.map((cert) => (
          <div
            key={cert.certification_id}
            className="relative group rounded-xl bg-white p-6 border border-gray-200 
            shadow-sm hover:shadow-md transition-all duration-200"
          >
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Certification Name</label>
                  <input
                    type="text"
                    value={cert.candidate_certificate_name}
                    onChange={(e) => handleCertificationArrayItemChange('certifications', cert.certification_id, 'candidate_certificate_name', e.target.value)}
                    placeholder="Enter certification name"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.certificate_issuing_organization}
                    onChange={(e) => handleCertificationArrayItemChange('certifications', cert.certification_id, 'certificate_issuing_organization', e.target.value)}
                    placeholder="Enter organization name"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Issue Date</label>
                  <input
                    type="date"
                    value={cert.certificate_issue_date}
                    onChange={(e) => handleCertificationArrayItemChange('certifications', cert.certification_id, 'certificate_issue_date', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Certification</p>
                  <p className="text-gray-800 font-medium">{cert.candidate_certificate_name || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Organization</p>
                  <p className="text-gray-800">{cert.certificate_issuing_organization || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Issued</p>
                  <p className="text-gray-800">{cert.certificate_issue_date || '-'}</p>
                </div>
              </div>
            )}

            {isEditing && (
              <button
                type="button"
                onClick={() => removeCertificateArrayItem('certifications', cert.certification_id)}
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

export default Certification
