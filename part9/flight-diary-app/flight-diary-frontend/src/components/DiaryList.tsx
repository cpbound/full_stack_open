import type { DiaryEntry } from "../types";

const DiaryList = ({ entries }: { entries: DiaryEntry[] }) => {

  return (
    <div>
      <h2><em>Flight Diaries</em></h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p><strong>Date:</strong> {entry.date}</p>
          <p><strong>Weather:</strong> {entry.weather}</p>
          <p><strong>Visibility:</strong> {entry.visibility}</p>
          {entry.comment && <p><strong>Comment:</strong> {entry.comment}</p>}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
