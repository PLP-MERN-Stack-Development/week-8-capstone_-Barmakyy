import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const features = [
  {
    title: "Real-Time Monitoring",
    description: "Track WASH standards and compliance across all your health facilities with live dashboards.",
    icon: "📊",
  },
  {
    title: "Automated Reporting",
    description: "Generate and share detailed reports with just a click, saving time and improving accuracy.",
    icon: "📝",
  },
  {
    title: "Staff Training",
    description: "Access resources and training modules to keep your staff up-to-date on best WASH practices.",
    icon: "🎓",
  },
  {
    title: "Community Impact",
    description: "See measurable improvements in health outcomes and community well-being.",
    icon: "🌍",
  },
];

const testimonials = [
  {
    quote: "Since using WASH Health, our facility's hygiene standards have never been higher!",
    author: "Dr. Amina, Facility Manager",
  },
  {
    quote: "The automated reports save us hours every month and help us stay compliant.",
    author: "Samuel, Operations Lead",
  },
  {
    quote: "Our staff love the training modules—easy to use and very informative!",
    author: "Nurse Grace, Training Coordinator",
  },
];

const Footer = () => (
  <footer className="w-full bg-white/90 border-t border-teal-100 py-6 mt-auto flex flex-col items-center text-center text-gray-600 text-sm">
    <div className="font-bold text-teal-700 mb-1">WASH Health</div>
    <div>© {new Date().getFullYear()} WASH Health. All rights reserved.</div>
    <div className="mt-1 text-xs text-gray-400">Footer will be updated with more info and links in the future.</div>
  </footer>
);

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex flex-col items-center pt-20 px-4">
      <Navbar />
      {/* Hero Section */}
      <section id="home" className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full mt-12 md:mt-24 mb-8 gap-10">
        {/* Hero Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-4 drop-shadow-lg leading-tight">
            Integrated WASH Program
            <span className="block text-teal-600 mt-2">for Health Facilities</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl">
            Empowering health facilities with Water, Sanitation, and Hygiene (WASH) solutions to ensure safe, clean, and healthy environments for all. Track, manage, and improve WASH standards with our easy-to-use platform.
          </p>
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-200"
            onClick={() => navigate('/register')}
          >
            Get Started
          </button>
        </div>
        {/* Hero Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-72 h-72 md:w-96 md:h-96 bg-blue-200 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
            {/* Hero image placeholder */}
            <span className="text-blue-400 text-8xl md:text-9xl">🏥</span>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-teal-200 to-transparent" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-12 grid md:grid-cols-2 gap-10">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex items-start gap-4 hover:shadow-xl transition">
            <span className="text-4xl md:text-5xl text-teal-500">{feature.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-teal-700 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Testimonials/Impact Section */}
      <section className="w-full max-w-4xl py-12 mb-16">
        <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
              <span className="text-4xl text-teal-400 mb-4">“</span>
              <p className="text-gray-700 italic mb-4">{t.quote}</p>
              <span className="text-teal-700 font-semibold">{t.author}</span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage; 