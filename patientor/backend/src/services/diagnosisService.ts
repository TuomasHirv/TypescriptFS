import diagnosisData from "../../data/diagnoses.ts";

import type { diagnosis } from "../types.ts";

const diagnosisList: diagnosis[] = diagnosisData;

const getData = (): diagnosis[] => {
  return diagnosisList;
};

const addDiagnosis = () => {
  return null;
};

export default { getData, addDiagnosis };
