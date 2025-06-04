import React, { useState } from "react";

function Home() {
    const [exerciseText, setExerciseText] = useState("");
    const [repText, setRepText] = useState("");
    const [list, setList] = useState([]);
    const [thisExerciseIndex, setThisExerciseIndex] = useState(null);
    const [exerciseEdit, setExerciseEdit] = useState(null);
    const [repEdit, setRepEdit] = useState(null);
    const [editText, setEditText] = useState("");


    const handleText = (event) => {
        setExerciseText(event.target.value);
    };

    const handleExerciseEdit = (exercise, index) => {
        setExerciseEdit(index);
        setEditText(exercise);
    };

    const handleRepEdit = (rep, repIndex) => {
        setRepEdit(repIndex);
        setEditText(rep);
    };

    const addToList = () => {
        if (!exerciseText || exerciseText.trim === "") return;
        setList([...list, {exerciseName: exerciseText, reps: []}]);
        setExerciseText("");
    };

    const addRep = () => {
        if (!repText || repText.trim === "" || thisExerciseIndex === null || thisExerciseIndex >= list.length) return;
        setList(prevList =>
            prevList.map((exercise, index) => {
                console.log("Before updating reps: ", prevList);
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

    return (
        <div>
            <h1>Welcome to SetWork!</h1>
            {/*{clicked ?
            <h1>You Added: {text}!</h1>
            : <h1>No Exercises</h1>}*/}
            <h2>Insert Exercise Name: </h2>
            <input 
                type="text"
                value={exerciseText}
                onChange={handleText}
                placeholder="Enter text here"
            />
            <button onClick={addToList}>Add</button>
            <h2>Insert Reps: </h2>
            <input 
                type="text"
                value={repText}
                onChange={(e) => setRepText(e.target.value)}
                placeholder="Enter text here"
            />
            
            <button onClick={addRep}>Add</button>

            <ul>
                {console.log("Rendering list: ", list)}
                {list.map((exercise, index) => (
                    <li key={index}>
                        <span onClick={() => handleExerciseEdit(exercise.exerciseName, index)}>                        
                            {index === exerciseEdit ?
                            <input 
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            />
                            : <span>{exercise.exerciseName}</span>}</span>
                        <button onClick={() => deleteExercise(index)}>❌</button>
                        <button onClick = {() => setThisExerciseIndex(index)}>Select</button>
                        <ul>
                            {exercise.reps.map((rep, repIndex) => (
                                <li key={repIndex}> Set {repIndex + 1}: <span onClick={() => handleRepEdit(rep, repIndex)}>                            
                                {repIndex === repEdit ?
                                <input 
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    />
                                    : <span>{rep} rep(s)</span>}</span>
                                <button onClick = {() => deleteRep(index, repIndex)}>❌</button></li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;