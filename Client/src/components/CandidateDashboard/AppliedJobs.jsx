

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { BASEURL } from '../../utility/config';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AppliedJobs = () => {

  // State for pagination, filtering, and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({
    key: 'applied_at',
    direction: 'desc'
  });
  const [allJobs, setAllJobs] = useState([])

  const { candidateProfile } = useSelector((state) => state.candidate);

  const candidate_id = candidateProfile.candidate_id;



  const fetchAppliedJobs = async () => {
    const res = await axios.get(`${BASEURL}/jobs_post/applied_jobs/${candidate_id}`)

    if (res?.data?.success) {
      setAllJobs(res?.data?.applications)
      console.log(res?.data?.applications)
    }
  }

  
  // Effect to filter jobs based on search term and status
  useEffect(() => {

    if (!allJobs) return;

    let result = [...allJobs];

    // Apply search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(app =>
        app.jobs.job_title.toLowerCase().includes(lowercasedTerm) ||
        app.jobs.employer_id.company_display_name.toLowerCase().includes(lowercasedTerm) ||
        app.jobs.job_location.toLowerCase().includes(lowercasedTerm) ||
        app.jobs.job_skills_required.some(skill => skill.toLowerCase().includes(lowercasedTerm))
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(app => app.status === filterStatus);
    }

    // Sort the filtered results
    result = sortJobs(result);

    setFilteredJobs(result);
  }, [searchTerm, filterStatus, allJobs, sortConfig]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      interviewing: 'bg-blue-100 text-blue-800'
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortJobs = (jobs) => {
    return [...jobs].sort((a, b) => {
      let aValue = sortConfig.key.includes('jobs.')
        ? a.jobs[sortConfig.key.split('.')[1]]
        : a[sortConfig.key];
      let bValue = sortConfig.key.includes('jobs.')
        ? b.jobs[sortConfig.key.split('.')[1]]
        : b[sortConfig.key];

      if (sortConfig.key === 'applied_at' || sortConfig.key === 'jobs.posted_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ?
      <ChevronUp className="w-4 h-4" /> :
      <ChevronDown className="w-4 h-4" />;
  };

  const renderSortableHeader = (label, key) => (
    <th
      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(key)}
    >
      <div className="flex items-center gap-1">
        {label}
        <SortIcon column={key} />
      </div>
    </th>
  );

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredJobs.length / itemsPerPage)));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));


  useEffect(() => {
    fetchAppliedJobs();
  }, [candidate_id]);

  return (
    <div className="min-h-screen  bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Applied Jobs</h1>
          <p className="text-gray-600 mt-2">Track your job applications and their current status</p>
        </div>

        {/* Filters and search */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search jobs, companies, locations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">Status:</span>
            </div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="interviewing">Interviewing</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page on items per page change
              }}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={15}>15 per page</option>
            </select>
          </div>
        </div>

        {/* Total results indicator */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredJobs.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredJobs.length)} of {filteredJobs.length} results
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
          {filteredJobs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    {renderSortableHeader('Job Title', 'jobs.job_title')}
                    {renderSortableHeader('Applied Date', 'applied_at')}
                    {renderSortableHeader('Location', 'jobs.job_location')}
                    {renderSortableHeader('Type', 'jobs.employment_type')}
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    {renderSortableHeader('Status', 'status')}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((application) => (
                    
                    <tr
                      key={application.application_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/jobs/${application.jobs.job_id}`}>
                        <div className="flex items-center gap-3" >
                          <img
                            src={application.jobs.employer_id.company_logo}
                            alt={application.jobs.employer_id.company_display_name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {application.jobs.employer_id.company_display_name}
                          </span>
                        </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/jobs/${application.jobs.job_id}`}><span className="text-sm text-gray-900">{application.jobs.job_title}</span></Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/jobs/${application.jobs.job_id}`}>
                        <span className="text-sm text-gray-500">{formatDate(application.applied_at)}</span>
                        </Link>
                        
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/jobs/${application.jobs.job_id}`}>
                        <span className="text-sm text-gray-500">{application.jobs.job_location}</span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/jobs/${application.jobs.job_id}`}><span className="text-sm text-gray-500">{application.jobs.employment_type}</span></Link>
                      </td>
                      <td className="px-6 py-4">
                      <Link to={`/jobs/${application.jobs.job_id}`}>
                        <div className="flex flex-wrap gap-1">
                          {application.jobs.job_skills_required.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/jobs/${application.jobs.job_id}`}>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-lg">No applications match your filters</p>
              <button
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(indexOfLastItem, filteredJobs.length)}</span> of{' '}
                  <span className="font-medium">{filteredJobs.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {Array.from({ length: Math.ceil(filteredJobs.length / itemsPerPage) }).map((_, index) => {
                    // Only show 5 page buttons max
                    if (
                      index === 0 ||
                      index === Math.ceil(filteredJobs.length / itemsPerPage) - 1 ||
                      (index >= currentPage - 2 && index <= currentPage + 0)
                    ) {
                      return (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === index + 1
                            ? 'z-10 bg-blue-600 text-white  focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}
                        >
                          {index + 1}
                        </button>
                      );
                    } else if (
                      (index === currentPage - 3 && currentPage > 3) ||
                      (index === currentPage + 1 && currentPage < Math.ceil(filteredJobs.length / itemsPerPage) - 2)
                    ) {
                      return (
                        <span
                          key={index}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(filteredJobs.length / itemsPerPage)}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ${currentPage === Math.ceil(filteredJobs.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;