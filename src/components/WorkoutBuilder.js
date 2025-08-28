import React from "react";
import { useState } from "react";

function WorkoutBuilder({ list, setList }) {
    const [exerciseID, setExerciseID] = useState();
    const [exerciseText, setExerciseText] = useState("");
    const [repText, setRepText] = useState("");
    const [thisExerciseIndex, setThisExerciseIndex] = useState(null);
    const [exerciseEdit, setExerciseEdit] = useState(null);
    const [repEdit, setRepEdit] = useState({exerciseIndex: null, repIndex: null, weightIndex: null});
    const [editText, setEditText] = useState("");
    const [repEditText, setRepEditText] = useState("");
    const [weightText, setWeightText] = useState("");
    const [weightEdit, setWeightEdit] = useState({exerciseIndex: null, repIndex: null, weightIndex: null});
    const [weightEditText, setWeightEditText] = useState("");

    const handleText = (event) => {
        setExerciseText(event.target.value);
    };

    const handleExerciseEdit = (exercise, index) => {
        setExerciseEdit(index);
        setEditText(exercise);
    };

    const handleRepEdit = (rep, exerciseInd, setInd) => {
        setRepEdit({exerciseIndex: exerciseInd, setIndex: setInd});
        setRepEditText(rep);
    };

    const handleWeightEdit = (weight, exerciseInd, setInd) => {
        setWeightEdit({exerciseIndex: exerciseInd, setIndex: setInd});
        setWeightEditText(weight);
    };

    const addExercise = () => {
        if (!exerciseText || exerciseText.trim === "") return;
        setList([...list, {exerciseID: exerciseID, exerciseName: exerciseText, sets: []}]);
        setExerciseText("");
    };

    const addSet = () => {
        if (!repText || repText.trim() === "" || thisExerciseIndex === null || thisExerciseIndex >= list.length) return;
        if (!weightText || weightText.trim() === "" || thisExerciseIndex === null || thisExerciseIndex >= list.length) return;
        setList(prevList =>
            prevList.map((exercise, index) => {
                if (index === thisExerciseIndex) {
                    return { ...exercise, sets:[...exercise.sets, {reps: repText, weight: weightText}]};
                } else {
                    return exercise;
                }
            })
        );
        setRepText("");
        setWeightText("");
    };

    const deleteExercise = (indexToDelete) => {
        const newItems = list.filter((_, index) => index !== indexToDelete);
        setList(newItems);
    };

    const deleteSet = (indexToDelete, setIndexToDelete) => {
        const newItems = list.map((exercise, index) => {
            if (index === indexToDelete) {
                return { ...exercise, sets: exercise.sets.filter((_, setIndex) => setIndex !== setIndexToDelete)};
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
                return { exerciseName: editText, reps: exercise.reps, weight: exercise.weight};
            }
            else {
                return exercise;
            }
        });
        setList(newItems);
        setEditText("");
        setExerciseEdit(null);
    };

    const editReps = (indexToEdit, setIndexToEdit) => {
        if (!repEditText || repEditText.trim === "") return;
        const newItems = list.map((exercise, index) => {
            if (index === indexToEdit) {
                const newSetList = exercise.sets.map((set, setIndex) => {
                    if (setIndex === setIndexToEdit) {
                        return {reps: repEditText, weight: set.weight};
                    }
                    else {
                        return set;
                    }
                });
                return {...exercise, sets: newSetList};
            }
            else {
                return exercise;
            }
        });
        setList(newItems);
        setRepEditText("");
        setRepEdit({exerciseIndex: null, setIndex: null});
    };

    const editWeight = (indexToEdit, setIndexToEdit) => {
        if (!weightEditText || weightEditText.trim === "") return;
        const newItems = list.map((exercise, index) => {
            if (index === indexToEdit) {
                const newSetList = exercise.sets.map((set, setIndex) => {
                    if (setIndex === setIndexToEdit) {
                        return {reps: set.reps, weight: weightEditText};
                    }
                    else {
                        return set;
                    }
                });
                return {...exercise, sets: newSetList};
            }
            else {
                return exercise;
            }
        });
        setList(newItems);
        setWeightEditText("");
        setWeightEdit({exerciseIndex: null, setIndex: null});
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

            <h2>Insert Weight (lbs): </h2>
            <input 
                type="number"
                value={weightText}
                onChange={(e) => setWeightText(e.target.value)}
                placeholder="Enter text here"
            />
            <button onClick={addSet}>Add</button>

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
                            {exercise.sets.map((set, setIndex) => (
                                <li key={setIndex}> Set {setIndex + 1}: <ul><span onClick={() => handleRepEdit(set.reps, index, setIndex)}>                            
                                {setIndex === repEdit.setIndex && index === repEdit.exerciseIndex ?
                                <input
                                    type="number"
                                    value={repEditText}
                                    onChange={(e) => setRepEditText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            editReps(index, setIndex);
                                        }
                                        else if (e.key === "Escape") {
                                            setRepEdit({exerciseIndex: null, setIndex: null});
                                            setRepEditText("");
                                        }
                                    }}
                                    />
                                    : <span>{set.reps} {parseInt(set.reps) === 1 ? "rep" : "reps"}</span>}</span>
                                <br />
                                <span onClick={() => handleWeightEdit(set.weight, index, setIndex)}>                            
                                    {setIndex === weightEdit.setIndex && index === weightEdit.exerciseIndex ?
                                    <input
                                        type="number"
                                        value={weightEditText}
                                        onChange={(e) => setWeightEditText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                editWeight(index, setIndex);
                                            }
                                            else if (e.key === "Escape") {
                                                setWeightEdit({exerciseIndex: null, setIndex: null});
                                                setWeightEditText("");
                                            }
                                        }}
                                        />
                                        : <span>{set.weight} {parseInt(set.weight) === 1 ? "lb" : "lbs"}</span>}</span>
                                    <button onClick = {() => deleteSet(index, setIndex)}>❌</button></ul></li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutBuilder;