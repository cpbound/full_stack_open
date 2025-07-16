import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { errorMiddleware, newPatientParser } from "../utils/middlewares";
import { Patient, NewPatient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.get("/:id", (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    console.log(req.params);
    res.json(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

router.use(errorMiddleware);

export default router;
