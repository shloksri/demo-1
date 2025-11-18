Tech Stack:
1. React + TypeScript for frontend
2. Mock json file for backend, for storing form data.
3. Use Vite for creating build
4. CSS: MUI v7 for design and styling
5. npm as package manager.


A small React app with:

1. Page: /patient-intake
2. Form fields:

- Patient name, age, gender
- Contact info: phone, email
- Symptoms description (textarea)
- Existing conditions (multi-select / checkboxes)
- Insurance provider & member ID
- Checkbox: “I consent to treatment”

3. Requirements:

- All fields validated (client-side)
- Accessible labels, errors, keyboard-friendly
- Reusable <TextField>, <SelectField>, <CheckboxGroup>, <FormError> components
- Error messages shown under fields

- Submit -> fake API call -> success toast --> store the data in a json file named patientDB.json

4. Folder structure

src/
  components/
    form/
      TextField.tsx
      SelectField.tsx
      CheckboxGroup.tsx
  pages/
    patient-intake/
      PatientIntakePage.tsx
  hooks/
    usePatientIntakeForm.ts
  types/
    patient.ts

5. Component rules

6. All components:

- Written in TypeScript
- Props interface named <ComponentName>Props
- Accessibility: label + aria-describedby for errors
- Functions in hooks/ start with useXxx and return typed objects.

7. Coding conventions

- Use camelCase for variables, PascalCase for components
- No inline any
- No untyped onChange handlers

8. Form rules

- Form validation schema in a separate file or hook
- Show error messages only after blur or submit
- Disable submit button while submitting
