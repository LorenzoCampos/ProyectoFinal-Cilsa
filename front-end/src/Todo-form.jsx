import axios from "axios";
import React, { useState, useEffect } from "react";

const Form = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
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
                const response = await axios.get(
                    "https://lkfc51ph-3000.brs.devtunnels.ms/tasks",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
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

        try {
            const response = await axios.post(
                "https://lkfc51ph-3000.brs.devtunnels.ms/tasks",
                { title: newTask },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks([...tasks, response.data]); // Agrega la nueva tarea al estado
            setNewTask(""); // Limpia el input
        } catch (error) {
            console.error("Error al agregar tarea:", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group p-4">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Ingrese su tarea.."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                            Agregar
                        </button>
                    </div>
                </form>
                <ul className="list-group mt-4">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`list-group-item ${
                                task.completed ? "list-group-item-success" : ""
                            }`}
                        >
                            {task.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Form;
