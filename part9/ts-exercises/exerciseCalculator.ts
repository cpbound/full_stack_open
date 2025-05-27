interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  targetHours: number;
  average: number;
}

interface ExerciseValues {
  dailyExercises: number[];
  targetHours: number;
}

const parseInput = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const dailyHoursInput = args.slice(2);
  const inputToNumber = dailyHoursInput.map(Number);

  if (inputToNumber.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }

  const targetHours = inputToNumber[inputToNumber.length - 1];
  const dailyExercises = inputToNumber.slice(0, -1);

  if (dailyExercises.length !== inputToNumber.length - 1) {
    throw new Error("Please provide daily exercise hours!");
  }

  return {
    dailyExercises,
    targetHours,
  };
};

const calculateExercises = (
  dailyExercises: number[],
  targetHours: number
): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((day) => day > 0).length;
  const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= targetHours;
  let rating = 1;
  let ratingDescription = "";

  if (average >= targetHours) {
    rating = 3;
    ratingDescription = "You hit your target hours!";
  } else if (average >= targetHours / 2) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You need to work harder! Don't give up!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    targetHours,
    average,
  };
};

try {
  const { dailyExercises, targetHours } = parseInput(process.argv);
  console.log(calculateExercises(dailyExercises, targetHours));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

console.log(calculateExercises);
