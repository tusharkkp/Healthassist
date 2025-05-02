import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, LogOut, Menu, X, User, BarChart2, FileText, Image, Droplet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white backdrop-blur-sm bg-opacity-90 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-heading font-bold text-primary-600">
                HealthAssist
              </span>
            </div>
          </div>
          
          {isAuthenticated ? (
            <>
              {/* Desktop navigation */}
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="border-transparent text-gray-600 hover:text-primary-600 hover:border-primary-400 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-150"
                  >
                    <BarChart2 className="h-4 w-4 mr-1.5" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/symptoms')}
                    className="border-transparent text-gray-600 hover:text-primary-600 hover:border-primary-400 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-150"
                  >
                    <FileText className="h-4 w-4 mr-1.5" />
                    Check Symptoms
                  </button>
                  <button
                    onClick={() => navigate('/xray')}
                    className="border-transparent text-gray-600 hover:text-primary-600 hover:border-primary-400 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-150"
                  >
                    <Image className="h-4 w-4 mr-1.5" />
                    X-ray Analysis
                  </button>
                  <button
                    onClick={() => navigate('/blood-test')}
                    className="border-transparent text-gray-600 hover:text-primary-600 hover:border-primary-400 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-150"
                  >
                    <Droplet className="h-4 w-4 mr-1.5" />
                    Blood Test
                  </button>
                  <button
                    onClick={() => navigate('/history')}
                    className="border-transparent text-gray-600 hover:text-primary-600 hover:border-primary-400 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-150"
                  >
                    <Heart className="h-4 w-4 mr-1.5" />
                    History
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-6 inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150 shadow-sm"
                >
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Sign out
                </button>
              </div>
              
              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="ml-4 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-md text-black bg-primary-600 hover:bg-primary-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-colors duration-150"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu, toggle based on menu state */}
      {isAuthenticated && mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 rounded-b-lg shadow-soft animate-slide-up">
          <div className="p-3 space-y-1 divide-y divide-gray-100">
            <div className="py-2 space-y-1">
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150"
              >
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2" />
                  Dashboard
                </div>
              </button>
              <button
                onClick={() => {
                  navigate('/symptoms');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Check Symptoms
                </div>
              </button>
              <button
                onClick={() => {
                  navigate('/xray');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150"
              >
                <div className="flex items-center">
                  <Image className="h-5 w-5 mr-2" />
                  X-ray Analysis
                </div>
              </button>
              <button
                onClick={() => {
                  navigate('/blood-test');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150"
              >
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 mr-2" />
                  Blood Test
                </div>
              </button>
              <button
                onClick={() => {
                  navigate('/history');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150"
              >
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  History
                </div>
              </button>
            </div>
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="block w-full mt-1 px-4 py-3 rounded-md bg-primary-50 text-base font-medium text-primary-700 hover:bg-primary-100 hover:text-primary-800 transition-colors duration-150"
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign out
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};