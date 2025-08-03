import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkoutHistory from "./pages/WorkoutHistory";
import Workout from "./pages/Workout";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const firstRender = useRef(true);
  const [workoutLog, setWorkoutLog] = useState([]);

  useEffect (() => {
      const parsedData = JSON.parse(localStorage.getItem("workoutLog"));
      if (parsedData !== null) {
          setWorkoutLog(parsedData);
      }
  }, []);

  useEffect (() => {
      if (firstRender.current) {
          firstRender.current = false;
          return;
      }
      const workoutLogString = JSON.stringify(workoutLog);
      localStorage.setItem("workoutLog", workoutLogString);
  }, [workoutLog]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Workout workoutLog={workoutLog} setWorkoutLog={setWorkoutLog}/>} />
        <Route path="/history" element={<WorkoutHistory workoutLog={workoutLog} setWorkoutLog={setWorkoutLog}/>} />
      </Routes>
    </Router>
  );
}

export default App;
