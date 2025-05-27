interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  targetHours: number;
  average: number;
}

const calculateExercises = (dailyExercises: number[], targetHours: number): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((day) => day > 0).length;
  const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= targetHours;
  let rating = 1;
  let ratingDescription = "";

  if (average >= targetHours) {
    rating = 3
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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
