import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { useAuth } from '../context/AuthContext';
import { ActivitySquare, Search, History, FileText } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              What would you like to do today?
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Check Symptoms Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Check Symptoms</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Enter your symptoms and get a preliminary diagnosis
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => navigate('/symptoms')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Start checkup
                  </button>
                </div>
              </div>
            </div>
            
            {/* View History Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <History className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">View History</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Access your previous symptom checks and diagnoses
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => navigate('/history')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View history
                  </button>
                </div>
              </div>
            </div>
            
            {/* Health Articles Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Health Articles</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Read articles and tips about maintaining good health
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => navigate('/articles')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Explore articles
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Activity Section */}
          <div className="mt-8">
            <div className="flex items-center">
              <ActivitySquare className="h-5 w-5 text-gray-400" />
              <h2 className="ml-2 text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            <div className="mt-3 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        No recent activity
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          New account
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Start by checking your symptoms
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Just now
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};