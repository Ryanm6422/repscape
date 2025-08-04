import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Workout from "./pages/Workout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Workout/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
