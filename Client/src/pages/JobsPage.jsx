
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
    Search,
    MapPin,
    Briefcase,
    Filter,
    CheckCircle2,
    XCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    X
} from 'lucide-react';
import JobCard from '../components/JobCard';
import axios from 'axios';
import { BASEURL } from '../utility/config';
import { useSearchParams } from 'react-router-dom';
import JobCardSkeleton from '../components/JobCardSkeleton';

const JobsPage = () => {

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const keywordLocation = searchParams.get('location');
    const keywordIndustry = searchParams.get('industry');
    console.log(keywordIndustry)

    const filterCategories = [
        {
            title: "Location",
            type: "input",
            value: keywordLocation || ""
        },
        {
            title: "Salary Range",
            type: "salary-range",
            values: {
                min: "",
                max: ""
            }
        },
        {
            title: "Experience",
            options: [
                { label: "0-2 years", checked: false },
                { label: "3-5 years", checked: false },
                { label: "6-8 years", checked: false },
                { label: "9+ years", checked: false }
            ]
        },
    ];

    const sortOptions = [
        { value: 'lastUpdated', label: 'Most Recent' },
        { value: 'companyAZ', label: 'Company (A-Z)' },
        { value: 'companyZA', label: 'Company (Z-A)' },
        { value: 'salaryHighToLow', label: 'Salary (High to Low)' }
    ];

    // State management
    const [jobs, setJobs] = useState();
    const [loading, setLoading] = useState(true);
    const [jobLoading, setJobLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        searchTerm: keyword || '',
        jobTitle: 'all',
        workMode: 'all',
        industryType: keywordIndustry || 'all',
        workType: 'all',
        salaryRange: {
            min: '',
            max: ''
        },
        location: keywordLocation || '',
        categories: [...filterCategories]
    });
    const [sortBy, setSortBy] = useState('lastUpdated');
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12
    const [salaryRange, setSalaryRange] = useState(0);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    const handleLocationChange = (value) => {
        const newFilters = { ...filters };
        newFilters.categories[0].value = value;
        newFilters.location = value;
        setFilters(newFilters);
    };

    const handleSalaryRangeChange = (type, value) => {
        // Only allow numbers
        const numericValue = value.replace(/[^0-9]/g, '');

        const newFilters = { ...filters };
        newFilters.categories[1].values[type] = numericValue;
        newFilters.salaryRange[type] = numericValue;
        setFilters(newFilters);
    };


    const parseSalaryString = (salaryString) => {
        if (!salaryString) return 0;

        // If it's already a number as a string, just parse it
        if (/^\d+$/.test(salaryString)) {
            return parseInt(salaryString);
        }

        // For ranges like "120000-150000", take the average
        if (salaryString.includes('-')) {
            const [min, max] = salaryString.split('-').map(s => parseInt(s.replace(/[^0-9]/g, '')));
            return (min + max) / 2;
        }

        // Remove all non-numeric characters and parse
        return parseInt(salaryString.replace(/[^0-9]/g, '')) || 0;
    };


    const fetchAllJobs = async () => {
        try {
            console.log("APi calling initated")
            setJobLoading(true); // Set loading to true before the API call
            setError(null);
            const res = await axios.get(`${BASEURL}/jobs_post/jobs`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            console.log("Api called") 

            console.log(res?.data)
            setJobLoading(false);
            setJobs(res?.data);
            // setLoading(false);


        } catch (err) {
            console.log(err)
            setJobLoading(false);
        }finally{
            setJobLoading(false);
        }
    }

    // Load initial jobs
    useEffect(() => {
        fetchAllJobs()

        setLoading(false);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sortBy]);

    // Event handlers
    const handleWorkModeChange = (e) => {
        handleFilterChange('workMode', e.target.value);
    };

    const handleWorkTypeChange = (e) => {
        handleFilterChange('workType', e.target.value);
    };

    const handleIndustryTypeChange = (e) => {
        handleFilterChange('industryType', e.target.value);
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };




    const toggleOption = (categoryIndex, optionIndex) => {
        const newFilters = { ...filters };
        newFilters.categories[categoryIndex].options[optionIndex].checked =
            !newFilters.categories[categoryIndex].options[optionIndex].checked;
        setFilters(newFilters);
    };

    // Helper function to check if a job matches the experience filter
    const matchesExperienceFilter = (jobExperience, selectedExperiences) => {
        if (selectedExperiences.length === 0) return true;

        const years = parseInt(jobExperience);
        return selectedExperiences.some(exp => {
            const [min, max] = exp.label.split('-').map(num => parseInt(num));
            if (exp.label.includes('+')) {
                return years >= parseInt(exp.label);
            }
            return years >= min && years <= max;
        });
    };



    const clearAll = () => {
        setFilters({
            searchTerm: "",
            workMode: 'all',
            workType: 'all',
            industryType: 'all',
            salaryRange: {
                min: '',
                max: ''
            },
            location: '',
            categories: filterCategories.map(category => {
                if (category.type === "input") {
                    return { ...category, value: "" };
                }
                if (category.type === "salary-range") {
                    return { ...category, values: { min: "", max: "" } };
                }
                return {
                    ...category,
                    options: category.options.map(option => ({ ...option, checked: false }))
                };
            })
        });
        setSalaryRange(0);
    };


    // Memoized sorting function
    const sortedJobs = useMemo(() => {
        if (!jobs?.length) return [];

        const jobsCopy = [...jobs];

        switch (sortBy) {
            case 'lastUpdated':
                return jobsCopy.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));
            case 'companyAZ':
                return jobsCopy.sort((a, b) => a.company_display_name
                    .localeCompare(b.company_display_name
                    ));
            case 'companyZA':
                return jobsCopy.sort((a, b) => b.company_display_name
                    .localeCompare(a.company_display_name
                    ));
            case 'salaryHighToLow':
                return jobsCopy.sort((a, b) => {
                    const salaryA = parseSalaryString(a.salary_range);
                    const salaryB = parseSalaryString(b.salary_range);
                    return salaryB - salaryA;
                });
            default:
                return jobsCopy;
        }
    }, [jobs, sortBy]);



    // Memoized filtering function


    const getPaginationInfo = (total, current, perPage) => {
        const start = (current - 1) * perPage + 1;
        const end = Math.min(start + perPage - 1, total);
        return `Showing ${start}-${end} of ${total} jobs`;
    };

    const paginatedJobs = useMemo(() => {
        const filtered = sortedJobs.filter(job => {

            if (filters.salaryRange.min || filters.salaryRange.max) {
                const jobSalary = parseSalaryString(job.salary_range); // Update to use salary_range
                const minSalary = filters.salaryRange.min ? parseInt(filters.salaryRange.min) : 0;
                const maxSalary = filters.salaryRange.max ? parseInt(filters.salaryRange.max) : Infinity;

                if (jobSalary < minSalary || (maxSalary !== Infinity && jobSalary > maxSalary)) {
                    return false;
                }
            }

            if (filters.location && !job.job_location.toLowerCase().includes(filters.location.toLowerCase())) {
                return false;
            }

            if (filters.searchTerm) {
                const searchTerm = filters.searchTerm.toLowerCase();
                const searchableFields = [
                    job.job_title,
                    job.job_location,
                    job.company_display_name
                ].map(field => field.toLowerCase());

                const matchesSearch = searchableFields.some(field =>
                    field.includes(searchTerm)
                );

                if (!matchesSearch) {
                    return false;
                }
            }

            if (filters.workMode !== 'all' && filters.workMode !== 'Work Mode' &&
                job?.work_mode?.toLowerCase() !== filters.workMode.toLowerCase()) {
                return false;
            }
            if (filters.workType !== 'all' && filters.workType !== 'Work Type' &&
                job?.employment_type.toLowerCase() !== filters.workType.toLowerCase()) {
                return false;
            }

            if (filters.industryType !== 'all' && filters.industryType !== 'Industry Type' &&
                job?.industry.toLowerCase() !== filters.industryType.toLowerCase()) {
                return false;
            }

            const selectedExperiences = filters.categories[2].options.filter(opt => opt.checked);
            if (!matchesExperienceFilter(job.job_experience_required, selectedExperiences)) {
                return false;
            }

            return true;
        });

        // Calculate pagination indexes
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return {
            jobs: filtered.slice(startIndex, endIndex),
            totalJobs: filtered.length,
            totalPages: Math.ceil(filtered.length / itemsPerPage),
            currentRange: getPaginationInfo(filtered.length, currentPage, itemsPerPage)
        };
    }, [sortedJobs, filters, currentPage, itemsPerPage]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <div className="min-h-screen bg-gray-50 py-16">
            {/* Header filters */}
            <div className="bg-gradient-to-br from-indigo-50 to-white shadow-md mb-1 p-4 lg:p-7 border border-indigo-100">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                        {/* Job Title Filter */}


                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
        transition-all duration-300 hover:shadow-md hover:border-indigo-300
        group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <Search className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search jobs, skills, or locations..."
                                    className="bg-transparent outline-none w-full text-gray-800 font-medium 
            placeholder-gray-400 hover:text-indigo-700"
                                    value={filters.searchTerm || ''}
                                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                                />
                                {filters.searchTerm && (
                                    <button
                                        onClick={() => handleFilterChange('searchTerm', '')}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Work Mode Filter */}
                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <MapPin className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                                <select
                                    className="bg-transparent outline-none w-full text-gray-800 font-medium 
                                    placeholder-gray-400 hover:text-green-700"
                                    value={filters.workMode}
                                    onChange={handleWorkModeChange}
                                >
                                    <option value="all">All Work Modes</option>
                                    <option value="remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="onsite">On-site</option>
                                </select>
                            </div>
                        </div>

                        {/* Work Type Filter */}
                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <Briefcase className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
                                <select
                                    className="bg-transparent outline-none w-full text-gray-800 font-medium 
                                    placeholder-gray-400 hover:text-purple-700"
                                    value={filters.workType}
                                    onChange={handleWorkTypeChange}
                                >
                                    <option value="all">All Work Types</option>
                                    <option value="full-time">Full time</option>
                                    <option value="internship">Internship</option>
                                    <option value="contract">Contract</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                            <MapPin className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                            <select
                                className="bg-transparent outline-none w-full text-gray-800 font-medium 
                                    placeholder-gray-400 hover:text-green-700"
                                value={filters.industryType}
                                onChange={handleIndustryTypeChange}
                            >
                                <option value="all">All Industry</option>
                                <option value="Technology">Technology</option>
                                <option value="Design">Design</option>
                                <option value="Science">Science</option>
                                <option value="Business">Business</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Customer Service">Customer Service</option>
                                <option value="Human Resource">Human Resource</option>

                            </select>
                        </div>
                    </div>


                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-12">
                {/* Sidebar filters */}
                <div className="w-full lg:w-72">
                    <div className="bg-gradient-to-br from-indigo-50 to-white p-4 lg:p-6 border border-indigo-100 rounded-lg shadow-sm">
                        {/* Filter Header */}
                        <div
                            className="flex items-center justify-between mb-6 cursor-pointer"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <div className="flex items-center gap-3">
                                <Filter className="w-6 h-6 text-indigo-600" />
                                <h3 className="font-bold text-xl text-gray-800">Job Filters</h3>
                            </div>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-500 hover:text-indigo-600 transform transition-transform duration-300 
                                ${isFilterOpen ? '' : '-rotate-180'}`}
                            />
                        </div>

                        {/* Filter Content */}
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden
                            ${isFilterOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            {filters.categories.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="mb-6 group">
                                    <h4 className="text-gray-600 mb-4 font-semibold text-sm uppercase tracking-wider">
                                        {category.title}
                                    </h4>

                                    {category.type === "input" && (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={category.value}
                                                onChange={(e) => handleLocationChange(e.target.value)}
                                                placeholder="Enter location..."
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray"
                                            />
                                            {category.value && (
                                                <button
                                                    onClick={() => handleLocationChange('')}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    {category.type === "salary-range" && (
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={category.values.min}
                                                    onChange={(e) => handleSalaryRangeChange('min', e.target.value)}
                                                    placeholder="Minimum salary"
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-gray"
                                                />
                                                {category.values.min && (
                                                    <button
                                                        onClick={() => handleSalaryRangeChange('min', '')}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={category.values.max}
                                                    onChange={(e) => handleSalaryRangeChange('max', e.target.value)}
                                                    placeholder="Maximum salary"
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-black"
                                                />
                                                {category.values.max && (
                                                    <button
                                                        onClick={() => handleSalaryRangeChange('max', '')}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {!category.type && (
                                        <div className="space-y-3">
                                            {category.options.map((option, optionIndex) => (
                                                <label
                                                    key={optionIndex}
                                                    className="flex items-center gap-3 group cursor-pointer"
                                                    onClick={() => toggleOption(categoryIndex, optionIndex)}
                                                >
                                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300
                            ${option.checked
                                                            ? 'bg-indigo-600 border-indigo-600'
                                                            : 'border-gray-300 bg-white group-hover:border-indigo-400'}`}
                                                    >
                                                        {option.checked && <CheckCircle2 className="w-4 h-4 text-white" />}
                                                    </div>
                                                    <span className={`text-sm transition-colors
                            ${option.checked
                                                            ? 'text-indigo-700 font-semibold'
                                                            : 'text-gray-700 group-hover:text-indigo-600'}`}
                                                    >
                                                        {option.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}


                            <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                                <button
                                    onClick={clearAll}
                                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                                >
                                    <XCircle className="w-5 h-5" />
                                    Clear All
                                </button>
                                <button
                                    onClick={() => handleFilterChange('applyFilters', true)}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job listings */}
                <div className="flex-1 max-h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-50 z-10 p-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold">Recommended Jobs</h2>
                            <span className="bg-gray-200 px-3 py-0.5 rounded-full text-sm">
                                {paginatedJobs.totalJobs}
                            </span>
                            <span className="text-sm text-gray-600">
                                {paginatedJobs.currentRange}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm hidden sm:inline">Sort by:</span>
                            <select
                                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium 
                                    hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {jobLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <JobCardSkeleton key={index} />
                      
                                
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                           
                                paginatedJobs.jobs.map(job => (
                                    <JobCard key={job?.job_id} job={job} />
                                ))

                            
                        }
                    </div>
                    )}



                    

                    {/* Pagination */}

                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={paginatedJobs.totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default JobsPage;







const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    showFirstLast = true,
    maxVisiblePages = 5
}) => {
    const getPageNumbers = () => {
        let pages = [];
        let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        // Adjust start if we're near the end
        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <nav className="flex items-center justify-center space-x-2 my-8">
            {showFirstLast && (
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${currentPage === 1
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600'
                        }`}
                    aria-label="First page"
                >
                    <ChevronsLeft className="w-5 h-5" />
                </button>
            )}

            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border ${currentPage === 1
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600'
                    }`}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-1">
                {getPageNumbers().map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg border ${currentPage === pageNum
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600'
                            }`}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border ${currentPage === totalPages
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600'
                    }`}
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {showFirstLast && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${currentPage === totalPages
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600'
                        }`}
                    aria-label="Last page"
                >
                    <ChevronsRight className="w-5 h-5" />
                </button>
            )}
        </nav>
    );
};
