import React, { useState } from "react";
import axios from "axios";
import type { NewDiaryEntry, DiaryEntry, Weather, Visibility } from "../types";
import { createDiary } from "../services/diaryService";

const DiaryForm = ({ onAdd }: { onAdd: (entry: DiaryEntry) => void }) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: NewDiaryEntry = { date, weather, visibility, comment };

    try {
      const added = await createDiary(newEntry);
      onAdd(added);
      setComment("");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data && typeof e.response.data === "object" && "error" in e.response.data) {
          setError((e.response.data as { error: string }).error);
        } else {
          setError("Unrecognized server error");
        }
      } else {
        setError("Something went wrong submitting the form.");
      }
    }
  };

  return (
    <div>
      <h2><em>Add New Diary Entry</em></h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          Date: <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div>
          Weather:
          {(["sunny", "rainy", "cloudy", "stormy", "windy"] as Weather[]).map(w => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          Visibility:
          {(["great", "good", "ok", "poor"] as Visibility[]).map(v => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          Comment: <input value={comment} onChange={e => setComment(e.target.value)} />
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default DiaryForm;
