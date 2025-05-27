interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (
    !isNaN(Number(args[2])) &&
    !isNaN(Number(args[3])) &&
    args[2] !== "" &&
    args[3] !== ""
  ) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const heightFix = height / 100;
  const bmi = weight / (heightFix * heightFix);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25 && bmi >= 18.5) {
    return "Normal range";
  } else {
    return "Overweight";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
