import React from 'react';
import { useXray } from '../../context/XrayContext';
import { Loader2, CheckCircle2, X } from 'lucide-react';

/**
 * Component to display the progress of an X-ray upload and processing
 */
export const XrayUploadProgress: React.FC = () => {
  const { currentUpload, clearCurrentUpload } = useXray();

  // No upload in progress
  if (!currentUpload || currentUpload.status === 'error') {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-900">Processing X-ray</h2>
        {currentUpload.status === 'completed' && (
          <button 
            onClick={clearCurrentUpload}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            {currentUpload.fileName}
          </span>
          <span className="text-sm text-gray-500">
            {(currentUpload.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${currentUpload.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Status message */}
      <div className="flex items-center">
        {currentUpload.status === 'uploading' && (
          <>
            <Loader2 className="h-5 w-5 text-primary-600 animate-spin mr-2" />
            <span className="text-sm text-gray-600">
              Uploading... {currentUpload.progress}%
            </span>
          </>
        )}

        {currentUpload.status === 'processing' && (
          <>
            <Loader2 className="h-5 w-5 text-primary-600 animate-spin mr-2" />
            <span className="text-sm text-gray-600">
              Processing X-ray with AI model...
            </span>
          </>
        )}

        {currentUpload.status === 'completed' && (
          <>
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-600">
              Analysis complete!
            </span>
          </>
        )}
      </div>
    </div>
  );
}; 