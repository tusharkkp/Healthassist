import { Diagnosis } from '../types';

export const generateMockDiagnosis = (symptoms: string[]): Diagnosis[] => {
  // Simple mock diagnoses based on symptoms
  const diagnoses: Diagnosis[] = [];
  
  if (symptoms.includes('Headache') && symptoms.includes('Fever')) {
    diagnoses.push({
      id: '1',
      name: 'Common Cold',
      description: 'A viral infection of the upper respiratory tract that affects the nose and throat.',
      probability: 0.75,
      solutions: [
        {
          id: '1-1',
          title: 'Rest and Hydration',
          description: 'Get plenty of rest and drink fluids like water, tea, and soup to stay hydrated.',
          urgency: 'low'
        },
        {
          id: '1-2',
          title: 'Over-the-counter Medication',
          description: 'Take over-the-counter pain relievers like acetaminophen or ibuprofen to reduce fever and pain.',
          urgency: 'low'
        }
      ]
    });
  }
  
  if (symptoms.includes('Cough') && symptoms.includes('Fever') && symptoms.includes('Shortness of Breath')) {
    diagnoses.push({
      id: '2',
      name: 'Pneumonia',
      description: 'An infection that inflames the air sacs in one or both lungs, which may fill with fluid.',
      probability: 0.6,
      solutions: [
        {
          id: '2-1',
          title: 'Consult a Doctor',
          description: 'See a healthcare provider immediately for proper diagnosis and treatment.',
          urgency: 'high'
        },
        {
          id: '2-2',
          title: 'Antibiotics',
          description: 'If bacterial, your doctor may prescribe antibiotics. Complete the full course.',
          urgency: 'medium'
        }
      ]
    });
  }
  
  if (symptoms.includes('Abdominal Pain') && symptoms.includes('Nausea') && symptoms.includes('Vomiting')) {
    diagnoses.push({
      id: '3',
      name: 'Gastroenteritis',
      description: 'An intestinal infection marked by diarrhea, abdominal cramps, nausea, vomiting, and sometimes fever.',
      probability: 0.8,
      solutions: [
        {
          id: '3-1',
          title: 'Hydration',
          description: 'Drink clear liquids and electrolyte solutions to prevent dehydration.',
          urgency: 'medium'
        },
        {
          id: '3-2',
          title: 'Rest',
          description: 'Get plenty of rest to help your body fight the infection.',
          urgency: 'low'
        }
      ]
    });
  }
  
  if (symptoms.includes('Rash') && symptoms.includes('Fever')) {
    diagnoses.push({
      id: '4',
      name: 'Chickenpox',
      description: 'A highly contagious viral infection causing an itchy, blister-like rash on the skin.',
      probability: 0.5,
      solutions: [
        {
          id: '4-1',
          title: 'Isolate',
          description: 'Stay at home until all blisters have scabbed over to prevent spreading the virus.',
          urgency: 'medium'
        },
        {
          id: '4-2',
          title: 'Calamine Lotion',
          description: 'Apply calamine lotion to the rash to help relieve itching.',
          urgency: 'low'
        }
      ]
    });
  }
  
  if (symptoms.includes('Joint Pain') && symptoms.includes('Fatigue')) {
    diagnoses.push({
      id: '5',
      name: 'Rheumatoid Arthritis',
      description: 'An autoimmune and inflammatory disease that causes painful swelling in affected joints.',
      probability: 0.4,
      solutions: [
        {
          id: '5-1',
          title: 'Consult a Rheumatologist',
          description: 'See a specialist for proper diagnosis and treatment.',
          urgency: 'medium'
        },
        {
          id: '5-2',
          title: 'Anti-inflammatory Diet',
          description: 'Consider adopting a diet rich in anti-inflammatory foods like fatty fish, nuts, and leafy greens.',
          urgency: 'low'
        }
      ]
    });
  }
  
  // If no specific pattern is matched, provide a generic response
  if (diagnoses.length === 0) {
    diagnoses.push({
      id: 'generic',
      name: 'Non-specific Symptoms',
      description: 'Your symptoms could be related to various conditions. If they persist, please consult a healthcare professional.',
      probability: 0.3,
      solutions: [
        {
          id: 'g-1',
          title: 'Monitor Symptoms',
          description: 'Keep track of your symptoms and note any changes in frequency or intensity.',
          urgency: 'low'
        },
        {
          id: 'g-2',
          title: 'Consult a Doctor',
          description: 'If symptoms worsen or persist for more than a few days, consult with a healthcare professional.',
          urgency: 'medium'
        }
      ]
    });
  }
  
  return diagnoses;
};