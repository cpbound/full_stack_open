export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// const getNonSensitivePatient = (patient: Patient): Omit<Patient, 'ssn'> => {
//   return {
//     id: patient.id,
//     name: patient.name,
//     dateOfBirth: patient.dateOfBirth,
//     gender: patient.gender,
//     occupation: patient.occupation
//   };
// };

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
