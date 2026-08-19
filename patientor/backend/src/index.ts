import express from "express";
import cors from "cors";
const app = express();
import diaryRouter from "./routes/diagnosisRouter.ts";

app.use(express.json());

const PORT = 3001;

app.use(cors());

app.use("/api/diagnoses", diaryRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
