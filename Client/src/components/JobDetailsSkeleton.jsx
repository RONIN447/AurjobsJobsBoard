import React from 'react'

const JobDetailsSkeleton = () => {
  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4">
    <div className="max-w-4xl mx-auto">
      {/* Header Section Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="w-full">
            <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4 animate-pulse"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-28 animate-pulse"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-24 bg-blue-100 rounded-full animate-pulse"></div>
              <div className="h-6 w-24 bg-green-100 rounded-full animate-pulse"></div>
              <div className="h-6 w-24 bg-purple-100 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="h-10 w-28 bg-blue-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-7 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                </div>
              ))}
            </div>
            
            <div className="h-7 bg-gray-200 rounded w-32 mt-8 mb-4 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Job Overview Skeleton */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-7 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Info Skeleton */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-7 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default JobDetailsSkeleton
