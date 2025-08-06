function WorkoutHistory({ workoutLog, setWorkoutLog }) {

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
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutHistory;