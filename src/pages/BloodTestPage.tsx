import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Layout } from '../components/Layout/Layout';

export const BloodTestPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'image/jpeg' || 
          selectedFile.type === 'image/png') {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please upload a PDF or image file (JPEG/PNG)');
        setFile(null);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // TODO: Implement actual API call to analyze blood test
      // This is a mock response for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults({
        summary: "Blood test analysis complete",
        parameters: [
          { name: "Hemoglobin", value: "14.2 g/dL", range: "13.5-17.5 g/dL", status: "normal" },
          { name: "White Blood Cells", value: "7.5 x10^9/L", range: "4.5-11.0 x10^9/L", status: "normal" },
          { name: "Platelets", value: "250 x10^9/L", range: "150-450 x10^9/L", status: "normal" },
          { name: "Glucose", value: "95 mg/dL", range: "70-100 mg/dL", status: "normal" },
          { name: "Cholesterol", value: "210 mg/dL", range: "<200 mg/dL", status: "high" }
        ],
        recommendations: [
          "Your overall blood test results are within normal ranges",
          "Consider lifestyle modifications to lower cholesterol levels",
          "Schedule a follow-up with your doctor to discuss the results"
        ]
      });
    } catch (err) {
      setError('Failed to analyze the blood test. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blood Test Analysis</h1>
        
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="blood-test-upload"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <label
              htmlFor="blood-test-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-primary-600 mb-4" />
              <span className="text-lg font-medium text-gray-900">
                {file ? file.name : 'Upload Blood Test Report'}
              </span>
              <span className="text-sm text-gray-500 mt-2">
                Supports PDF, JPEG, and PNG files
              </span>
            </label>
          </div>

          {error && (
            <div className="mt-4 flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className={`mt-6 w-full py-3 px-4 rounded-md text-white font-medium ${
              !file || isAnalyzing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Report'}
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
            
            {/* Parameters Table */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Blood Parameters</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parameter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Normal Range
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.parameters.map((param: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {param.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {param.value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {param.range}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            param.status === 'normal' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {param.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
              <ul className="space-y-2">
                {results.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <FileText className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                    <span className="text-gray-600">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}; 