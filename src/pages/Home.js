import React, { useState } from "react";

function Home() {
    const [clicked, setClick] = useState(false);

    function handleClick() {
        if (clicked)
            setClick(false);
        else
            setClick(true);
    }
    return (
        <div>
            {clicked ?
                <h1>Workout was Created</h1>
            : <h1>Create Workout</h1>}
            <h1>Welcome to RepScape</h1>
            <button onClick={handleClick}>Create Workout</button>
        </div>
    );
}

export default Home;