import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from '../assets/CompanyRegisterImage.png'
import { ArrowRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASEURL } from "../utility/config";

const CompanyRegistration = ({ navigateToLogin }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company Name is required.";
    }
    if (!formData.company_email.trim()) {
      newErrors.company_email = "Company Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.company_email)
    ) {
      newErrors.company_email = "Invalid email address.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validateForm()) {
    //   console.log("Form submitted: ", formData);
    // }

    try {
      setLoading(true)
      const res = await axios.post(`${BASEURL}/employers/Employer_Signup`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Company Registered successfully!', {
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
        navigate("/company_login")

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
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-row md:flex-row w-full justify-center shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/2 lg:flex justify-start items-stretch hidden md:block bg-orange-500">
          <img
            src={RegisterImage}
            alt="Register"
            className="w-full h-screen object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="w-full">
          <Link
              to="/candidate_register"
              className="absolute top-24 right-4 inline-flex items-center px-4 py-2  text-orange-500 rounded-lg hover:text-blue-500 duration-300 text-medium font-medium"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              For Candidate
            </Link>
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-black mb-6 text-center">
                Registration
              </h2>

              <form onSubmit={handleSubmit} noValidate>
                {/* Company Name */}
                <div className="relative mt-4">
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${
                      errors.company_name ? 'border-b-red-500' : 'border-b-black'
                    } ${formData.company_name ? 'pt-4 pb-0' : ''}`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="company_name"
                    className={`absolute text-md text-black duration-300 transform origin-[0] ${
                      formData.company_name
                        ? 'top-0 -translate-y-4 scale-75'
                        : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
                    }`}
                  >
                    Company Name
                  </label>
                  {errors.company_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company_name}
                    </p>
                  )}
                </div>

                {/* Company Email */}
                <div className="relative mt-4">
                  <input
                    type="email"
                    id="company_email"
                    name="company_email"
                    value={formData.company_email}
                    onChange={handleChange}
                    className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${
                      errors.company_email ? 'border-b-red-500' : 'border-b-black'
                    } ${formData.company_email ? 'pt-4 pb-0' : ''}`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="company_email"
                    className={`absolute text-md text-black duration-300 transform origin-[0] ${
                      formData.company_email
                        ? 'top-0 -translate-y-4 scale-75'
                        : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
                    }`}
                  >
                    Company Email
                  </label>
                  {errors.company_email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company_email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative mt-4">
                  <input
                    type="password"
                    id="password"
                    name="company_password"
                    value={formData.company_password}
                    onChange={handleChange}
                    className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${
                      errors.company_password ? 'border-b-red-500' : 'border-b-black'
                    } ${formData.company_password ? 'pt-4 pb-0' : ''}`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="password"
                    className={`absolute text-md text-black duration-300 transform origin-[0] ${
                      formData.company_password
                        ? 'top-0 -translate-y-4 scale-75'
                        : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
                    }`}
                  >
                    Password
                  </label>
                  {errors.company_password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company_password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative mt-4">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${
                      errors.confirmPassword ? 'border-b-red-500' : 'border-b-black'
                    } ${formData.confirmPassword ? 'pt-4 pb-0' : ''}`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={`absolute text-md text-black duration-300 transform origin-[0] ${
                      formData.confirmPassword
                        ? 'top-0 -translate-y-4 scale-75'
                        : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
                    }`}
                  >
                    Confirm Password
                  </label>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Register
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/company_login">
                    <span className="text-orange-500 hover:text-blue-600 font-medium cursor-pointer">
                      Log in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



};

export default CompanyRegistration;