import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { errorMiddleware, newPatientParser, newEntryParser } from "../utils/middlewares";
import { Patient, NewPatient, Entry, EntryWithoutId } from "../types";

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

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Entry | string>,
  ): void => {
    const patient = patientService.getPatientById(req.params.id);

    if (patient) {
      const newEntry = patientService.addEntry(patient, req.body);

      res.status(201).json(newEntry);
    } else {
      res.sendStatus(404).send('No found patient');
    }
  },
);

router.use(errorMiddleware);

export default router;
