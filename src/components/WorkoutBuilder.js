import React from "react";
import { useState } from "react";

function WorkoutBuilder({ list, setList }) {
    const [exerciseText, setExerciseText] = useState("");
    const [repText, setRepText] = useState("");
    const [thisExerciseIndex, setThisExerciseIndex] = useState(null);
    const [exerciseEdit, setExerciseEdit] = useState(null);
    const [repEdit, setRepEdit] = useState({exerciseIndex: null, repIndex: null});
    const [editText, setEditText] = useState("");
    const [repEditText, setRepEditText] = useState("");

    const handleText = (event) => {
        setExerciseText(event.target.value);
    };

    const handleExerciseEdit = (exercise, index) => {
        setExerciseEdit(index);
        setEditText(exercise);
    };

    const handleRepEdit = (rep, exerciseInd, repInd) => {
        setRepEdit({exerciseIndex: exerciseInd, repIndex: repInd});
        setRepEditText(rep);
    };

    const addExercise = () => {
        if (!exerciseText || exerciseText.trim === "") return;
        setList([...list, {exerciseName: exerciseText, reps: []}]);
        setExerciseText("");
    };

    const addRep = () => {
        if (!repText || repText.trim === "" || thisExerciseIndex === null || thisExerciseIndex >= list.length) return;
        setList(prevList =>
            prevList.map((exercise, index) => {
                if (index === thisExerciseIndex) {
                    return { ...exercise, reps:[...exercise.reps, repText]};
                } else {
                    return exercise;
                }
            })
        );
        setRepText("");
    };

    const deleteExercise = (indexToDelete) => {
        const newItems = list.filter((_, index) => index !== indexToDelete);
        setList(newItems);
    };

    const deleteRep = (indexToDelete, repIndexToDelete) => {
        const newItems = list.map((exercise, index) => {
            if (index === indexToDelete) {
                return { ...exercise, reps: exercise.reps.filter((_, repIndex) => repIndex !== repIndexToDelete)};
            }
            else {
                return exercise;
            }
        })
        setList(newItems);
    };

    const editExercise = (indexToEdit) => {
        if (!editText || editText.trim === "") return;
        const newItems = list.map((exercise, index) => {
            if (index === indexToEdit) {
                return { exerciseName: editText, reps: exercise.reps};
            }
            else {
                return exercise;
            }
        });
        setList(newItems);
        setEditText("");
        setExerciseEdit(null);
    };

    const editReps = (indexToEdit, repIndexToEdit) => {
        if (!repEditText || repEditText.trim === "") return;
        const newItems = list.map((exercise, index) => {
            if (index === indexToEdit) {
                const newRepList = exercise.reps.map((rep, repIndex) => {
                    if (repIndex === repIndexToEdit) {
                        return repEditText;
                    }
                    else {
                        return rep;
                    }
                });
                return {...exercise, reps: newRepList};
            }
            else {
                return exercise;
            }
        });
        setList(newItems);
        setRepEditText("");
        setRepEdit({exerciseIndex: null, repIndex: null});
    };

    return (
        <div>
            <h2>Insert Exercise Name: </h2>
            <input 
                type="text"
                value={exerciseText}
                onChange={handleText}
                placeholder="Enter text here"
            />
            <button onClick={addExercise}>Add</button>
            <h2>Insert Reps: </h2>
            <input 
                type="number"
                value={repText}
                onChange={(e) => setRepText(e.target.value)}
                placeholder="Enter text here"
            />
            
            <button onClick={addRep}>Add</button>

            <ul>
                {list.map((exercise, index) => (
                    <li key={index}>
                        <span onClick={() => handleExerciseEdit(exercise.exerciseName, index)}>                        
                            {index === exerciseEdit ?
                            <input 
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    editExercise(index);
                                }
                                else if (e.key === "Escape") {
                                    setExerciseEdit(null);
                                    setEditText("");
                                }
                            }}
                            />
                            : <span>{exercise.exerciseName}</span>}</span>
                        <button onClick={() => deleteExercise(index)}>❌</button>
                        <button onClick = {() => setThisExerciseIndex(index)}>Select</button>
                        <ul>
                            {exercise.reps.map((rep, repIndex) => (
                                <li key={repIndex}> Set {repIndex + 1}: <span onClick={() => handleRepEdit(rep, index, repIndex)}>                            
                                {repIndex === repEdit.repIndex && index === repEdit.exerciseIndex ?
                                <input
                                    type="number"
                                    value={repEditText}
                                    onChange={(e) => setRepEditText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            editReps(index, repIndex);
                                        }
                                        else if (e.key === "Escape") {
                                            setRepEdit({exerciseIndex: null, repIndex: null});
                                            setRepEditText("");
                                        }
                                    }}
                                    />
                                    : <span>{rep} {parseInt(rep) === 1 ? "rep" : "reps"}</span>}</span>
                                <button onClick = {() => deleteRep(index, repIndex)}>❌</button></li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutBuilder;