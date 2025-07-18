import { useState } from "react";
import { HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { Button, TextField, Typography, Alert, Card, CardContent } from "@mui/material";
import axios from "axios";

interface Props {
  onSubmit: (
    values: Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">
  ) => Promise<void>;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [type, setType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState("");
  // Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    // Validate fields by type
    if (type === "HealthCheck") {
      const rating = Number(healthCheckRating);
      if (isNaN(rating) || rating < 0 || rating > 3) {
        setError("HealthCheck Rating must be a number between 0 and 3.");
        setSubmitting(false);
        return;
      }
    }
    if (type === "Hospital") {
      if (!dischargeDate || !dischargeCriteria) {
        setError("Discharge date and criteria are required for Hospital entry.");
        setSubmitting(false);
        return;
      }
    }
    if (type === "OccupationalHealthcare") {
      if (!employerName) {
        setError("Employer name is required for Occupational Healthcare entry.");
        setSubmitting(false);
        return;
      }
    }
    try {
      let entry: Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id"> | undefined;
      if (type === "HealthCheck") {
        entry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes
            ? diagnosisCodes.split(",").map((c) => c.trim())
            : undefined,
          healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
        };
      } else if (type === "Hospital") {
        entry = {
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes
            ? diagnosisCodes.split(",").map((c) => c.trim())
            : undefined,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
      } else if (type === "OccupationalHealthcare") {
        entry = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes
            ? diagnosisCodes.split(",").map((c) => c.trim())
            : undefined,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        };
      } else {
        throw new Error("Invalid entry type");
      }
      await onSubmit(entry);
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes("");
      setHealthCheckRating("");
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.error) {
        setError(e.response.data.error);
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card style={{ margin: "1em", backgroundColor: "#f5f5f5" }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Add New Entry</Typography>
          <TextField
            select
            label="Entry Type"
            value={type}
            onChange={e => setType(e.target.value as "HealthCheck" | "Hospital" | "OccupationalHealthcare")}
            fullWidth
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="HealthCheck">HealthCheck</option>
            <option value="Hospital">Hospital</option>
            <option value="OccupationalHealthcare">OccupationalHealthcare</option>
          </TextField>
          {error && (
            <Alert severity="error">
              {typeof error === "string"
                ? error
                : typeof error === "object" && error !== null && "message" in error
                  ? (error as { message: string }).message
                  : JSON.stringify(error)}
            </Alert>
          )}
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Diagnosis Codes (comma separated)"
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value)}
            fullWidth
            margin="normal"
          />
          {type === "HealthCheck" && (
            <TextField
              label="HealthCheck Rating (0-3)"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          )}
          {type === "Hospital" && (
            <>
              <TextField
                label="Discharge Date"
                type="date"
                value={dischargeDate}
                onChange={e => setDischargeDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Discharge Criteria"
                value={dischargeCriteria}
                onChange={e => setDischargeCriteria(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </>
          )}
          {type === "OccupationalHealthcare" && (
            <>
              <TextField
                label="Employer Name"
                value={employerName}
                onChange={e => setEmployerName(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Sick Leave Start Date"
                type="date"
                value={sickLeaveStart}
                onChange={e => setSickLeaveStart(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Sick Leave End Date"
                type="date"
                value={sickLeaveEnd}
                onChange={e => setSickLeaveEnd(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
            style={{ marginTop: "1em" }}
          >
            Add Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEntryForm;
