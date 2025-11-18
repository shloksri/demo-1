import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const app = express();
const PORT = 3001;
const DB_PATH = join(process.cwd(), 'patientDB.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize patientDB.json if it doesn't exist
if (!existsSync(DB_PATH)) {
  const initialData = { patients: [] };
  writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
}

// POST endpoint to save patient data
app.post('/api/patients', (req: Request, res: Response) => {
  try {
    // Read existing data
    const existingData = existsSync(DB_PATH)
      ? JSON.parse(readFileSync(DB_PATH, 'utf-8'))
      : { patients: [] };

    // Add new patient with timestamp
    const newPatient = {
      ...req.body,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };

    existingData.patients.push(newPatient);

    // Write back to file
    writeFileSync(DB_PATH, JSON.stringify(existingData, null, 2), 'utf-8');

    res.status(201).json({
      success: true,
      message: 'Patient data saved successfully',
      patient: newPatient,
    });
  } catch (error) {
    console.error('Error saving patient data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save patient data',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET endpoint to retrieve all patients (optional, for testing)
app.get('/api/patients', (req: Request, res: Response) => {
  try {
    const data = existsSync(DB_PATH)
      ? JSON.parse(readFileSync(DB_PATH, 'utf-8'))
      : { patients: [] };
    res.json(data);
  } catch (error) {
    console.error('Error reading patient data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to read patient data',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

