import axios from "axios";
import React, { useState, useEffect } from "react"; 
import "./App.css";

const Form = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTask, setEditTask] = useState(null);
    const [token, setToken] = useState("");

    // Obtener el token al cargar el componente
    useEffect(() => {
        const savedToken = localStorage.getItem("authToken");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // Obtener las tareas al cargar el componente
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("https://proyectofinal-cilsa-back-end.onrender.com/tasks", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data);
            } catch (error) {
                console.error("Error al obtener tareas:", error);
            }
        };

        if (token) fetchTasks();
    }, [token]);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editTask) {
            try {
                const response = await axios.put(
                    `https://proyectofinal-cilsa-back-end.onrender.com/tasks/${editTask.id}`,
                    { title: newTask },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTasks(
                    tasks.map((task) =>
                        task.id === editTask.id ? response.data : task
                    )
                );
                setNewTask(""); // Limpia el input
                setEditTask(null); // Resetea el modo de edición
            } catch (error) {
                console.error("Error al actualizar tarea:", error);
            }
        } else {
            try {
                const response = await axios.post(
                    "https://proyectofinal-cilsa-back-end.onrender.com/tasks",
                    { title: newTask },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTasks([...tasks, response.data]); // Agrega la nueva tarea al estado
                setNewTask(""); // Limpia el input
            } catch (error) {
                console.error("Error al agregar tarea:", error);
            }
        }
    };

    // Función para eliminar tarea
    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`https://proyectofinal-cilsa-back-end.onrender.com/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
        }
    };

    // Función para habilitar el modo de edición
    const handleEdit = (task) => {
        setEditTask(task);
        setNewTask(task.title); // Pre-cargar el título de la tarea en el input
    };

    // Función para marcar una tarea como completada
    const handleComplete = async (taskId) => {
        try {
            const task = tasks.find((task) => task.id === taskId);
            const updatedTask = await axios.put(
                `https://proyectofinal-cilsa-back-end.onrender.com/tasks/${taskId}`,
                { completed: !task.completed },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTasks(
                tasks.map((task) =>
                    task.id === taskId ? updatedTask.data : task
                )
            );
        } catch (error) {
            console.error("Error al marcar la tarea como completada:", error);
        }
    };

    // Función para formatear la fecha en formato dd/mm/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Separar las tareas completadas para mostrarlas al final
    const incompleteTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                <h1 className="text-center">Administrador de tareas</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group p-4">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Ingrese su tarea..."
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                required
                            />
                            <button className="btn btn-primary ms-2" type="submit">
                                {editTask ? "Actualizar" : "Agregar"}
                            </button>
                        </div>
                    </form>
                    <ul className="list-group mt-4">
                        {/* Renderiza tareas no completadas */}
                        {[...incompleteTasks, ...completedTasks].map((task) => (
                            <li
                                key={task.id}
                                className={`list-group-item d-flex justify-content-between align-items-center mb-3 ${
                                    task.completed ? "list-group-item-success" : ""
                                }`}
                            >
                                <div className="me-3">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleComplete(task.id)}
                                        className="me-2"
                                    />
                                    <strong>{task.title}</strong>
                                    <span className="ms-3 text-secondary">
                                    {formatDate(task.createdAt)}
                                </span>
                                </div>
                                <div className="ms-3">
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleEdit(task)}
                                    >
                                        Modificar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Form;
