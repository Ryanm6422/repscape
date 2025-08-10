import {useState} from "react";

function WorkoutTemplate({setList, templateLog, setTemplateLog}) {

    const [nameText, setNameText] = useState("");
    const [nameEdit, setNameEdit] = useState(null);

    const handleNameEdit = (workoutName, index) => {
        setNameEdit(index);
        setNameText(workoutName);
    };

    const editName = (indexToEdit) => {
        if (!nameText || nameText.trim === "") return;
        const newItems = templateLog.map((workout, index) => {
            if (index === indexToEdit) {
                return {name: nameText, date: workout.date, exercises:workout.exercises};
            }
            else {
                return workout;
            }
        });
        setTemplateLog(newItems);
        setNameText("");
        setNameEdit(null);
    };

    const deleteTemplate = (indexToDelete) => {
        const newItems = templateLog.filter((_, index) => index !== indexToDelete);
        setTemplateLog(newItems);
    };

    const applyTemplate = (index) => {
        const exercises = templateLog[index]?.exercises ?? [];
        setList(exercises.map(e => ({...e, reps: [...e.reps]})));
    };

    return (
        <div>
        <h2>Workout Templates</h2>
            <ul>
                {templateLog.map((workout, index) => (
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
                            }}
                            />
                            : <span><strong>{workout.name}</strong></span>}</span>
                        <br />
                        <strong>{workout.date}</strong>
                        <ul>
                            {workout.exercises.map((exercise, i) => (
                                <li key={i}>
                                    {exercise.exerciseName} - {exercise.reps.length} {exercise.reps.length === 1 ? "set" : "sets"}
                                </li>
                            ))}
                        </ul>
                        <button onClick = {() => deleteTemplate(index)}>❌</button>
                        <button onClick = {() => applyTemplate(index)}>Use Template</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default WorkoutTemplate;