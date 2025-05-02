import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { useXray } from '../../context/XrayContext';

/**
 * Component for uploading X-ray images with drag and drop functionality
 */
export const XrayUpload: React.FC = () => {
  const { uploadXray, currentUpload } = useXray();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Accepted file types
  const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  /**
   * Handle the file upload process after a file is selected
   */
  const handleFileUpload = (file: File) => {
    // Reset previous error
    setError(null);

    // Validate file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, JPEG, or PNG)');
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setError('File size exceeds 10MB limit');
      return;
    }

    // Upload the file
    uploadXray(file);
  };

  /**
   * Trigger file input click when upload button is clicked
   */
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Handle file selection from file input
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }

    // Reset file input so the same file can be uploaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Handle drag over event for drag and drop
   */
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  /**
   * Handle drag leave event for drag and drop
   */
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  /**
   * Handle drop event for drag and drop
   */
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Don't show upload UI if there's already an upload in progress
  if (currentUpload && currentUpload.status !== 'error') {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-4">Upload X-ray Image</h2>
      
      {/* Error message */}
      {(error || (currentUpload?.status === 'error' && currentUpload.error)) && (
        <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm">{error || currentUpload?.error}</p>
          </div>
        </div>
      )}

      {/* Drag and drop area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onClick={handleUploadClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-1">
            Drag and drop your X-ray image here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse your files
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: JPG, PNG, JPEG (max 10MB)
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
      />

      {/* Medical disclaimer */}
      <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Disclaimer:</span> This X-ray analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </div>
  );
}; 