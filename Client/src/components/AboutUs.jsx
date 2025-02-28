import React from 'react';
import Logo from '../../src/assets/newspaper-icon-260nw-436022437.jpg';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Tobi Lütke',
      title: 'Founder & Chief Executive Officer',
      description:
        'Tobi Lütke is the founder and Chief Executive Officer of Shopify. In 2004, Tobi began building software to launch an online snowboard store called Snowdevil. it quickly became obvious that the software was more valuable than the snowboards, so Tobi and his founding team launched the Shopify platform, where he has served as CEO since 2008. Tobi is a vocal advocate for sustainability, computer literacy, and education. He has served as a board member of Coinbase since 2022 and he is actively involved with the open source community, having contributed significantly to Ruby on Rails, Liquid, and ActiveMerchant, Tobi firmly believes that technology is essential for growth and innovation. He is passionate about paving the way for more builders.',
      imageUrl: 'https://via.placeholder.com/200x250', // Replace with actual image URL
    },
    {
      name: 'Harley Finkelstein',
      title: 'President',
      description:
        'Harley Finkelstein is President at Shopify and has been with the company since 2010. He oversees Shopify\'s commercial teams, partnerships, brand, & external affairs. Harley holds a Bachelor degree in Economics from Concordia University and a J.D./M.B.A. joint degree in Law and Business from the University of Ottawa. Prior to his current role, Harley was Shopify\'s COO and has founded numerous startups and ecommerce companies.',
      imageUrl: 'https://via.placeholder.com/200x250', // Replace with actual image URL
    },
    // Add more team members here
    {
      name: 'Harley Finkelstein',
      title: 'President',
      description:
        'Harley Finkelstein is President at Shopify and has been with the company since 2010. He oversees Shopify\'s commercial teams, partnerships, brand, & external affairs. Harley holds a Bachelor degree in Economics from Concordia University and a J.D./M.B.A. joint degree in Law and Business from the University of Ottawa. Prior to his current role, Harley was Shopify\'s COO and has founded numerous startups and ecommerce companies.',
      imageUrl: 'https://via.placeholder.com/200x250', // Replace with actual image URL
    },
    {
      name: 'Harley Finkelstein',
      title: 'President',
      description:
        'Harley Finkelstein is President at Shopify and has been with the company since 2010. He oversees Shopify\'s commercial teams, partnerships, brand, & external affairs. Harley holds a Bachelor degree in Economics from Concordia University and a J.D./M.B.A. joint degree in Law and Business from the University of Ottawa. Prior to his current role, Harley was Shopify\'s COO and has founded numerous startups and ecommerce companies.',
      imageUrl: 'https://via.placeholder.com/200x250', // Replace with actual image URL
    },
    {
      name: 'Harley Finkelstein',
      title: 'President',
      description:
        'Harley Finkelstein is President at Shopify and has been with the company since 2010. He oversees Shopify\'s commercial teams, partnerships, brand, & external affairs. Harley holds a Bachelor degree in Economics from Concordia University and a J.D./M.B.A. joint degree in Law and Business from the University of Ottawa. Prior to his current role, Harley was Shopify\'s COO and has founded numerous startups and ecommerce companies.',
      imageUrl: 'https://via.placeholder.com/200x250', // Replace with actual image URL
    },
    {
      name: 'Harley Finkelstein',
      title: 'President',
      description:
        'Harley Finkelstein is President at Shopify and has been with the company since 2010. He oversees Shopify\'s commercial teams, partnerships, brand, & external affairs. Harley holds a Bachelor degree in Economics from Concordia University and a J.D./M.B.A. joint degree in Law and Business from the University of Ottawa. Prior to his current role, Harley was Shopify\'s COO and has founded numerous startups and ecommerce companies.',
      imageUrl: 'https://via.placeholder.com/200x250', // Replace with actual image URL
    },
  ];

  return (
    <div className="py-20"  style={{ backgroundColor: '#040736' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">
          Leadership Team
        </h2>

        <div>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="mb-8 
              flex items-start rounded-md shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: '#1e293b' }} // Darker card background
            >
              <div className="w-1/3">
                <img
                  className="w-full object-cover h-full"
                  src={Logo}
                  alt={member.name}
                />
              </div>
              <div className="w-2/3 p-6">
                <h3 className="text-xl font-semibold text-gray-100">{member.name}</h3> {/* Lighter name color */}
                <p className="text-gray-400 mb-2">{member.title}</p>
                <p className="text-gray-300">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
