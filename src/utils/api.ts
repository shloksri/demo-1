import type { Patient } from '../types/patient';

const API_BASE_URL = 'http://localhost:3001/api';

export interface ApiResponse {
  success: boolean;
  message: string;
  patient?: Patient;
  error?: string;
}

export const submitPatientData = async (patientData: Omit<Patient, 'id' | 'submittedAt'>): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit patient data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

