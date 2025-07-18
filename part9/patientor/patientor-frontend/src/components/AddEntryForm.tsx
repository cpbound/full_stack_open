import { useState } from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { Button, TextField, Typography, Alert } from "@mui/material";
import axios from "axios";

interface Props {
  onSubmit: (values: Omit<HealthCheckEntry, "id">) => Promise<void>;
}

// Type guard for error objects
function hasMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const rating = Number(healthCheckRating);
    if (isNaN(rating) || rating < 0 || rating > 3) {
      setError("HealthCheck Rating must be a number between 0 and 3.");
      setSubmitting(false);
      return;
    }
    try {
      const entry: Omit<HealthCheckEntry, "id"> = {
        type: "HealthCheck",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes
          ? diagnosisCodes.split(",").map((c) => c.trim())
          : undefined,
        healthCheckRating: rating as HealthCheckRating,
      };
      await onSubmit(entry);
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes("");
      setHealthCheckRating("");
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
    <form onSubmit={handleSubmit} style={{ margin: "1em 0" }}>
      <Typography variant="h6">Add New HealthCheck Entry</Typography>
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
      <TextField
        label="HealthCheck Rating (0-3)"
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
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
  );
};

export default AddEntryForm;
