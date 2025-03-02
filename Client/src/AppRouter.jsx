import React from 'react'
import { Route, Routes,  useLocation } from "react-router-dom"
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import CandidateRegisterPage from './pages/CandidateRegisterPage'
import CandidateLoginPage from './pages/CandidateLoginPage'
import ContactPage from './pages/ContactPage'
import Dashboard from './components/EmployerDashboard/Dashboard'

import CompanyLogin from './components/CompanyLogin'
import CompanyRegistration from './components/CompanyRegistration'
import JobDetails from './components/EmployerDashboard/section/JobDetails'
import JobDetailsPage from './components/JobDetailsPage'
import CandidateDashboard from './components/CandidateDashboard/Dashboard'

import Pricing from './components/Pricing'
// import Footer from './components/Footer'

import JobsPage from './pages/JobsPage'
import PaymentGateway from './components/PaymentGateway'
// import PrivacyPolicy from './components/PrivacyPolicy'
import TermsofService from './components/TermsofService'
import ApplicantProfile from './components/EmployerDashboard/section/ApplicantProfile'

const AppRouter = () => {

    const location = useLocation();
  
  // Define routes where Navbar should not appear
  const routesWithoutNavbar = [
    '/candidate_login',
    '/candidate_register',
    '/company_login',
    '/company_register'
  ];

  // Check if current path should have navbar
  const shouldShowNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <>
    {shouldShowNavbar && <Navbar />}
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/candidate_register' element={<CandidateRegisterPage />} />
          <Route path='/candidate_login' element={<CandidateLoginPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/candidate_dashboard' element={<CandidateDashboard/>} /> 
          <Route path='/employer_dashboard' element={<Dashboard/>} />  {/* Add this route */}
          <Route path='/company_login' element={<CompanyLogin/>}/>
          <Route path='/company_register' element={<CompanyRegistration/>}/>
          <Route path='/jobs' element={<JobsPage/>}/>
          <Route path='/jobs/:jobId' element={<JobDetailsPage/>}/>
          <Route path="/employer_dashboard/jobs/:jobId" element={<JobDetails />} />
          <Route path="/Pricing" element={<Pricing />} /> 
          <Route path='/payment_gateway' element={<PaymentGateway/>}/>
          {/* <Route path='/privacy_policy' element={<PrivacyPolicy/>}/> */}
          <Route path='/terms_and_conditions' element={<TermsofService/>}/>
          <Route path='/applicant_profile/:id' element={<ApplicantProfile/>}/>
        </Routes>
    </>
  )
}

export default AppRouter;
