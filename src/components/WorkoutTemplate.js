function WorkoutTemplate({templateLog, setTemplateLog}) {

    const deleteTemplate = (indexToDelete) => {
        const newItems = templateLog.filter((_, index) => index !== indexToDelete);
        setTemplateLog(newItems);
    };

    return (
        <div>
        <h2>Workout Templates</h2>
            <ul>
                {templateLog.map((workout, index) => (
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
                        <button onClick = {() => deleteTemplate(index)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default WorkoutTemplate;