import React from 'react';
import { useXray } from '../../context/XrayContext';
import { CheckCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';

/**
 * Component to display the results of an X-ray analysis
 */
export const XrayResults: React.FC = () => {
  const { currentUpload } = useXray();

  // Only show if there's a completed upload with results
  if (!currentUpload || 
      currentUpload.status !== 'completed' || 
      !currentUpload.result) {
    return null;
  }

  const { result } = currentUpload;

  // Determine severity based on diagnosis for UI styling
  const getDiagnosisSeverity = (diagnosis: string) => {
    if (diagnosis.toLowerCase().includes('fracture')) {
      return 'high';
    } else if (diagnosis.toLowerCase().includes('pneumonia')) {
      return 'medium';
    } else if (diagnosis.toLowerCase().includes('no abnormalities')) {
      return 'low';
    }
    return 'medium';
  };

  const severity = getDiagnosisSeverity(result.diagnosis);

  // Color and icon based on severity
  const severityConfig = {
    high: {
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      borderColor: 'border-red-200'
    },
    medium: {
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      borderColor: 'border-amber-200'
    },
    low: {
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      borderColor: 'border-green-200'
    }
  };

  const config = severityConfig[severity];

  return (
    <div className="bg-white rounded-xl shadow-card p-6 animate-fade-in mt-6">
      <h2 className="text-xl font-medium text-gray-900 mb-4">Analysis Results</h2>
      
      {/* Diagnosis section */}
      <div className={`${config.bgColor} ${config.textColor} rounded-lg p-4 mb-6 border ${config.borderColor}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            {config.icon}
          </div>
          <div>
            <h3 className="font-medium text-lg">{result.diagnosis}</h3>
            <p className="mt-1">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
            <p className="mt-1 text-sm">
              Analyzed on {result.date.toLocaleDateString()} at {result.date.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
      
      {/* Recommendations section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h3>
        <ul className="space-y-2">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <ChevronRight className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Medical disclaimer */}
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Important</p>
            <p>
              This analysis is performed by an AI model and should be reviewed by a medical professional. 
              Please consult with a healthcare provider for proper diagnosis and treatment options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 