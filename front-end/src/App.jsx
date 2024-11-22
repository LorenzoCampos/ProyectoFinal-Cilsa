import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./TaskManager"; // Administrador de tareas
import Register from "./Register"; // Componente de registro

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskManager />} /> {/* Página principal */}
        <Route path="/register" element={<Register />} /> {/* Registro */}
      </Routes>
    </Router>
  );
};

export default App;