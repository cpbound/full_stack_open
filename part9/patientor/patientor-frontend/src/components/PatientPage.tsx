import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Card, CardContent } from "@mui/material";
import { Patient, Diagnosis, Entry } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import patientService from "../services/patients";

const genderIcon = (gender: string) => {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    default:
      return <TransgenderIcon />;
  }
};

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const handleAddEntry = async (entry: Omit<Entry, "id">) => {
    if (!patient) return;
    const newEntry = await patientService.addEntry(patient.id, entry);
    setPatient({ ...patient, entries: [...patient.entries, newEntry] });
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      setPatient(data);
    };
    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      setDiagnoses(data);
    };
    fetchDiagnoses();
  }, []);

  const getDiagnosisDesc = (code: string) => {
    const found = diagnoses.find(d => d.code === code);
    return found ? found.name : '';
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <Card style={ { margin: '1em', padding: '1em', background: '#e5ff0044' } }>
      <CardContent>
        <Typography variant="h5">
          {patient.name} {genderIcon(patient.gender)}
        </Typography>
        <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
        <Typography>SSN: {patient.ssn}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        <AddEntryForm onSubmit={handleAddEntry} />
        <Typography>Entries: {patient.entries.length}</Typography>
        <Typography variant="h6" style={{ marginTop: 20 }}><strong>Entries</strong></Typography>
        {patient.entries.length === 0 ? (
          <Typography>No entries</Typography>
        ) : (
          patient.entries.map(entry => (
            <Card key={entry.id} style={{ margin: '1em 0', background: '#dbdbdbff' }}>
              <CardContent>
                <Typography variant="subtitle1">{entry.date}</Typography>
                <Typography><em>{entry.description}</em></Typography>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                  <div>
                    <ul style={{ margin: '1em 0', paddingLeft: '3em' }}>
                      {entry.diagnosisCodes.map(code => (
                        <li key={code}>
                          {code} - {getDiagnosisDesc(code)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <EntryDetails entry={entry} />
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default PatientPage;
