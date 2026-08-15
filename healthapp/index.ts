import express from "express";
const app = express();
import { calculateBmi, type BmiArguments } from "./bmiCalculator.ts";

interface BmiResponse {
  weight: number;
  height: number;
  bmi: string;
}

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  const numHeight = Number(height);
  const numWeight = Number(weight);
  if (isNaN(numHeight) || isNaN(numWeight)) {
    return res.status(400).json({ error: "malformatted input" });
  }
  const values: BmiArguments = { height: numHeight, weight: numWeight };
  const evaluation = calculateBmi(values);
  const responseValues: BmiResponse = {
    weight: numWeight,
    height: numHeight,
    bmi: evaluation,
  };
  return res.status(200).json(responseValues);
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
