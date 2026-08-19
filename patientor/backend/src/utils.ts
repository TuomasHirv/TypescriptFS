import { type newPatient, Gender } from "./types.ts";

const isString = (text: unknown): text is string =>
  typeof text === "string" || text instanceof String;

const isGender = (param: string): param is Gender =>
  Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);

const parseString = (text: unknown, field: string): string => {
  if (!isString(text)) {
    throw new Error(`${field} isn't a string`);
  }
  return text;
};

const parseGender = (text: unknown, field: string): Gender => {
  if (!isString(text)) {
    throw new Error(`${field} isn't a string`);
  }
  if (!isGender(text)) {
    throw new Error(`${field} isn't a preset gender`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseNewPatient = (object: unknown): newPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const reqPatient: newPatient = {
      name: parseString(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, "ssn"),
      gender: parseGender(object.gender, "gender"),
      occupation: parseString(object.occupation, "occupation"),
    };
    return reqPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default parseNewPatient;
