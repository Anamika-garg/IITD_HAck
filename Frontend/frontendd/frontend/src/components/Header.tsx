import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Menu, X } from 'lucide-react';
import logo from '../../logo.jpg'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    // { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Careers', href: '/#careers' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Resume', href: '/resume' }
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('/#') && location.pathname === '/') {
      const element = document.querySelector(href.substring(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Cpu className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CareerAI</span>
            {/* <img src={logo} alt="" /> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href.replace(/^\/#/, '/')}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* <Link to="/auth" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sign In
            </Link>
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href.replace(/^\/#/, '/')}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              {/* <Link
                to="/auth"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Get Started
              </Link> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}