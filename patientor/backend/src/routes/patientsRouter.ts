import express, { type Response } from "express";
import { z } from "zod";
import { newPatientSchema, type patientNoSSN } from "../types.ts";

const router = express.Router();

import patientService from "../services/patientService.ts";
router.get("/", (_req, res: Response<patientNoSSN[]>) => {
  const data = patientService.getData();
  res.send(data);
});

router.post("/", (req, res) => {
  try {
    const patient = newPatientSchema.parse(req.body);
    const newPatient = patientService.addPatient(patient);
    res.status(200).json(newPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    }
    res.status(500).json(error);
  }
});

export default router;
