import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { User, Info, ArrowRight, ArrowLeft, Mail, Eye, EyeOff, Phone, MapPin, Axe, Loader2, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { BASEURL } from '../../utility/config';

const CandidateSignup = ({ navigateToLogin }) => {


    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: "",

        //II
        location: "",
        password: '',
        confirmPassword: '',
        resume_url: ""
    });
    const [currentSection, setCurrentSection] = useState(1);
    const [passwordVisible, setPasswordVisible] = useState({
        password: false,
        confirmPassword: false
    });
    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisible(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const nextSection = () => {
        setCurrentSection(2);
    };

    const previousSection = () => {
        setCurrentSection(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here
        try {
            setLoading(true)
            const res = await axios.post(`${BASEURL}/candidates/CandidateSignup`, formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (res?.data?.success) {
                toast.success(res?.data?.message || 'Account created successfully!', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#4CAF50',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '16px',
                        borderRadius: '8px'
                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: '#4CAF50'
                    }
                });
                navigate("/candidate_login")

            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Something went wrong', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#FF6B6B',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '8px'
                }
            });
        } finally {
            setLoading(false)
        }



        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            phone: "",
            //II
            location: "",
            password: '',
            confirmPassword: '',
            resumeUrl: ""
        })
    };

    useEffect(() => {
        // Check password match whenever password or confirmPassword changes
        if (formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: 'Passwords do not match'
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: ''
                }));
            }
        }
    }, [formData.password, formData.confirmPassword]);

    return (



        <div className=" w-full h-screen flex items-center justify-center bg-white py-12 px-4 [&::-webkit-scrollbar]:hidden">

            <div className="flex flex-col md:flex-row w-[85%] max-w-4xl justify-center">
            {/* employer button  */}
                <Link
                    to="/company_register"
                    className="absolute top-24 ml-20 right-4 inline-flex items-center px-4 py-2  text-orange-500 rounded-lg hover:text-blue-500 duration-300 text-medium font-medium "
                  style={{  
                    position: 'absolute',
                    top: '55px', 
                    right: '4px', 

           
                    '@media (max-width: 375px)': {
                      top: '20px',   
                      right: '2px',  
                      fontSize: '0.8rem', 
                    },

                    '@media (min-width: 428px)': {
                      top: '35px',  
                      right: '6px',  
                    },
                  }}
                >
                    <ArrowRight className="mr-2 h-4 w-4 md:relative" />
                    For Employers
                </Link>
                <div className="space-y-1">
                    <h2 className="text-2xl font-sans font-bold text-black mt-5 text-center">Create a new Account</h2>
                    <p className='text-center ml-4'>Join us today!</p>
                    <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-6">
                        <div className="mb-6">

                            <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentSection >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'
                                        }`}>
                                        <User size={18} />
                                    </div>
                                    <span className="ml-2 text-sm font-medium">Personal Details</span>
                                </div>
                                <div className="flex-1 h-0.5 mx-4 bg-gray-200">
                                    <div className={`h-full bg-orange-500 transition-all duration-300 ${currentSection >= 2 ? 'w-full' : 'w-0'
                                        }`}></div>
                                </div>
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentSection >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'
                                        }`}>
                                        <Info className=" " size={18} />
                                    </div>
                                    <span className="ml-2 text-sm font-medium">Additional Details</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden ">
                            <div className={`transition-transform duration-500 transform ${currentSection === 1 ? 'translate-x-0' : '-translate-x-full'
                                } ${currentSection === 2 ? 'hidden' : ''}`}>
                                {/* Personal Details Section */}
                                <div className="space-y-6 mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                <User className="mr-2 text-orange-500" size={18} />
                                                First Name <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                value={formData.firstname}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 transition-all duration-300 hover:border-orange-500"
                                                placeholder="Enter first name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                <User className="mr-2 text-orange-500" size={18} />
                                                Last Name <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                value={formData.lastname}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 
                      focus:border-transparent 
                      transition-all duration-300 hover:border-orange-500"
                                                placeholder="Enter last name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                <Mail className="mr-2 text-orange-500" size={18} />
                                                Email <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500
                      
                      transition-all duration-300 "
                                                placeholder="Enter email address"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                <Phone className="mr-2 text-orange-500" size={18} />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500
                      
                      transition-all duration-300 "
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`transition-transform duration-500 transform ${currentSection === 2 ? 'translate-x-0' : 'translate-x-full'
                                } ${currentSection === 1 ? 'hidden' : ''}`}>
                                {/* Additional Details Section */}
                                <div className="space-y-6 mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                <MapPin className="mr-2 text-orange-500" size={18} />
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500
                      
                      transition-all duration-300 "
                                                placeholder="Enter your location"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Resume URL
                                            </label>
                                            <input
                                                type="text"
                                                name="resumeUrl"
                                                value={formData.resumeUrl}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500
                      
                      transition-all duration-300"
                                                placeholder="Enter resume URL"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Password <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={passwordVisible.password ? "text" : "password"}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500
                      
                      transition-all duration-300"
                                                    placeholder="Enter password"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-orange-500 focus:outline-none"
                                                    onClick={() => togglePasswordVisibility('password')}
                                                >
                                                    {passwordVisible.password ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Confirm Password <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={passwordVisible.confirmPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500
                      
                      transition-all duration-300"
                                                    placeholder="Confirm password"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-orange-500 focus:outline-none"
                                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                                >
                                                    {passwordVisible.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            {currentSection === 2 && (
                                <button
                                    type="button"
                                    onClick={previousSection}
                                    className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 duration-300"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Previous
                                </button>
                            )}
                            {currentSection === 1 ? (
                                <button
                                    type="button"
                                    onClick={nextSection}
                                    className="flex items-center ml-auto px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg 
        hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 
        transition-colors duration-300"
                                >
                                    Next
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`inline-flex items-center px-4 py-2 ${loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-orange-500 hover:bg-orange-600'
                                        } text-white rounded-lg duration-300`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Create Account
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-xs sm:text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    to="/candidate_login"
                                    onClick={navigateToLogin}
                                    className="text-orange-500 font-semibold hover:text-orange-500 transition-colors"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CandidateSignup;
