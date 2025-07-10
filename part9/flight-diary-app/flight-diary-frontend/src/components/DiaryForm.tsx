import React, { useState } from "react";
import type { NewDiaryEntry, DiaryEntry } from "../types";
import { createDiary } from "../services/diaryService";

const DiaryForm = ({ onAdd }: { onAdd: (entry: DiaryEntry) => void }) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("sunny");
  const [visibility, setVisibility] = useState("great");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: NewDiaryEntry = { date, weather, visibility, comment };
    try {
      const added = await createDiary(newEntry);
      onAdd(added); // add it to state
      setComment("");
    } catch (e) {
      console.error("Failed to create diary:", e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        Weather:
        <select value={weather} onChange={(e) => setWeather(e.target.value)}>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="windy">Windy</option>
        </select>
      </div>
      <div>
        Visibility:
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="great">Great</option>
          <option value="good">Good</option>
          <option value="ok">OK</option>
          <option value="poor">Poor</option>
        </select>
      </div>
      <div>
        Comment: <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <button type="submit">Add diary</button>
    </form>
  );
};

export default DiaryForm;
