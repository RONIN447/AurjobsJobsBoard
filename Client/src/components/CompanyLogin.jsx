import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from '../assets/Login.png';
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASEURL } from "../utility/config";
import toast from "react-hot-toast";
import { getEmployerProfile, setEmployerAuthentication } from "../redux/employerSlice";

function CompanyLogin() {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_email: '',
    company_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const res = await axios.post(`${BASEURL}/employers/Employer_Login`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message || 'User Logged In successfully!', {
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
        navigate("/")

        dispatch(getEmployerProfile(res?.data?.employer))
        dispatch(setEmployerAuthentication(true))

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
      dispatch(setEmployerAuthentication(false))
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full h-screen justify-center shadow-lg rounded-lg overflow-hidden">

        {/* Left: Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-black mb-2">Login to your account</h2>
              <p className="text-gray-600">Welcome back!</p>
            </div>
            <hr />
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  id="company_email"
                  value={formData.company_email}
                  onChange={handleChange}
                  className="block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer"
                  placeholder=" "
                  name="company_email"
                />
                <label
                  htmlFor="email"
                  className="absolute text-md text-black duration-300 transform top-0 -translate-y-4 scale-75 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email address
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="company_password"
                  value={formData.company_password}
                  onChange={handleChange}
                  className="block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer"
                  placeholder=" "
                  name="company_password"
                />
                <label
                  htmlFor="password"
                  className="absolute text-md text-black duration-300 transform top-0 -translate-y-4 scale-75 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Password
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              LOG IN
            </button>

            <div className="text-center space-y-3">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to={"/company_register"}>
                  <span className="text-orange-500 hover:text-blue-600 font-medium cursor-pointer">
                    Create an account
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right: Image */}
        <div className=" hidden md:block md:w-1/2 p-6 items-center justify-center bg-orange-500">
          <img
            src={LoginImage}
            alt="Login"
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyLogin;
