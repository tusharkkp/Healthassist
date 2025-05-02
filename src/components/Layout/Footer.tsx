import React from 'react';
import { Heart, Mail, Phone, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center">
                <Heart className="h-6 w-6 text-primary-600" />
                <span className="ml-2 text-xl font-heading font-bold text-primary-600">
                  HealthAssist
                </span>
          </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                HealthAssist helps you understand your symptoms and find the right care options 
                quickly and efficiently. Your health assistant at your fingertips.
              </p>
              <div className="mt-6 flex items-center space-x-4">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary-600 transition-colors duration-150"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary-600 transition-colors duration-150"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary-600 transition-colors duration-150"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="md:col-span-3 lg:col-span-2">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Platform
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <button 
                    onClick={() => navigate('/')}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/symptoms')}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    Check Symptoms
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/history')}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    History
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Legal */}
            <div className="md:col-span-3 lg:col-span-2">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    Data Processing
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div className="md:col-span-4">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Contact Us
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a 
                    href="mailto:contact@healthassist.com" 
                    className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    <span>contact@healthassist.com</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors duration-150"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    <span>+1 (234) 567-890</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4 mt-0.5" />
                    <span>123 Health Avenue, Medical District<br />New York, NY 10001</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs text-gray-500">
                &copy; {currentYear} HealthAssist. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <p className="text-xs text-gray-500 max-w-md">
          Disclaimer: This application is for educational purposes only and does not provide medical advice. 
          Always consult with a qualified healthcare provider for medical concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};