import React, { useState } from "react";
import WorkoutBuilder from "../components/WorkoutBuilder";
import WorkoutHistory from "../components/WorkoutHistory";
import { useEffect } from "react";
import { useRef } from "react";

function Workout() {
    const [list, setList] = useState([]);
    const firstRender = useRef(true);
    const [workoutLog, setWorkoutLog] = useState([]);
    const [workoutText, setWorkoutText] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);

    const handleText = (event) => {
        setWorkoutText(event.target.value);
    };

    const addWorkoutName = () => {
        const newWorkout = {
            name: workoutText,
            date: new Date().toLocaleString(),
            exercises: list
        };
        if (workoutText === "") {
            newWorkout.name = "Unnamed Workout";
        }
        setWorkoutLog(prev => [...prev, newWorkout]);
        setList([]);
        setWorkoutText("");
        setShowPopUp(false);
    };

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
            {showPopUp && (
            <div className="popup">
                <div className="popup-content">
                <p>Set Workout Name</p>
                <input 
                    type="text"
                    value={workoutText}
                    onChange={handleText}
                    placeholder="Enter text here"
                />
                <button onClick={addWorkoutName}>Add</button>
                <button onClick={() => setShowPopUp(false)}>Close</button>
                </div>
            </div>
            )}

            <h1>Welcome to RepScape!</h1>
            <WorkoutBuilder 
                list={list}
                setList={setList}
            />
            <button onClick = {() => {
                if (list.length === 0) return;
                setShowPopUp(true);
            }}>Finish Workout
            </button>
            <div>
                <WorkoutHistory
                    setList={setList}
                    workoutLog={workoutLog}
                    setWorkoutLog={setWorkoutLog}                 
                />
            </div>
        </div>
    );
}

export default Workout;