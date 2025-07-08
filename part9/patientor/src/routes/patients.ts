import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (_req, res) => {
  try {
    const newPatient = toNewPatient(_req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

export default router;
