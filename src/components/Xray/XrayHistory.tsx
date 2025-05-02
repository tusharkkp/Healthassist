import React from 'react';
import { useXray } from '../../context/XrayContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Component to display the user's X-ray upload history
 */
export const XrayHistory: React.FC = () => {
  const { uploadHistory } = useXray();
  const { isAuthenticated } = useAuth();

  // Only show for authenticated users with history
  if (!isAuthenticated || uploadHistory.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6 animate-fade-in mt-6">
      <h2 className="text-xl font-medium text-gray-900 mb-4">Recent X-ray Analyses</h2>
      
      <div className="space-y-4">
        {uploadHistory.map((result) => {
          // Determine icon based on diagnosis
          let icon;
          let bgColor;
          
          if (result.diagnosis.toLowerCase().includes('no abnormalities')) {
            icon = <CheckCircle className="h-5 w-5 text-green-500" />;
            bgColor = 'bg-green-50';
          } else if (result.diagnosis.toLowerCase().includes('fracture')) {
            icon = <AlertCircle className="h-5 w-5 text-red-500" />;
            bgColor = 'bg-red-50';
          } else {
            icon = <AlertCircle className="h-5 w-5 text-amber-500" />;
            bgColor = 'bg-amber-50';
          }
          
          return (
            <div 
              key={result.id} 
              className={`${bgColor} rounded-lg p-4 border border-gray-200`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">{icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{result.diagnosis}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>
                        {new Date(result.date).toLocaleDateString()} at{' '}
                        {new Date(result.date).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {(result.confidence * 100).toFixed(0)}%
                </div>
              </div>
              
              {/* Top recommendation only */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="mt-3 pl-8">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Recommendation:</span>{' '}
                    {result.recommendations[0]}
                    {result.recommendations.length > 1 && (
                      <span className="text-gray-500"> +{result.recommendations.length - 1} more</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 