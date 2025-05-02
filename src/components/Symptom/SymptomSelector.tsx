import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Symptom } from '../../types';
import { symptoms } from '../../data/symptoms';
import { useDiagnosis } from '../../context/DiagnosisContext';

export const SymptomSelector: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedSymptoms, addSymptom, removeSymptom } = useDiagnosis();
  
  const filteredSymptoms = symptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symptom.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group symptoms by category
  const groupedSymptoms: Record<string, Symptom[]> = {};
  
  filteredSymptoms.forEach(symptom => {
    if (!groupedSymptoms[symptom.category]) {
      groupedSymptoms[symptom.category] = [];
    }
    groupedSymptoms[symptom.category].push(symptom);
  });
  
  // Format category name for display
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  const isSelected = (symptomId: string) => {
    return selectedSymptoms.some(s => s.id === symptomId);
  };
  
  const handleSymptomClick = (symptom: Symptom) => {
    if (isSelected(symptom.id)) {
      removeSymptom(symptom.id);
    } else {
      addSymptom(symptom);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Select Your Symptoms</h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose all symptoms you are currently experiencing
        </p>
        
        {/* Search bar */}
        <div className="mt-3 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search symptoms..."
          />
        </div>
        
        {/* Selected symptoms */}
        {selectedSymptoms.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected symptoms:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(symptom => (
                <span 
                  key={symptom.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {symptom.name}
                  <button
                    type="button"
                    onClick={() => removeSymptom(symptom.id)}
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-200 focus:text-blue-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Symptom list by category */}
      <div className="p-4 max-h-[400px] overflow-y-auto">
        {Object.keys(groupedSymptoms).length > 0 ? (
          Object.entries(groupedSymptoms).map(([category, symptoms]) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                {formatCategory(category)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {symptoms.map(symptom => (
                  <button
                    key={symptom.id}
                    onClick={() => handleSymptomClick(symptom)}
                    className={`text-left px-4 py-3 rounded-md transition-colors duration-150 ${
                      isSelected(symptom.id)
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{symptom.name}</div>
                    <div className="text-sm text-gray-500">{symptom.description}</div>
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No symptoms found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};