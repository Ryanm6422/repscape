import { useState } from "react";
import WorkoutTemplate from "../components/WorkoutTemplate";

function WorkoutHistory({ workoutLog, setWorkoutLog}) {

    const [templateLog, setTemplateLog] = useState([]);

    const saveTemplate = (workoutIndex) => {
        setTemplateLog(prev => [...prev, workoutLog[workoutIndex]]);
    };

    const deleteWorkout = (indexToDelete) => {
        const newItems = workoutLog.filter((_, index) => index !== indexToDelete);
        setWorkoutLog(newItems);
    };

    return (
        <div>
        <h2>Workout History</h2>
            <ul>
                {workoutLog.map((workout, index) => (
                    <li key={index}>
                        <strong>{workout.name} <br />
                        {workout.date}</strong>
                        <ul>
                            {workout.exercises.map((exercise, i) => (
                                <li key={i}>
                                    {exercise.exerciseName} - {exercise.reps.length} {exercise.reps.length === 1 ? "set" : "sets"}
                                </li>
                            ))}
                        </ul>
                        <button onClick = {() => deleteWorkout(index)}>❌</button>
                        <button onClick={() => saveTemplate(index)}>Save as template?</button>
                    </li>
                ))}
            </ul>
            <div>
                <WorkoutTemplate
                    templateLog={templateLog}
                    setTemplateLog={setTemplateLog}                 
                />
            </div>
        </div>
    );
}

export default WorkoutHistory;