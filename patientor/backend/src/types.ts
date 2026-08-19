export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
export interface diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export interface patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type newPatient = Omit<patient, "id">;

// I found that without: ssn?: never; TypeScript doesn't warn me if I return patient type instead
// Something about patient being a subtype of patientNoSSN so I added it here I think its smart.
export interface patientNoSSN {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: never;
  gender: Gender;
  occupation: string;
}
