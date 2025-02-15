import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaBriefcase, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaGraduationCap, FaTools, FaTrophy, FaRunning, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import Profile from './Profile';
import { BarChart, ChevronLeft, ChevronRight, Home, Mail, Search, Settings, UserRoundPen, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../../utility/config';

const Dashboard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [showDashboard, setShowDashboard] = useState(false);
    const formRef = useRef(null);

    const { candidateProfile } = useSelector((state) => state.candidate);

    // console.log(candidateProfile)

    const [candidateData, setCandidateData] = useState(candidateProfile);
    // const [candidateData, setCandidateData] = useState({
    //     candidate_first_name: "Sameer",
    //     candidate_last_name: "Srivastava",
    //     candidate_email: "sameer@example.com",
    //     candidate_phone: "9876543210",
    //     candidate_image_link: null,
    //     candidate_current_role: "Software Engineer",
    //     candidate_current_salary: 85000,
    //     candidate_location: "San Francisco",
    //     candidate_work_preference: "Hybrid",
    //     candidate_availability: "Immediate",
    //     candidate_github_link: "https://github.com/sameer",
    //     candidate_linkedin_link: "https://linkedin.com/in/sameer",

    //     certifications: [
    //         {
    //             certification_id: 1, candidate_certificate_name: "AWS Certified Solutions Architect", candidate_issuing_organization: "Amazon", candidate_issue_date
    //                 : "2024-01"
    //         },
    //         {
    //             certification_id: 2, candidate_certificate_name: "Google Cloud Professional", candidate_issuing_organization: "Google", candidate_issue_date
    //                 : "2023-12"
    //         }
    //     ],
    //     education: [
    //         { education_id: 1, candidate_degree: "Master of Computer Science", candidate_institute: "Stanford University", candidate_end_year: "2020", candidate_start_year: "2016", candidate_score: "3.8 GPA", candidate_education_level: "Bachelors" },
    //         { education_id: 2, candidate_degree: "Bachelor of Engineering", candidate_institute: "IIT Delhi", candidate_end_year: "2022", candidate_start_year: "2020", candidate_score: "4 GPA", candidate_education_level: "Masters" }
    //     ],
    //     languages: [
    //         { language_id: 1, candidate_language: "English", candidate_proficiency: "Beginner" },
    //         { language_id: 2, candidate_language: "Hindi", candidate_proficiency: "Advanced" },
    //         { language_id: 3, candidate_language: "Spanish", candidate_proficiency: "Intermediate" }
    //     ],
    //     skills: [
    //         {
    //             skill_id: 1, candidate_skill
    //                 : "React.js", level: "Expert"
    //         },
    //         {
    //             skill_id: 2, candidate_skill
    //                 : "Node.js", level: "Advanced"
    //         },

    //     ]
    // });

    const [backupData, setBackupData] = useState(null);
    const [errors, setErrors] = useState({});
    const [activeSection, setActiveSection] = useState('personal');
    const [activeSection1, setActiveSection1] = useState('home');

    const sections = [
        { id: 'personal', name: 'Personal Info', icon: '👤' },
        { id: 'professional', name: 'Professional Info', icon: '💼' },
        { id: 'education', name: 'Education', icon: '🎓' },
        { id: 'skills', name: 'Skills', icon: '⚡' },
        { id: 'certifications', name: 'Certifications', icon: '📜' },
        { id: 'languages', name: 'Languages', icon: '🌐' },
        { id: 'links', name: 'Social Links', icon: '🌐' },
        { id: 'resume', name: 'Resume', icon: '🌐' }


    ];

    const navItems = [
        { id: 'home', name: 'Home', icon: <Home className="w-5 h-5" /> },
        { id: 'analytics', name: 'Profile', icon: <UserRoundPen className="w-5 h-5" /> },
        { id: 'users', name: 'Applied Jobs', icon: <Users className="w-5 h-5" /> },
        { id: 'messages', name: 'Messages', icon: <Mail className="w-5 h-5" /> },
        { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
    ];


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCandidateData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!candidateData.candidate_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.candidate_email = 'Invalid email format';
        }
        if (!candidateData.candidate_phone.match(/^\d{10}$/)) {
            newErrors.candidate_phone = 'Phone number must be 10 digits';
        }
        if (candidateData.candidate_current_salary < 0) {
            newErrors.candidate_current_salary = 'Salary cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const startEditing = () => {
        // setBackupData(candidateData);
        setBackupData(candidateData);

        setIsEditing(true);
    };

    const cancelEditing = () => {
        // setCandidateData(backupData);
        setCandidateData(backupData);

        setIsEditing(false);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
   
        if (validateForm()) {
            setIsSaving(true);
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.put(`${BASEURL}/candidates/CandidateProfile/${candidateProfile?.candidate_id}`,candidateData, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
                console.log(candidateData)
                console.log("API Called")
                if (res?.data?.success) {
                    console.log(res?.data?.updatedCandidate)
                    setIsSaving(false);
                    setIsEditing(false);
                }

                // setShowToast(true);
                // setToastMessage('Profile updated successfully!');
            } catch (error) {
                // setShowToast(true);
                // setToastMessage('Error updating profile. Please try again.');
                setIsSaving(false);
            }
        }
    };

    const handleArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };
    const handleLanguageArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.language_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleCertificationArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.certification_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleSkillsArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.skill_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleEducationArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.education_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleExperienceArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type]?.map(item =>
                item.experience_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, id: Date.now() }]
        }));
    };

    const addEducationArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, education_id: Date.now() }]
        }));
    };

    const addLangugeArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, language_id: Date.now() }]
        }));
    };

    const addSkillArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, skill_id: Date.now() }]
        }));
    };

    const addCertificationArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, certification_id: Date.now() }]
        }));
    };

    const addExperienceArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, experience_id_id: Date.now() }]
        }));
    };
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    const removeArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.id !== id)
        }));
    };

    const removeCertificateArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.certification_id !== id)
        }));
    };
    const removeLanguageArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.language_id !== id)
        }));
    };

    const removeSkillArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.skill_id !== id)
        }));
    };

    const removeEducationArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.education_id !== id)
        }));
    };

    const removeExperienceArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.education_id !== id)
        }));
    };

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    const sideNavItems = [
        { id: 'profile', name: 'Candidate Profile', icon: <FaUser /> },
        { id: 'jobs', name: 'Applied Jobs', icon: <FaBriefcase /> }
    ];


    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsExpanded(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavClick = (id) => {
        setActiveSection1(id);
        if (id === 'analytics') {
            setShowDashboard(true);
        } else {
            setShowDashboard(false);
        }
        // setActiveSection(id);
        // setShowDashboard(true);
        // if (isMobile) {
        //   setIsExpanded(false);
        // }
    };






    return (
        <div className="min-h-screen bg-gray-50 mt-16">


            <div>
                {isMobile && isExpanded && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsExpanded(false)}
                        style={{ zIndex: 40 }}
                    />
                )}

                <div
                    className={`fixed top-0 left-0 h-full mt-20 bg-white shadow-lg`}
                    style={{
                        width: isExpanded ? '256px' : '80px',
                        transform: isMobile && !isExpanded ? 'translateX(-100%)' : 'translateX(0)',
                        transition: 'all 0.3s ease-in-out',
                        zIndex: 50
                    }}
                >

                    <nav className="mt-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { handleNavClick(item.id), setIsExpanded(false) }}
                                className="w-full flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                style={{
                                    backgroundColor: activeSection === item.id ? '#EBF5FF' : 'transparent',
                                    borderRight: activeSection === item.id ? '4px solid #2563EB' : 'none',
                                    color: activeSection === item.id ? '#2563EB' : '#4B5563',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                <div className="flex items-center justify-center w-8 h-8">
                                    {item.icon}
                                </div>
                                <span
                                    className="ml-3 font-medium whitespace-nowrap overflow-hidden"
                                    style={{
                                        opacity: isExpanded ? 1 : 0,
                                        transition: 'opacity 0.2s ease-in-out',
                                        visibility: isExpanded ? 'visible' : 'hidden'
                                    }}
                                >
                                    {item.name}
                                </span>
                            </button>
                        ))}
                    </nav>


                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="absolute -right-4 top-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                        style={{
                            transform: 'translateY(-50%)',
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        {isExpanded ? '←' : '→'}
                    </button>
                </div>


                {showDashboard && (
                    <div
                        className="fixed top-0 h-full bg-white shadow-lg"
                        style={{
                            left: isExpanded ? '256px' : '80px',
                            width: '256px',
                            marginTop: '80px',
                            transition: 'all 0.3s ease-in-out'
                        }}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Profile</h2>
                                <button
                                    onClick={() => { setShowDashboard(false), setIsExpanded(true) }}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    ←
                                </button>
                            </div>
                            <nav className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className="w-full cursor-pointer flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                                        style={{ transition: 'all 0.2s ease-in-out' }}
                                    >
                                        <span className="mr-3">{section.icon}</span>
                                        <span className="font-medium">{section.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                )}
            </div>



            {/* Main Content */}
            <div className="ml-76 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Candidate Profile</h1>
                            <p className="text-gray-500 mt-2">Manage your professional information</p>
                        </div>
                        <div className="space-x-4">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={cancelEditing}
                                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSaving}
                                        className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors ${isSaving ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
                                            }`}
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={startEditing}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <span className="mr-2">✏️</span>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">


                        <Profile isEditing={isEditing} candidateData={candidateData} handleInputChange={handleInputChange} errors={errors}
                            removeArrayItem={removeArrayItem}
                            addArrayItem={addArrayItem}
                            handleArrayItemChange={handleArrayItemChange}
                            removeSkillArrayItem={removeSkillArrayItem}
                            handleSkillsArrayItemChange={handleSkillsArrayItemChange}
                            handleLanguageArrayItemChange={handleLanguageArrayItemChange}
                            removeLanguageArrayItem={removeLanguageArrayItem}
                            handleCertificationArrayItemChange={handleCertificationArrayItemChange}
                            removeCertificateArrayItem={removeCertificateArrayItem}
                            removeEducationArrayItem={removeEducationArrayItem}
                            handleEducationArrayItemChange={handleEducationArrayItemChange}
                            addCertificationArrayItem={addCertificationArrayItem}
                            addLangugeArrayItem={addLangugeArrayItem}
                            addSkillArrayItem={addSkillArrayItem}
                            addEducationArrayItem={addEducationArrayItem}
                            handleExperienceArrayItemChange={handleExperienceArrayItemChange}
                            addExperienceArrayItem={addExperienceArrayItem}
                            removeExperienceArrayItem={removeExperienceArrayItem}
                        />



                        {/* Save Changes Button */}
                        {isEditing && (
                            <div className="sticky bottom-4 flex justify-end bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors ${isSaving ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
                                        }`}
                                >
                                    {isSaving ? 'Saving Changes...' : 'Save All Changes'}
                                </button>
                            </div>
                        )}
                    </form>


                </div>
            </div>
        </div >
    );
};

export default Dashboard