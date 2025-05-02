import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { ClipboardList } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  // In a real app, we would fetch history from an API or local storage
  const hasHistory = false;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Your Health History</h1>
            <p className="mt-1 text-sm text-gray-500">
              View your previous symptom checks and diagnoses
            </p>
          </div>
          
          {hasHistory ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {/* This would be populated with actual history items */}
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        Placeholder for history items
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md p-10 text-center">
              <div className="flex justify-center">
                <ClipboardList className="h-16 w-16 text-gray-300" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No history yet</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your symptom checks and diagnoses will appear here once you start using the system.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};