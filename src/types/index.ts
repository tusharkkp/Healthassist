export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Symptom {
  id: string;
  name: string;
  description: string;
  category: SymptomCategory;
}

export interface Diagnosis {
  id: string;
  name: string;
  description: string;
  probability: number;
  solutions: Solution[];
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

export type SymptomCategory = 
  | 'head' 
  | 'chest' 
  | 'abdomen' 
  | 'limbs' 
  | 'skin' 
  | 'general';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface DiagnosisState {
  selectedSymptoms: Symptom[];
  diagnoses: Diagnosis[];
  isLoading: boolean;
  error: string | null;
}