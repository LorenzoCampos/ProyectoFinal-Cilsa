import React, { useState } from "react";
import axios from "axios"; // Importar Axios
import "./App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiClient from './api/apiClient';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar datos al backend usando Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/register", formData);

      // Redirige al login con un mensaje de éxito
      navigate("/login", {
        state: { successMessage: "Usuario registrado correctamente" },
      });
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.error || "Error al registrar usuario";
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="register-bg container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="register-form border border-secondary rounded-4">
        <form onSubmit={handleSubmit} className="p-5">
          <h1 className="text-center mb-4">¡Regístrate!</h1>
          <h4 className="fs-5 mb-4">Y disfruta del administrador de tareas</h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-floating mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <br />
          <button className="btn btn-success w-100">Registrarse</button>
          <br />
          <div className="d-flex gap-1 mt-3">
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login" className="text-decoration-none">
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
