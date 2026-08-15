export interface BmiArguments {
  height: number;
  weight: number;
}

export const calculateBmi = (input: BmiArguments): string => {
  const height = input.height;
  const weight = input.weight;
  const meterConversion = height / 100;
  const calculation = weight / (meterConversion ^ 2);
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

const ParseBmiArgs = (args: string[]): BmiArguments => {
  if (args.length > 4) throw new Error("Too many arguments");
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Input is incorrect");
  }
};
if (process.argv[1] === import.meta.filename) {
  try {
    const input = ParseBmiArgs(process.argv);
    console.log(calculateBmi(input));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("unexpected error occurred", { cause: error });
    }
  }
}
