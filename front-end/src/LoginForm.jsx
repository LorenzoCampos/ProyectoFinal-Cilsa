import React, { useState } from "react";
import "./App.css";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import apiClient from './api/apiClient';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || ""
  );

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/login", formData);

      const token = response.data.token;
      // guardar mensaje de seccess
      setSuccessMessage("Inicio de sesión exitoso");
      // Guardar el token en localStorage
      localStorage.setItem("authToken", token);

      // Redirigir al TaskManager
      window.location.href = "/";
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.error || "Error al iniciar sesión";
        setError(errorMessage);
        setSuccessMessage(""); // Borra el mensaje de éxito si ocurre un error
      }
    };
  };

  return (
    <div className="login-bg container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="login-form border border-secondary rounded-4">
        <form onSubmit={handleSubmit} className="p-5">
          <h1 className="text-center mb-4">¡Inicia sesión!</h1>
          <h4 className="fs-5 mb-4">Accede al administrador de tareas</h4>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

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
          <button className="btn btn-success w-100">Iniciar sesión</button>
          <br />
          <div className="d-flex gap-1 mt-3">
            <p>¿No tienes una cuenta?</p>
            <Link to="/register" className="text-decoration-none">
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
