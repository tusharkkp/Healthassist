import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useDiagnosis } from '../../context/DiagnosisContext';

export const DiagnosisResults: React.FC = () => {
  const { diagnoses, isLoading, error } = useDiagnosis();
  
  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-blue-100 rounded w-1/3"></div>
          <div className="h-24 w-full bg-gray-100 rounded mt-6"></div>
        </div>
        <p className="text-blue-600 mt-4">Analyzing your symptoms...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center text-red-500 mb-4">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h3 className="text-lg font-medium text-center text-red-800">Error</h3>
        <p className="mt-2 text-center text-gray-600">{error}</p>
      </div>
    );
  }
  
  if (diagnoses.length === 0) {
    return null;
  }
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-700 bg-green-50 border-green-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };
  
  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.7) return 'text-red-700';
    if (probability >= 0.4) return 'text-yellow-700';
    return 'text-blue-700';
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Possible Conditions</h2>
        <p className="text-sm text-gray-500 mt-1">
          Based on the symptoms you provided, here are some possible conditions.
        </p>
        <div className="mt-4 text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-md p-3">
          <strong className="text-blue-700">Important Disclaimer:</strong> This is not a professional medical diagnosis. 
          Always consult with a healthcare provider for proper evaluation and treatment.
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {diagnoses.map((diagnosis) => (
          <div key={diagnosis.id} className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-800">{diagnosis.name}</h3>
              <span className={`text-sm font-medium px-2 py-1 rounded ${getProbabilityColor(diagnosis.probability)}`}>
                {Math.round(diagnosis.probability * 100)}% match
              </span>
            </div>
            
            <p className="mt-2 text-gray-600">{diagnosis.description}</p>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Recommendations</h4>
              
              <div className="space-y-3">
                {diagnosis.solutions.map((solution) => (
                  <div 
                    key={solution.id} 
                    className={`p-3 border rounded-md flex ${getUrgencyColor(solution.urgency)}`}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {getUrgencyIcon(solution.urgency)}
                    </div>
                    <div>
                      <h5 className="font-medium">{solution.title}</h5>
                      <p className="text-sm mt-1">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};