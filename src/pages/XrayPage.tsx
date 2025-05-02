import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { XrayUpload } from '../components/Xray/XrayUpload';
import { XrayUploadProgress } from '../components/Xray/XrayUploadProgress';
import { XrayResults } from '../components/Xray/XrayResults';
import { XrayHistory } from '../components/Xray/XrayHistory';
import { Image, AlertTriangle } from 'lucide-react';

/**
 * Main page for X-ray upload and analysis
 */
export const XrayPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Image className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-heading font-bold text-gray-900">X-ray Analysis</h1>
          </div>
          <p className="text-lg text-gray-600">
            Upload an X-ray image for AI-powered analysis and get instant insights to assist your healthcare decisions.
          </p>
        </div>

        {/* Disclaimer banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-700">
            <p className="font-semibold mb-1">Medical Disclaimer</p>
            <p>
              This X-ray analysis feature uses artificial intelligence to provide preliminary insights and is not a replacement for professional medical diagnosis. 
              The results should be reviewed by a qualified healthcare provider. Always consult a medical professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <XrayUpload />
          <XrayUploadProgress />
          <XrayResults />
          <XrayHistory />
        </div>
      </div>
    </Layout>
  );
}; 