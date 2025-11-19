import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { TextField } from '../../components/form/TextField';
import { SelectField } from '../../components/form/SelectField';
import { CheckboxGroup } from '../../components/form/CheckboxGroup';
import { usePatientIntakeForm } from '../../hooks/usePatientIntakeForm';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

const bloodGroupOptions = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
  { value: 'Other', label: 'Other' },
];

const existingConditionsOptions = [
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'heart-disease', label: 'Heart Disease' },
  { value: 'asthma', label: 'Asthma' },
  { value: 'arthritis', label: 'Arthritis' },
  { value: 'none', label: 'None' },
];

export const PatientIntakePage = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = usePatientIntakeForm();

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const onSubmit = async () => {
    await handleSubmit(() => {
      setShowSuccessToast(true);
    });
  };

  const showError = (field: keyof typeof touched) => {
    return touched[field] || isSubmitting;
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient Intake Form
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Please fill out all required fields to complete your patient intake.
        </Typography>

        <Box component="form" noValidate>
          {/* Patient Name */}
          <TextField
            id="patientName"
            label="Patient Name"
            value={values.patientName}
            onChange={(e) => handleChange('patientName', e.target.value)}
            onBlur={() => handleBlur('patientName')}
            error={errors.patientName}
            touched={touched.patientName}
            showError={showError('patientName')}
            required
            autoComplete="name"
          />

          {/* Emergency Contact Name */}
          <TextField
            id="emergencyContactName"
            label="Emergency Contact Name"
            value={values.emergencyContactName}
            onChange={(e) => handleChange('emergencyContactName', e.target.value)}
            onBlur={() => handleBlur('emergencyContactName')}
            error={errors.emergencyContactName}
            touched={touched.emergencyContactName}
            showError={showError('emergencyContactName')}
            required
            autoComplete="name"
          />

          {/* Age */}
          <TextField
            id="age"
            label="Age"
            type="number"
            value={values.age}
            onChange={(e) => handleChange('age', e.target.value)}
            onBlur={() => handleBlur('age')}
            error={errors.age}
            touched={touched.age}
            showError={showError('age')}
            required
            inputProps={{ min: 1, max: 150 }}
          />

          {/* Blood Group */}
          <SelectField
            id="bloodGroup"
            label="Blood Group"
            value={values.bloodGroup}
            onChange={(value) => handleChange('bloodGroup', value)}
            onBlur={() => handleBlur('bloodGroup')}
            options={bloodGroupOptions}
            error={errors.bloodGroup}
            touched={touched.bloodGroup}
            showError={showError('bloodGroup')}
            required
          />

          {/* Gender */}
          <SelectField
            id="gender"
            label="Gender"
            value={values.gender}
            onChange={(value) => handleChange('gender', value)}
            onBlur={() => handleBlur('gender')}
            options={genderOptions}
            error={errors.gender}
            touched={touched.gender}
            showError={showError('gender')}
            required
          />

          {/* Phone */}
          <TextField
            id="phone"
            label="Phone Number"
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            error={errors.phone}
            touched={touched.phone}
            showError={showError('phone')}
            required
            autoComplete="tel"
          />

          {/* Email */}
          <TextField
            id="email"
            label="Email Address"
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            showError={showError('email')}
            required
            autoComplete="email"
          />

          {/* Symptoms */}
          <TextField
            id="symptoms"
            label="Symptoms Description"
            value={values.symptoms}
            onChange={(e) => handleChange('symptoms', e.target.value)}
            onBlur={() => handleBlur('symptoms')}
            error={errors.symptoms}
            touched={touched.symptoms}
            showError={showError('symptoms')}
            required
            multiline
            rows={4}
            placeholder="Please describe your symptoms in detail..."
          />

          {/* Existing Conditions */}
          <CheckboxGroup
            id="existingConditions"
            label="Existing Conditions (Select all that apply)"
            options={existingConditionsOptions}
            values={values.existingConditions}
            onChange={(values) => handleChange('existingConditions', values)}
            onBlur={() => handleBlur('existingConditions')}
            error={errors.existingConditions}
            touched={touched.existingConditions}
            showError={showError('existingConditions')}
          />

          {/* Insurance Provider */}
          <TextField
            id="insuranceProvider"
            label="Insurance Provider"
            value={values.insuranceProvider}
            onChange={(e) => handleChange('insuranceProvider', e.target.value)}
            onBlur={() => handleBlur('insuranceProvider')}
            error={errors.insuranceProvider}
            touched={touched.insuranceProvider}
            showError={showError('insuranceProvider')}
            required
          />

          {/* Member ID */}
          <TextField
            id="memberId"
            label="Member ID"
            value={values.memberId}
            onChange={(e) => handleChange('memberId', e.target.value)}
            onBlur={() => handleBlur('memberId')}
            error={errors.memberId}
            touched={touched.memberId}
            showError={showError('memberId')}
            required
          />

          {/* Consent Checkbox */}
          <Box sx={{ mt: 2, mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.consentToTreatment}
                  onChange={(e) =>
                    handleChange('consentToTreatment', e.target.checked)
                  }
                  onBlur={() => handleBlur('consentToTreatment')}
                  id="consentToTreatment"
                />
              }
              label="I consent to treatment"
            />
            {showError('consentToTreatment') && errors.consentToTreatment && (
              <Typography variant="caption" color="error" sx={{ ml: 2, display: 'block' }}>
                {errors.consentToTreatment}
              </Typography>
            )}
          </Box>

          {/* Submit Button */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={onSubmit}
              disabled={isSubmitting}
              sx={{ minWidth: 120 }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Success Toast */}
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={6000}
        onClose={() => setShowSuccessToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccessToast(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Patient intake form submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

