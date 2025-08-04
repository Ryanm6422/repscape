import React, { useState } from "react";
import WorkoutBuilder from "../components/WorkoutBuilder";
import WorkoutHistory from "../components/WorkoutHistory";
import { useEffect } from "react";
import { useRef } from "react";

function Workout() {
    const [list, setList] = useState([]);
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
        <div>
            <h1>Welcome to RepScape!</h1>
            <WorkoutBuilder 
                list={list}
                setList={setList}
            />
            <button onClick = {() => {
                if (list.length === 0) return;
                const newWorkout = {
                    date: new Date().toLocaleString(),
                    exercises: list
                };
                setWorkoutLog(prev => [...prev, newWorkout]);
                setList([]);
            }}>Finish Workout
            </button>
            <div>
                <WorkoutHistory
                    workoutLog={workoutLog}
                    setWorkoutLog={setWorkoutLog}
                />
            </div>
        </div>
    );
}

export default Workout;