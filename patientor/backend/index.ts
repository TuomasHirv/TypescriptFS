import express from "express";
import cors from "cors";
const app = express();
import diaryRouter from "./src/routes/diagnosisRouter.ts";
import patientRouter from "./src/routes/patientsRouter.ts";

app.use(express.json());

const PORT = 3001;

app.use(cors());

app.use("/api/diagnoses", diaryRouter);
app.use("/api/patients", patientRouter);
app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
