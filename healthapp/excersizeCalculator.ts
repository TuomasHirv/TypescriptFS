interface ExcersizeValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface parsedArguments {
  period: number[];
  target: number;
}

const calculateExcersize = (periodOfTime: parsedArguments): ExcersizeValues => {
  const period = periodOfTime.period;
  const target = periodOfTime.target;

  const lengthOfTime = period.length;
  const daysTrained = period.filter((value) => value > 0).length;
  const all = period.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const averageTrained = all / lengthOfTime;
  const result = averageTrained >= target;
  const rating = getRating(averageTrained, target);
  const description = getDescription(rating);

  return {
    periodLength: lengthOfTime,
    trainingDays: daysTrained,
    success: result,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: averageTrained,
  };
};

const getRating = (average: number, target: number): number => {
  if (average < target) {
    return 1;
  }
  if (average - target < 1) {
    return 2;
  }
  return 3;
};

const getDescription = (rating: number): string => {
  switch (true) {
    case rating == 1:
      return "Target wasn't reached but don't let that stop you";
    case rating == 2:
      return "Well done target reached!";
    case rating == 3:
      return "Exceeding expectations fabulous!!";
  }
  throw new Error("Rating was incorrect");
};

const parseArguments = (args: string[]): parsedArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  let days: number[] = [];
  if (isNaN(Number(args[2]))) {
    throw new Error("Incorrect input all arguments should be numbers");
  }
  const target = Number(args[2]);
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Incorrect input all arguments should be numbers");
    }
    const current = Number(args[i]);
    days.push(current);
  }
  return {
    period: days,
    target: target,
  };
};

try {
  const parsedArgs = parseArguments(process.argv);
  console.log(calculateExcersize(parsedArgs));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("An unexpected error occurred");
  }
}
