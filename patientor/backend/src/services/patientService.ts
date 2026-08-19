import patientData from "../../data/patients.ts";
import { v1 as uuid } from "uuid";

import type { patient, patientNoSSN, newPatient } from "../types.ts";

const patientsList: patient[] = patientData as patient[];

const getData = (): patientNoSSN[] => {
  const returnableList: patientNoSSN[] = patientsList.map((item) => {
    return {
      id: item.id,
      name: item.name,
      dateOfBirth: item.dateOfBirth,
      gender: item.gender,
      occupation: item.occupation,
    };
  });
  return returnableList;
};

const addPatient = (patient: newPatient) => {
  const newUuid: string = uuid();
  const addablePatient: patient = {
    id: newUuid,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender,
    occupation: patient.occupation,
  };
  patientsList.push(addablePatient);
  return;
};

export default { getData, addPatient };
