import { CardContent, Typography } from "@mui/material";
import { Entry, HealthCheckRating } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HealthCheckIcon = ({ rating }: { rating: HealthCheckRating }) => {
  const colors = ["green", "yellow", "orange", "red"];
  return <MedicalServicesIcon style={{ color: colors[rating] }} />;
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <CardContent>
          <Typography variant="subtitle2"><MedicalServicesIcon /> Health Check</Typography>
          <Typography>Rating: <HealthCheckIcon rating={entry.healthCheckRating} /></Typography>
        </CardContent>
      );
    case "Hospital":
      return (
        <CardContent>
          <Typography variant="subtitle2"><LocalHospitalIcon /> Hospital</Typography>
          <Typography>Discharge: {entry.discharge.date} ({entry.discharge.criteria})</Typography>
        </CardContent>
      );
    case "OccupationalHealthcare":
      return (
        <CardContent>
          <Typography variant="subtitle2"><WorkIcon /> Occupational Healthcare</Typography>
          <Typography>Employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography>
          )}
        </CardContent>
      );
    default:
      // exhaustive type checking
      throw new Error(`Unhandled entry type: ${JSON.stringify(entry)}`);
  }
};

export default EntryDetails;
