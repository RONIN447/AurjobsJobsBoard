import React, { useEffect, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react';
import HeroImg from "../assets/HeroImg.png"
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        qualification: ''
      });
      const navigate = useNavigate()
    
      const handleSearch = () => {
        // Navigate to jobs page with filters
        const queryParams = new URLSearchParams(filters).toString();
        // window.location.href = `/jobs?${queryParams}`;
        navigate(`/jobs?${queryParams}`)
      };
    
      const handleChange = (e) => {
        setFilters({
          ...filters,
          [e.target.name]: e.target.value
        });
      };

    // const [currentIndex, setCurrentIndex] = useState(0);
    const companies = [
        { name: "Conneqt Business Solutions", logo: "🔷", description: "Leading business process management company." },
        { name: "Amazon", logo: "🛒", description: "Global e-commerce and technology leader." },
        { name: "Teleperformance", logo: "💬", description: "Worldwide leader in digital business services." },
        { name: "IndiGo Airlines", logo: "✈️", description: "India's largest passenger airline." },
        { name: "Vishal Mega Mart", logo: "🏪", description: "Leading fashion and retail chain." },
        { name: "Jio Digital Life", logo: "📶", description: "Digital services and telecommunications giant." },
      ];

      const [currentIndex, setCurrentIndex] = useState(0);
      const [isTransitioning, setIsTransitioning] = useState(true);
      const [visibleCompanies, setVisibleCompanies] = useState(2);

      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 640) setVisibleCompanies(1);
          else if (window.innerWidth < 1024) setVisibleCompanies(1);
          else setVisibleCompanies(4);
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      useEffect(() => {
        const timer = setInterval(() => {
          if (currentIndex === companies.length) {
            setIsTransitioning(false);
            setCurrentIndex(0);
            setTimeout(() => setIsTransitioning(true), 50);
          } else {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          }
        }, 3000);
    
        return () => clearInterval(timer);
      }, [currentIndex, companies.length]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-28">
                <div className="text-center mb-8">
                    <div className="inline-block bg-gray-100 px-4 py-2 rounded-full mb-4">
                        <span className="text-gray-600">The best job seekers</span>
                        <span className="text-blue-600 ml-2">Explore →</span>
                    </div>

                    <h1 className="lg:text-6xl md:text-6xl text-4xl font-bold lg:mb-6 lg:leading-[1] leading-[1.45]">
                        FIND YOUR
                        <br />
                        <span className="inline-block lg:mt-4">
                            D<span className="text-blue-600">REAM JOB</span> BOARD
                        </span>
                    </h1>
                    <p className="text-gray-600 mt-4 mb-8 max-w-2xl mx-auto">
                        Find all recent job circulars available in the India and around the globe in one place with an easy job application feature.
                    </p>

                    {/* Search Bar */}

                 

                    <div className="bg-white rounded-xl shadow-lg px-8 py-5 border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="keyword"
                                    placeholder="Keyword (e.g. Software, Medical, Finance)"
                                    className="w-full bg-gray-50 border-0 rounded-lg px-4 py-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 transition-colors"
                                    value={filters.keyword}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-px h-10 bg-gray-200 hidden lg:block md:block" />

                            <div className="flex-1 hidden lg:block md:block">
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    className="w-full bg-gray-50 border-0 rounded-lg px-4 py-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 transition-colors"
                                    value={filters.location}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-px h-10 bg-gray-200 hidden lg:block md:block" />

                            <div className="flex-1 hidden lg:block md:block">
                                <input
                                    type="text"
                                    name="qualification"
                                    placeholder="Qualification"
                                    className="w-full bg-gray-50 border-0 rounded-lg px-4 py-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 transition-colors"
                                    value={filters.qualification}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                onClick={handleSearch}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <Search size={18} />
                                Find Jobs
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative mt-16">
                    <img
                        src={HeroImg}
                        alt="Team of professionals"
                        className="w-full rounded-lg"
                    />
                </div>

                <div className="bg-blue-600 text-white text-center py-3 rounded-lg mb-8">
                    <h2 className="text-2xl ">Join our team of professionals</h2>
                    <p className="text-lg">We are always looking for talented individuals to join our team.</p>
                </div>

                {/* Company Logos */}
               
                <div className="relative overflow-hidden mb-1">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / visibleCompanies)}%)`,
                        }}
                    >
                        {companies.map((company, index) => (
                            <div
                                key={index}
                                className="flex-none w-1/4 px-4"
                            >
                                <div className="w-full hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
                                    <div
                                        className="w-full h-20 mb-2"
                                        dangerouslySetInnerHTML={{ __html: company.logo }}
                                    />
                                    <div className="text-center">
                                        <h3 className="font-semibold text-gray-800">{company.name}</h3>
                                        <p className="text-sm text-gray-600">{company.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}


export default HeroSection;