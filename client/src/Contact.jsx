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

const Contact = () => (
  <div className="min-h-screen flex flex-col items-center bg-teal-50 px-4 pt-20 py-16">
    <Navbar />
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold text-teal-700 mb-4 text-center">Contact Us</h2>
      <div className="flex flex-col gap-8">
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-3 rounded border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400" />
          <input type="email" placeholder="Your Email" className="p-3 rounded border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400" />
          <textarea placeholder="Your Message" rows={4} className="p-3 rounded border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400" />
          <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-200 self-start">
            Send Message
          </button>
        </form>
        <div className="flex flex-col gap-4 text-teal-700 font-medium">
          <div className="flex items-center gap-2"><span className="text-xl">📧</span> info@washhealth.org</div>
          <div className="flex items-center gap-2"><span className="text-xl">📞</span> +1 234 567 890</div>
          <div className="flex items-center gap-2"><span className="text-xl">📍</span> 123 Health St, Wellness City</div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Contact; 