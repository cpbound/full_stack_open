import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (good + bad + neutral === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given.</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {good + bad + neutral}</p>
      <p>
        Average: {(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
      </p>
      <p>Positive: {(good / (good + bad + neutral)) * 100}%</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
