import { CardContent, Typography } from "@mui/material";
import { Entry, HealthCheckRating } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const HealthCheckIcon = ({ rating }: { rating: HealthCheckRating }) => {
  const colors = ["green", "yellow", "orange", "red"];
  return <MedicalServicesIcon style={{ color: colors[rating] }} />;
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <CardContent>
          <hr />
          <Typography><MedicalServicesIcon /> Health Check</Typography>
          <Typography><strong>Rating:</strong> <HealthCheckIcon rating={entry.healthCheckRating} /></Typography>
          <Typography><strong>Specialist:</strong> {entry.specialist}</Typography>
        </CardContent>
      );
    case "Hospital":
      return (
        <CardContent>
          <hr />
          <Typography><LocationCityIcon /> Hospital</Typography>
          <Typography><strong>Discharge:</strong> {entry.discharge.date} ({entry.discharge.criteria})</Typography>
          <Typography><strong>Specialist:</strong> {entry.specialist}</Typography>
        </CardContent>
      );
    case "OccupationalHealthcare":
      return (
        <CardContent>
          <hr />
          <Typography><WorkIcon /> Occupational Healthcare</Typography>
          <Typography><strong>Employer:</strong> {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography><strong>Sick leave:</strong> {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography>
          )}
          <Typography><strong>Specialist:</strong> {entry.specialist}</Typography>
        </CardContent>
      );
    default:
      // exhaustive type checking
      throw new Error(`Unhandled entry type: ${JSON.stringify(entry)}`);
  }
};

export default EntryDetails;
