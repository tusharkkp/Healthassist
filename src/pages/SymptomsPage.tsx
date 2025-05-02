import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { SymptomSelector } from '../components/Symptom/SymptomSelector';
import { DiagnosisResults } from '../components/Diagnosis/DiagnosisResults';
import { useDiagnosis } from '../context/DiagnosisContext';
import { AlertTriangle } from 'lucide-react';

export const SymptomsPage: React.FC = () => {
  const { selectedSymptoms, clearSymptoms, generateDiagnosis, isLoading, diagnoses } = useDiagnosis();
  const [showResults, setShowResults] = useState(false);
  
  const handleGenerateDiagnosis = async () => {
    await generateDiagnosis();
    setShowResults(true);
  };
  
  const handleStartOver = () => {
    clearSymptoms();
    setShowResults(false);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Symptom Checker</h1>
            <p className="mt-1 text-sm text-gray-500">
              Select your symptoms to get a preliminary diagnosis
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className={`w-full ${showResults ? 'md:w-1/2' : ''} mb-6 md:mb-0`}>
              <SymptomSelector />
              
              <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
                <button
                  onClick={handleGenerateDiagnosis}
                  disabled={selectedSymptoms.length === 0 || isLoading}
                  className={`w-full sm:w-auto mb-3 sm:mb-0 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    selectedSymptoms.length === 0 || isLoading
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
                </button>
                
                <button
                  onClick={handleStartOver}
                  className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear All
                </button>
              </div>
              
              {selectedSymptoms.length === 0 && !showResults && (
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">No symptoms selected</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Please select at least one symptom to receive a preliminary diagnosis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {showResults && (
              <div className="w-full md:w-1/2">
                <DiagnosisResults />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};