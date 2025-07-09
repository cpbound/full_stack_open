import React, { useEffect, useState } from "react";
import { getAllDiaries } from "../services/diaries";
import type { DiaryEntry } from "../types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(setDiaries);
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      {diaries.map((entry) => (
        <div key={entry.id}>
          <p>Date: {entry.date}</p>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
          {entry.comment && <p>Comment: {entry.comment}</p>}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
