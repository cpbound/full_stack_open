import { useEffect, useState } from 'react'
import './styles/App.css'
import type { DiaryEntry } from './types'
import { getAllDiaries } from "./services/diaryService";
import DiaryList from './components/DiaryList'
import DiaryForm from './components/DiaryForm'

const App = () => {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(setDiaries);
  }, []);

  const addDiary = (entry: DiaryEntry) => {
    setDiaries(prev => [...prev, entry]);
  };

  return (
    <>
      <h1>Flight Diaries</h1>
      <DiaryForm onAdd={addDiary} />
      <DiaryList entries={diaries} />
    </>
  )
}

export default App
