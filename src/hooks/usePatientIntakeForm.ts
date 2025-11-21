import { useState, useCallback } from 'react';
import type {
  PatientFormData,
  PatientFormErrors,
  PatientFormTouched,
} from '../types/patient';
import { submitPatientData } from '../utils/api';

const initialValues: PatientFormData = {
  patientName: '',
  emergencyContactName: '',
  age: '',
  gender: '',
  bloodGroup: '',
  phone: '',
  emergencyContactPhone: '',
  email: '',
  symptoms: '',
  existingConditions: [],
  insuranceProvider: '',
  insuranceIssuedYear: '',
  memberId: '',
  consentToTreatment: false,
};

const validateForm = (values: PatientFormData): PatientFormErrors => {
  const errors: PatientFormErrors = {};

  // Patient name validation
  if (!values.patientName.trim()) {
    errors.patientName = 'Patient name is required';
  } else if (values.patientName.trim().length < 2) {
    errors.patientName = 'Patient name must be at least 2 characters';
  }

  // Emergency contact name validation
  if (!values.emergencyContactName.trim()) {
    errors.emergencyContactName = 'Emergency contact name is required';
  } else if (values.emergencyContactName.trim().length < 2) {
    errors.emergencyContactName = 'Emergency contact name must be at least 2 characters';
  }

  // Age validation
  if (!values.age.trim()) {
    errors.age = 'Age is required';
  } else {
    const ageNum = parseInt(values.age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
      errors.age = 'Age must be a number between 1 and 150';
    }
  }

  // Gender validation
  if (!values.gender) {
    errors.gender = 'Gender is required';
  }

  // Blood group validation
  if (!values.bloodGroup) {
    errors.bloodGroup = 'Blood group is required';
  }

  // Phone validation
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(values.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  // Emergency contact phone validation
  if (!values.emergencyContactPhone.trim()) {
    errors.emergencyContactPhone = 'Emergency contact phone is required';
  } else {
    // Remove all non-digit characters and check if exactly 10 digits
    const digitsOnly = values.emergencyContactPhone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      errors.emergencyContactPhone = 'Emergency contact phone must be exactly 10 digits';
    }
  }

  // Email validation
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
  }

  // Symptoms validation
  if (!values.symptoms.trim()) {
    errors.symptoms = 'Symptoms description is required';
  } else if (values.symptoms.trim().length < 10) {
    errors.symptoms = 'Symptoms description must be at least 10 characters';
  }

  // Insurance provider validation
  if (!values.insuranceProvider.trim()) {
    errors.insuranceProvider = 'Insurance provider is required';
  }

  // Insurance issued year validation
  if (!values.insuranceIssuedYear) {
    errors.insuranceIssuedYear = 'Insurance issued year is required';
  } else {
    const year = parseInt(values.insuranceIssuedYear, 10);
    if (isNaN(year) || year < 1930 || year > 2025) {
      errors.insuranceIssuedYear = 'Insurance issued year must be between 1930 and 2025';
    }
  }

  // Member ID validation
  if (!values.memberId.trim()) {
    errors.memberId = 'Member ID is required';
  }

  // Consent validation
  if (!values.consentToTreatment) {
    errors.consentToTreatment = 'You must consent to treatment to proceed';
  }

  return errors;
};

export interface UsePatientIntakeFormReturn {
  values: PatientFormData;
  errors: PatientFormErrors;
  touched: PatientFormTouched;
  isSubmitting: boolean;
  handleChange: (field: keyof PatientFormData, value: string | string[] | boolean) => void;
  handleBlur: (field: keyof PatientFormData) => void;
  handleSubmit: (onSuccess: () => void) => Promise<void>;
  resetForm: () => void;
}

export const usePatientIntakeForm = (): UsePatientIntakeFormReturn => {
  const [values, setValues] = useState<PatientFormData>(initialValues);
  const [errors, setErrors] = useState<PatientFormErrors>({});
  const [touched, setTouched] = useState<PatientFormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (field: keyof PatientFormData, value: string | string[] | boolean) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback((field: keyof PatientFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate the field on blur
    setValues((currentValues) => {
      const fieldErrors = validateForm(currentValues);
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      return currentValues;
    });
  }, []);

  const handleSubmit = useCallback(
    async (onSuccess: () => void) => {
      // Mark all fields as touched
      const allTouched: PatientFormTouched = {
        patientName: true,
        emergencyContactName: true,
        age: true,
        gender: true,
        bloodGroup: true,
        phone: true,
        emergencyContactPhone: true,
        email: true,
        symptoms: true,
        existingConditions: true,
        insuranceProvider: true,
        insuranceIssuedYear: true,
        memberId: true,
        consentToTreatment: true,
      };
      setTouched(allTouched);

      // Validate form
      const formErrors = validateForm(values);
      setErrors(formErrors);

      // Check if there are any errors
      if (Object.keys(formErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);

      try {
        // Convert form data to API format
        const patientData = {
          patientName: values.patientName.trim(),
          emergencyContactName: values.emergencyContactName.trim(),
          age: parseInt(values.age, 10),
          gender: values.gender,
          bloodGroup: values.bloodGroup,
          phone: values.phone.trim(),
          emergencyContactPhone: values.emergencyContactPhone.replace(/\D/g, ''),
          email: values.email.trim(),
          symptoms: values.symptoms.trim(),
          existingConditions: values.existingConditions,
          insuranceProvider: values.insuranceProvider.trim(),
          insuranceIssuedYear: values.insuranceIssuedYear,
          memberId: values.memberId.trim(),
          consentToTreatment: values.consentToTreatment,
        };

        const response = await submitPatientData(patientData);

        if (response.success) {
          onSuccess();
          // Reset form after successful submission
          setValues(initialValues);
          setTouched({});
          setErrors({});
        } else {
          // Handle API error
          setErrors({
            _submit: response.message || 'Failed to submit form. Please try again.',
          } as PatientFormErrors);
        }
      } catch (error) {
        setErrors({
          _submit: error instanceof Error ? error.message : 'An unexpected error occurred',
        } as PatientFormErrors);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};

