import { useState } from "react";
import WorkoutTemplate from "../components/WorkoutTemplate";

function WorkoutHistory({setList, workoutLog, setWorkoutLog}) {

    const [templateLog, setTemplateLog] = useState([]);
    const [nameText, setNameText] = useState("");
    const [nameEdit, setNameEdit] = useState(null);

    const handleNameEdit = (workoutName, index) => {
        setNameEdit(index);
        setNameText(workoutName);
    };

    const editName = (indexToEdit) => {
        if (!nameText || nameText.trim === "") return;
        const newItems = workoutLog.map((workout, index) => {
            if (index === indexToEdit) {
                return {name: nameText, date: workout.date, exercises:workout.exercises};
            }
            else {
                return workout;
            }
        });
        setWorkoutLog(newItems);
        setNameText("");
        setNameEdit(null);
    };

    const saveTemplate = (workoutIndex) => {
        setTemplateLog(prev => [...prev, workoutLog[workoutIndex]]);
    };

    const deleteWorkout = (indexToDelete) => {
        const newItems = workoutLog.filter((_, index) => index !== indexToDelete);
        setWorkoutLog(newItems);
    };

    return (
        <div>
        <div className="card">
        <h2>Workout History</h2>
            <ul>
                {workoutLog.map((workout, index) => (
                    <li key={index}>
                         <span onClick={() => handleNameEdit(workout.name, index)}>                        
                            {index === nameEdit ?
                            <input 
                            value={nameText}
                            onChange={(e) => setNameText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    editName(index);
                                }
                                else if (e.key === "Escape") {
                                    setNameEdit(null);
                                    setNameText("");
                                }
                            }}
                            />
                            : <span><strong>{workout.name}</strong></span>}</span>
                        <br />
                        <strong>{workout.date}</strong>
                        <ul>
                            {workout.exercises.map((exercise, i) => (
                                <li key={i}>
                                {exercise.exerciseName} - {exercise.sets.length} {exercise.sets.length === 1 ? "set" : "sets"}
                                </li>
                            ))}
                        </ul>
                        <button onClick = {() => deleteWorkout(index)}>❌</button>
                        <button onClick={() => saveTemplate(index)}>Save as template?</button>
                    </li>
                ))}
            </ul>
            </div>
            <div className="card">
            <div>
                <WorkoutTemplate
                    setList={setList}
                    templateLog={templateLog}
                    setTemplateLog={setTemplateLog}                 
                />
            </div>
            </div>
        </div>
    );
}

export default WorkoutHistory;