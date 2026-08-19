import express from "express";

const router = express.Router();
import diagnosisService from "../services/diagnosisService.ts";

router.get("/", (_req, res) => {
  const data = diagnosisService.getData();
  res.send(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
