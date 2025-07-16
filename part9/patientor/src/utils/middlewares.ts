import { Request, Response, NextFunction } from "express";
import { NewPatientSchema, BaseEntrySchema, HealthCheckEntrySchema, HospitalEntrySchema, OccupationalHealthcareEntrySchema, EntrySchema } from "./utils";
import { Diagnosis, Entry } from "../types";
import { z } from "zod";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newEntryParser = (
  req: Request<unknown, unknown, Entry>,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    BaseEntrySchema.parse(req.body);
    console.log(req.body);

    switch (req.body.type) {
      case 'HealthCheck':
        HealthCheckEntrySchema.parse(req.body);
        break;

      case 'Hospital':
        HospitalEntrySchema.parse(req.body);
        break;

      case 'OccupationalHealthcare':
        OccupationalHealthcareEntrySchema.parse(req.body);
        break;

      default:
        EntrySchema.parse(req.body);
        break;
    }

    next();
  } catch (error) {
    next(error);
  }
};
