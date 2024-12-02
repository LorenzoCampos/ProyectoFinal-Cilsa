import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import TaskManager from "./TaskManager"; // Administrador de tareas
import Register from "./Register"; // Componente de registro
import Login from "./Login";

const App = () => {
  const token = localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <TaskManager /> : <Navigate to="/login" replace />} />
        <Route path="/register" element={token ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;