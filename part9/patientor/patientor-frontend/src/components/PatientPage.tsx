import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Card, CardContent } from "@mui/material";
import { Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { apiBaseUrl } from "../constants";

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

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      setPatient(data);
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {patient.name} {genderIcon(patient.gender)}
        </Typography>
        <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
        <Typography>SSN: {patient.ssn}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        <Typography>Entries: {patient.entries.length}</Typography>
        <Typography variant="h6" style={{ marginTop: 20 }}>Entries</Typography>
        {patient.entries.length === 0 ? (
          <Typography>No entries</Typography>
        ) : (
          patient.entries.map(entry => (
            <Card key={entry.id} style={{ margin: '1em 0', background: '#f9f9f9' }}>
              <CardContent>
                <Typography variant="subtitle1">{entry.date}</Typography>
                <Typography>{entry.description}</Typography>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                  <Typography>Diagnosis codes: {entry.diagnosisCodes.join(', ')}</Typography>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default PatientPage;
