import express, { type Response } from "express";
import type { patientNoSSN } from "../types.ts";
const router = express.Router();

import patientService from "../services/patientService.ts";
import parseNewPatient from "../utils.ts";
router.get("/", (_req, res: Response<patientNoSSN[]>) => {
  const data = patientService.getData();
  res.send(data);
});

router.post("/", (req, res) => {
  try {
    const patient = parseNewPatient(req.body);
    patientService.addPatient(patient);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
