import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DiagnosisState, Symptom, Diagnosis } from '../types';
import { generateMockDiagnosis } from '../data/mockDiagnoses';

// Action types
type DiagnosisAction =
  | { type: 'ADD_SYMPTOM'; payload: Symptom }
  | { type: 'REMOVE_SYMPTOM'; payload: string }
  | { type: 'CLEAR_SYMPTOMS' }
  | { type: 'GENERATE_DIAGNOSIS_START' }
  | { type: 'GENERATE_DIAGNOSIS_SUCCESS'; payload: Diagnosis[] }
  | { type: 'GENERATE_DIAGNOSIS_FAILURE'; payload: string };

// Initial state
const initialState: DiagnosisState = {
  selectedSymptoms: [],
  diagnoses: [],
  isLoading: false,
  error: null,
};

// Diagnosis reducer
const diagnosisReducer = (state: DiagnosisState, action: DiagnosisAction): DiagnosisState => {
  switch (action.type) {
    case 'ADD_SYMPTOM':
      // Only add if not already in the list
      return {
        ...state,
        selectedSymptoms: state.selectedSymptoms.some(s => s.id === action.payload.id) 
          ? state.selectedSymptoms 
          : [...state.selectedSymptoms, action.payload],
      };
    case 'REMOVE_SYMPTOM':
      return {
        ...state,
        selectedSymptoms: state.selectedSymptoms.filter(symptom => symptom.id !== action.payload),
      };
    case 'CLEAR_SYMPTOMS':
      return {
        ...state,
        selectedSymptoms: [],
        diagnoses: [],
      };
    case 'GENERATE_DIAGNOSIS_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'GENERATE_DIAGNOSIS_SUCCESS':
      return {
        ...state,
        diagnoses: action.payload,
        isLoading: false,
        error: null,
      };
    case 'GENERATE_DIAGNOSIS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Create context
interface DiagnosisContextType extends DiagnosisState {
  addSymptom: (symptom: Symptom) => void;
  removeSymptom: (symptomId: string) => void;
  clearSymptoms: () => void;
  generateDiagnosis: () => Promise<void>;
}

const DiagnosisContext = createContext<DiagnosisContextType | undefined>(undefined);

// Diagnosis provider component
export const DiagnosisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(diagnosisReducer, initialState);

  const addSymptom = (symptom: Symptom) => {
    dispatch({ type: 'ADD_SYMPTOM', payload: symptom });
  };

  const removeSymptom = (symptomId: string) => {
    dispatch({ type: 'REMOVE_SYMPTOM', payload: symptomId });
  };

  const clearSymptoms = () => {
    dispatch({ type: 'CLEAR_SYMPTOMS' });
  };

  const generateDiagnosis = async () => {
    dispatch({ type: 'GENERATE_DIAGNOSIS_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, use a mock function to generate diagnoses
      if (state.selectedSymptoms.length === 0) {
        throw new Error('Please select at least one symptom');
      }
      
      const symptomNames = state.selectedSymptoms.map(s => s.name);
      const diagnoses = generateMockDiagnosis(symptomNames);
      
      dispatch({ type: 'GENERATE_DIAGNOSIS_SUCCESS', payload: diagnoses });
    } catch (error) {
      dispatch({ 
        type: 'GENERATE_DIAGNOSIS_FAILURE', 
        payload: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };
  
  return (
    <DiagnosisContext.Provider
      value={{
        ...state,
        addSymptom,
        removeSymptom,
        clearSymptoms,
        generateDiagnosis,
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};

// Hook for using diagnosis context
export const useDiagnosis = (): DiagnosisContextType => {
  const context = useContext(DiagnosisContext);
  if (context === undefined) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider');
  }
  return context;
};