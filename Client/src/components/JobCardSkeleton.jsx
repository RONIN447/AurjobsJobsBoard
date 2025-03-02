import React from 'react'

const JobCardSkeleton = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        {/* Company logo skeleton */}
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          {/* Company name skeleton */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          {/* Location skeleton */}
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      
      {/* Job title skeleton */}
      <div className="h-5 bg-gray-200 rounded w-4/5 mb-4"></div>
      
      {/* Tags skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-6 bg-gray-200 rounded w-24"></div>
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
      
      {/* Footer skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );


  export default JobCardSkeleton;