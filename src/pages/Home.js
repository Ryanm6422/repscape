import React, { useState } from "react";

function Home() {
    const [text, setText] = useState("");
    const [repText, setRepText] = useState("");
    const [list, setList] = useState([]);
    //const [repList, setRepList] = useState([]);


    const handleText = (event) => {
        setText(event.target.value);
    };

    /*const handleRepText = (event) => {
        setRepText(event.target.value);
    };*/

    const addToList = () => {
        if (text.trim === "") return;
        setList([...list, text]);
        setText("");
    };

    /*const addToRepList = () => {
        if (text.trim === "") return;
        setRepList([...repList, text]);
        setText("");
    };*/

    const deleteFromList = (indexToDelete) => {
        const newItems = list.filter((_, index) => index !== indexToDelete);
        setList(newItems);
    };

    /*const deleteFromRepList = (indexToDelete) => {
        const newItems = repList.filter((_, index) => index !== indexToDelete);
        setList(newItems);
    };*/

    return (
        <div>
            <h1>Welcome to SetWork!</h1>
            {/*{clicked ?
            <h1>You Added: {text}!</h1>
            : <h1>No Exercises</h1>}*/}
            <h2>Insert Exercise Name: </h2>
            <input 
                type="text"
                value={text}
                onChange={handleText}
                placeholder="Enter text here"
            />
            <button onClick={addToList}>Add</button>

            <ul>
                {list.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => deleteFromList(index)}>❌</button>
                        {/*<ul>
                            <h2>How many reps?: </h2>
                            <input
                                type="text"
                                value={repText}
                                onChange={handleRepText}
                                placeholder="Enter text here"
                            />
                            <button onClick={addToRepList}>Add</button>
                            {repList.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>*/}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;