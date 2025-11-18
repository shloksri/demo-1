import { Routes, Route, Navigate } from 'react-router-dom'
import { PatientIntakePage } from './pages/patient-intake/PatientIntakePage'

function App() {
  return (
    <Routes>
      <Route path="/patient-intake" element={<PatientIntakePage />} />
      <Route path="/" element={<Navigate to="/patient-intake" replace />} />
    </Routes>
  )
}

export default App
