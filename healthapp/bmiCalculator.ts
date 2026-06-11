const calculateBmi = (height: number, weight: number): string => {
  const meterConversion = height / 100;
  const calculation = weight / (meterConversion ^ 2);
  console.log(calculation);
  switch (true) {
    case calculation < 18.5:
      return "Underweight range";
    case calculation > 18.5 && calculation < 25:
      return "Normal range";
    case calculation >= 25 && calculation < 30:
      return "Overweight range";
    default:
      return "Obese range";
  }
};

console.log(calculateBmi(180, 74));
