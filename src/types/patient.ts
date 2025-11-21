export interface Patient {
  id?: string;
  patientName: string;
  emergencyContactName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  emergencyContactPhone: string;
  email: string;
  symptoms: string;
  existingConditions: string[];
  insuranceProvider: string;
  insuranceIssuedYear: string;
  memberId: string;
  consentToTreatment: boolean;
  submittedAt?: string;
}

export interface PatientFormData {
  patientName: string;
  emergencyContactName: string;
  age: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  emergencyContactPhone: string;
  email: string;
  symptoms: string;
  existingConditions: string[];
  insuranceProvider: string;
  insuranceIssuedYear: string;
  memberId: string;
  consentToTreatment: boolean;
}

export interface PatientFormErrors {
  patientName?: string;
  emergencyContactName?: string;
  age?: string;
  gender?: string;
  bloodGroup?: string;
  phone?: string;
  emergencyContactPhone?: string;
  email?: string;
  symptoms?: string;
  existingConditions?: string;
  insuranceProvider?: string;
  insuranceIssuedYear?: string;
  memberId?: string;
  consentToTreatment?: string;
}

export interface PatientFormTouched {
  patientName?: boolean;
  emergencyContactName?: boolean;
  age?: boolean;
  gender?: boolean;
  bloodGroup?: boolean;
  phone?: boolean;
  emergencyContactPhone?: boolean;
  email?: boolean;
  symptoms?: boolean;
  existingConditions?: boolean;
  insuranceProvider?: boolean;
  insuranceIssuedYear?: boolean;
  memberId?: boolean;
  consentToTreatment?: boolean;
}

