export interface Patient {
  id?: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  symptoms: string;
  existingConditions: string[];
  insuranceProvider: string;
  memberId: string;
  consentToTreatment: boolean;
  submittedAt?: string;
}

export interface PatientFormData {
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  symptoms: string;
  existingConditions: string[];
  insuranceProvider: string;
  memberId: string;
  consentToTreatment: boolean;
}

export interface PatientFormErrors {
  patientName?: string;
  age?: string;
  gender?: string;
  phone?: string;
  email?: string;
  symptoms?: string;
  existingConditions?: string;
  insuranceProvider?: string;
  memberId?: string;
  consentToTreatment?: string;
}

export interface PatientFormTouched {
  patientName?: boolean;
  age?: boolean;
  gender?: boolean;
  phone?: boolean;
  email?: boolean;
  symptoms?: boolean;
  existingConditions?: boolean;
  insuranceProvider?: boolean;
  memberId?: boolean;
  consentToTreatment?: boolean;
}

