import React from 'react';
// import './App.css';

const TermsofService = () => {
  const pdfUrl = 'https://purple-carmita-16.tiiny.site'
  return (
    <div className="bg-gray-50 py-18">
      <div className="container mx-auto px-4 md:px-0">
        {/* Header Section */}
        <div style={{
          backgroundColor: '#040736',
          color: 'white',
          font:'bold',
          text: '4xl',
          textAlign: 'center',

          
          padding: '20px',
        }}>
          <h1 className='font-bold text-4xl'>Terms of Service</h1>
         
          <p></p>
        </div>
        <div>
        {/* <p className="text-sm">Effective Date: February 20, 2025</p> */}
        </div>

        {/* PDF Embed */}
        <div style={{ marginLeft: '10%', marginRight: '10%' }}>
        <p className="text-xl font-bold px-5 py-3">Effective Date: February 20, 2025</p>
          <iframe
            src={pdfUrl}
            title="Terms of Service"
            width="100%"
            height="800px"  // Adjust the height as needed
            style={{ border: 'none' ,
            padding: '20px',}}
          />
        </div>

        {/* Contact Us Section */}
        <section id="contact-us" className="mb-8" style={{ marginLeft: '10%', marginRight: '10%' }}>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Contact Us
          </h2>
          <p className="text-gray-700">
            For any questions or concerns regarding these Terms of Service, you
            can reach us at{' '}
            <a href="mailto:info@Aurjobs.com" className="text-blue-500">
              info@Aurjobs.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsofService;
