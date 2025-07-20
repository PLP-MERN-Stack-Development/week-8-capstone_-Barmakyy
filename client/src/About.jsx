import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="w-full flex items-center justify-between py-4 px-6 bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-20">
    <div className="text-2xl font-bold text-teal-700 tracking-tight">WASH Health</div>
    <ul className="flex space-x-6 text-gray-700 font-medium">
      <li><Link to="/" className="hover:text-teal-600 transition">Home</Link></li>
      <li><Link to="/about" className="hover:text-teal-600 transition">About</Link></li>
      <li><Link to="/contact" className="hover:text-teal-600 transition">Contact</Link></li>
    </ul>
  </nav>
);

const Footer = () => (
  <footer className="w-full bg-white/90 border-t border-teal-100 py-6 mt-auto flex flex-col items-center text-center text-gray-600 text-sm">
    <div className="font-bold text-teal-700 mb-1">WASH Health</div>
    <div>© {new Date().getFullYear()} WASH Health. All rights reserved.</div>
    <div className="mt-1 text-xs text-gray-400">Footer will be updated with more info and links in the future.</div>
  </footer>
);

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-teal-100 flex flex-col items-center pt-20 px-4">
    <Navbar />
    {/* Hero Section */}
    <section className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full mt-16 md:mt-28 mb-12 gap-10">
      {/* Hero Text */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-4 drop-shadow-lg leading-tight">
          About the Integrated WASH Program
        </h1>
        <h2 className="text-xl md:text-2xl text-blue-700 font-semibold mb-6">
          Transforming Health Facilities for a Healthier Tomorrow
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl">
          Our mission is to empower health facilities with the tools and knowledge to achieve the highest standards in Water, Sanitation, and Hygiene (WASH). We believe every patient and staff member deserves a safe, clean, and healthy environment.
        </p>
      </div>
      {/* Hero Image */}
      <div className="flex-1 flex justify-center md:justify-end">
        <div className="relative w-64 h-64 md:w-80 md:h-80 bg-blue-100 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
          {/* Hero image placeholder */}
          <img src="https://images.pexels.com/photos/3030281/pexels-photo-3030281.jpeg" alt="Clean water" className="object-cover w-full h-full rounded-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-teal-200 to-transparent" />
        </div>
      </div>
    </section>

    {/* About Content Section */}
    <section className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 mb-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-teal-700 mb-2">Our Impact</h3>
        <p className="text-gray-700 text-lg">
          The Integrated WASH Program is dedicated to improving Water, Sanitation, and Hygiene standards in health facilities. Our mission is to create safer, healthier environments for patients, staff, and communities by providing tools to monitor, manage, and enhance WASH practices.
        </p>
        <p className="text-gray-600">
          Through collaboration, innovation, and data-driven solutions, we empower health facilities to achieve sustainable WASH outcomes and make a lasting impact on public health.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <img src="https://thewashfoundation.org/wp-content/uploads/2018/04/ctwf-major-components-of-proper-handwashing.png" alt="Sanitation facility" className="rounded-xl shadow-md w-full h-70 object-cover" />
        <img src="https://images.pexels.com/photos/9222630/pexels-photo-9222630.jpeg" alt="Healthcare workers" className="rounded-xl shadow-md w-full h-60 object-cover" />
      </div>
    </section>
    <Footer />
  </div>
);

export default About; 