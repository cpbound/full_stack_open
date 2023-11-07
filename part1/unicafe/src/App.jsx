import { useState } from "react";

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
      <h1>Statistics</h1>
      <p>
        Good: {good} {good * 1}
      </p>
      <p>
        Neutral: {neutral} {good * 0}
      </p>
      <p>
        Bad: {bad} {bad * -1}
      </p>
      <p>All: {good + bad + neutral}</p>
      <p>Average: {good * 1 + good * 0 + bad * -1}</p>
      <p>Positive: {(good / (good + bad + neutral)) * 100}%</p>
    </div>
  );
};

export default App;
