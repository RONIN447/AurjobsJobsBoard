import React from 'react'

const Address = ({ candidateData, isEditing, handleAddressArrayItemChange, addAddressArrayItem, removeAddressArrayItem }) => {
  return (
    <section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <span className="text-2xl">📍</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Address Information</h2>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={() => addAddressArrayItem('addresses', {
              candidate_address_line_1: '',
              candidate_address_line_2: '',
              candidate_city: '',
              candidate_state: '',
              candidate_country: '',
              candidate_postal_code: ''
            })}
            className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 
            transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 
            flex items-center shadow-md"
          >
            <span className="mr-2 text-lg">+</span>
            Add Address
          </button>
        )}
      </div>

      <div className="space-y-8">
        {candidateData.addresses?.map((address) => (
          <div
            key={address.address_id}
            className="relative group rounded-xl bg-white p-6 border border-gray-200 
            shadow-sm hover:shadow-md transition-all duration-200"
          >
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    value={address.candidate_address_line_1 || ''}
                    onChange={(e) => handleAddressArrayItemChange('addresses', address.address_id, 'candidate_address_line_1', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter street address"
                   required
                  />
                </div>

                <div className="relative group md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={address.candidate_address_line_2 || ''}
                    onChange={(e) => handleAddressArrayItemChange('addresses', address.address_id, 'candidate_address_line_2', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    required
                  />
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={address.candidate_city || ''}
                    onChange={(e) => handleAddressArrayItemChange('addresses', address.address_id, 'candidate_city', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter city"
                   required
                  />
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    value={address.candidate_state || ''}
                    onChange={(e) => handleAddressArrayItemChange('addresses', address.address_id, 'candidate_state', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter state/province"
                    required
                  />
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={address.candidate_country || ''}
                    onChange={(e) => handleAddressArrayItemChange('addresses', address.address_id, 'candidate_country', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter country"
                   required
                  />
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={address.candidate_postal_code || ''}
                    onChange={(e) => handleAddressArrayItemChange('addresses', address.address_id, 'candidate_postal_code', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter postal code"
                   required
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Address Line 1</p>
                  <p className="text-gray-800">{address.candidate_address_line_1 || '-'}</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Address Line 2</p>
                  <p className="text-gray-800">{address.candidate_address_line_2 || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">City</p>
                  <p className="text-gray-800">{address.candidate_city || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">State/Province</p>
                  <p className="text-gray-800">{address.candidate_state || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Country</p>
                  <p className="text-gray-800">{address.candidate_country || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Postal Code</p>
                  <p className="text-gray-800">{address.candidate_postal_code || '-'}</p>
                </div>
              </div>
            )}

            {isEditing && (
              <button
                type="button"
                onClick={() => removeAddressArrayItem('addresses', address.address_id)}
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

export default Address
