import express from "express";
const app = express();
app.use(express.json());
import { calculateBmi, type BmiArguments } from "./bmiCalculator.ts";
import {
  calculateExercises,
  type parsedArguments,
} from "./excersizeCalculator.ts";
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
    return res.status(400).json({ error: "malformatted parameters" });
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
const isNumber = (value: unknown): value is number =>
  typeof value === "number" && !isNaN(value);

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every(isNumber);

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises: unknown;
    target: unknown;
  };
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }
  if (!isNumber(target) || !isNumberArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const args: parsedArguments = {
    period: daily_exercises,
    target: target,
  };
  const evaluation = calculateExercises(args);
  return res.status(200).json(evaluation);
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
