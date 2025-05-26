const calculateBmi = (height: number, weight: number): string => {
  const heightFix = height / 100;
  const bmi = weight / (heightFix * heightFix);
  if (bmi < 18.5) {
    return ("Underweight: ");
  } else if (bmi < 25 && bmi >= 18.5) {
    return "Normal range";
  } else {
    return "Overweight";
  }
};

console.log(calculateBmi(180, 74))
