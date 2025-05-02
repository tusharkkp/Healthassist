import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Stethoscope, Calendar, Shield, ArrowRight, Activity, CheckCircle, Users } from 'lucide-react';
import { Layout } from '../components/Layout/Layout';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900 opacity-[0.03] rounded-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl lg:max-w-3xl">
              <h1 className="text-4xl font-heading font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl animate-fade-in">
                Your health assistant <span className="text-primary-600">at your fingertips</span>
          </h1>
              <p className="mt-6 max-w-xl text-xl text-gray-500 leading-relaxed animate-fade-in">
                Get instant preliminary diagnosis based on your symptoms and find the right care options with our AI-powered health assistant.
          </p>
              <div className="mt-10 flex justify-center md:justify-start animate-fade-in">
            <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-4 text-base md:text-lg font-semibold rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Get Started
            </button>
              </div>
            </div>
            <div className="hidden md:block mt-12 md:mt-0 md:max-w-md lg:max-w-lg">
              <img
                src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="Doctor using digital tablet"
                className="rounded-xl shadow-xl object-cover w-full animate-fade-in"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-base font-semibold text-primary-600 uppercase tracking-wide">Features</h2>
            <p className="mt-2 text-3xl font-bold font-heading text-gray-900 sm:text-4xl">
              How HealthAssist works for you
            </p>
            <p className="mt-5 max-w-2xl text-xl text-gray-500 mx-auto">
              A simple, intuitive approach to understanding your health concerns
            </p>
          </div>
          
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {/* Feature 1 */}
              <div className="relative">
                <div className="absolute top-0 left-0 -mt-3 -ml-3 h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 text-primary-600" />
                    </div>
                <div className="pl-16 pt-0.5">
                  <h3 className="text-xl font-medium text-gray-900">Symptom Assessment</h3>
                  <p className="mt-3 text-base text-gray-500 leading-relaxed">
                    Select your symptoms from our comprehensive database for a preliminary evaluation based on medical knowledge.
                  </p>
                  <button 
                    onClick={() => navigate('/symptoms')} 
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors duration-150"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="relative">
                <div className="absolute top-0 left-0 -mt-3 -ml-3 h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <Activity className="h-8 w-8 text-primary-600" />
                    </div>
                <div className="pl-16 pt-0.5">
                  <h3 className="text-xl font-medium text-gray-900">AI-Powered Analysis</h3>
                  <p className="mt-3 text-base text-gray-500 leading-relaxed">
                    Our intelligent system analyzes your symptoms using advanced algorithms to suggest possible conditions.
                  </p>
                  <button 
                    onClick={() => navigate('/dashboard')} 
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors duration-150"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="relative">
                <div className="absolute top-0 left-0 -mt-3 -ml-3 h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary-600" />
                    </div>
                <div className="pl-16 pt-0.5">
                  <h3 className="text-xl font-medium text-gray-900">Healthcare Guidance</h3>
                  <p className="mt-3 text-base text-gray-500 leading-relaxed">
                    Get personalized recommendations on next steps and when to seek professional medical help.
                  </p>
                  <button 
                    onClick={() => navigate('/history')} 
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors duration-150"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="bg-primary-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-gray-900">
              Trusted by thousands of users worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join our growing community of health-conscious individuals taking control of their wellbeing
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
            <div className="bg-white shadow-soft rounded-xl p-8 text-center">
              <p className="text-4xl font-bold text-primary-600">25k+</p>
              <p className="mt-2 text-gray-600">Active Users</p>
            </div>
            <div className="bg-white shadow-soft rounded-xl p-8 text-center">
              <p className="text-4xl font-bold text-primary-600">98%</p>
              <p className="mt-2 text-gray-600">Satisfaction Rate</p>
            </div>
            <div className="bg-white shadow-soft rounded-xl p-8 text-center">
              <p className="text-4xl font-bold text-primary-600">100+</p>
              <p className="mt-2 text-gray-600">Healthcare Partners</p>
            </div>
            <div className="bg-white shadow-soft rounded-xl p-8 text-center">
              <p className="text-4xl font-bold text-primary-600">20min</p>
              <p className="mt-2 text-gray-600">Average Response Time</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-heading text-gray-900">
              What our users are saying
          </h2>
            <p className="mt-4 text-lg text-gray-600">
              Real stories from healthcare professionals and patients
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-card p-8 relative">
              <div className="absolute top-0 right-0 -mt-3 -mr-3 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex items-start mb-6">
                <img
                  className="h-12 w-12 rounded-full object-cover mr-4"
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100"
                    alt="User avatar"
                  />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">John Smith</h3>
                  <p className="text-sm text-gray-500">Healthcare Professional</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "HealthAssist has been an invaluable tool for my patients. It helps them articulate their symptoms more clearly and come to appointments better prepared."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-card p-8 relative">
              <div className="absolute top-0 right-0 -mt-3 -mr-3 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex items-start mb-6">
                <img
                  className="h-12 w-12 rounded-full object-cover mr-4"
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100"
                  alt="User avatar"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">Patient</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "HealthAssist gave me peace of mind when I was worried about my symptoms. The guidance was clear and helped me decide when I needed to see a doctor."
              </p>
                  </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-card p-8 relative">
              <div className="absolute top-0 right-0 -mt-3 -mr-3 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-600" />
                  </div>
              <div className="flex items-start mb-6">
                <img
                  className="h-12 w-12 rounded-full object-cover mr-4"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100"
                  alt="User avatar"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">David Chen</h3>
                  <p className="text-sm text-gray-500">Medical Researcher</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "The platform is built on solid medical knowledge. I'm impressed with the accuracy of the symptom analysis and the clarity of the recommendations provided."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 1440 776" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1440 776V0L0 776H1440Z" fill="white"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to take control of your health?</span>
              <span className="block text-primary-200">Join HealthAssist today.</span>
          </h2>
            <p className="mt-4 text-lg text-white opacity-90 max-w-lg">
              Start your health journey with personalized insights and guidance at your fingertips.
            </p>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
              <button
                onClick={() => navigate('/signup')}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 shadow-md transition-colors duration-150"
              >
                Get started
              </button>
              <button
                onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-primary-700 hover:bg-opacity-30 transition-colors duration-150"
              >
                Sign in
              </button>
          </div>
        </div>
      </div>
      
      {/* Trust Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold font-heading text-gray-900">
                Trust and security
              </h2>
              <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                We maintain the highest standards of data protection and security to ensure your health information remains private and confidential.
              </p>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-50">
                      <Shield className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">End-to-end encryption</h3>
                    <p className="mt-2 text-base text-gray-500 leading-relaxed">
                      All your data is encrypted in transit and at rest using industry-standard protocols.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-50">
                      <CheckCircle className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">HIPAA Compliant</h3>
                    <p className="mt-2 text-base text-gray-500 leading-relaxed">
                      Our platform follows strict healthcare privacy and security standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-50">
                      <Users className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Privacy-first design</h3>
                    <p className="mt-2 text-base text-gray-500 leading-relaxed">
                      Your data is never sold to third parties and is only used to improve your experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-50">
                      <Heart className="h-6 w-6 text-primary-600" />
              </div>
            </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Medical expertise</h3>
                    <p className="mt-2 text-base text-gray-500 leading-relaxed">
                      Our system is built with input from medical professionals to ensure quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};