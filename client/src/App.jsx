import Project from "./projects/Project";
import "./App.css";
import Dashboard from "./components/Dashboard";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex justify-between min-h-screen flex-col items-center">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {" "}
          <Route path="/projects/:id" element={<Project />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
