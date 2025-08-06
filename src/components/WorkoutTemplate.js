function WorkoutTemplate() {

    const saveTemplate = () => {
        const parsedData = JSON.parse(localStorage.getItem("templateLog"));
        if (parsedData !== null) {
            setTemplateLog([...templateLog, {templateName: tempName, data: parsedData}]);
        }        
        const templateLogString = JSON.stringify(templateLog);
        localStorage.setItem("templateLog", templateLogString);
    };

    return (
        <div>
            <button onClick={() => {}}>Save as Template</button>
        </div>
    );

}

export default WorkoutTemplate;