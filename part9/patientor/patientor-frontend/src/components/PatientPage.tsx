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
      </CardContent>
    </Card>
  );
};

export default PatientPage;
