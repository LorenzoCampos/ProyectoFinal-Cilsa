import { Link } from "react-router-dom";
import React from "react";
import apiClient from './api/apiClient';

const Navbar = () => {
  // Obtener la fecha actual
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const token = localStorage.getItem("authToken");

  // Manejar cerrar sesión
  const handleLogout = async () => {
    try {
      await apiClient.post('/logout');
      localStorage.removeItem('authToken');
      window.location.href = "/login";
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid">
        {/* Menú de la izquierda */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex justify-content-end align-items-center">
          <span className="navbar-text me-3">
            {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
          </span>
        </div>

        <div className="d-flex justify-content-start align-items-center">
          {token ? (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
