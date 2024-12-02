# Proyecto Final - CILSA

Este proyecto está compuesto por una aplicación **ToDo List** dividida en dos partes principales:

- **Front-end**: Construido con React y Vite, enfocado en la experiencia del usuario para la gestión de tareas.
- **Back-end**: Construido con Express.js y SQLite, encargado de manejar la lógica de negocio y la persistencia de datos.

## Estructura del Proyecto

```
ProyectoFinal-Cilsa/
├── front-end/
│   ├── ...
├── back-end/
│   ├── ...
```

---

## Front-end: ToDo List App

### Descripción

Aplicación que permite a los usuarios registrar cuentas, iniciar sesión y gestionar una lista de tareas. Ofrece una interfaz intuitiva y responsiva para facilitar el manejo de tareas.

---

### Características principales

- **Autenticación**: Registro e inicio de sesión.
- **Gestión de tareas**: Crear, editar, completar y eliminar tareas.
- **Interfaz responsiva**: Adaptada para diferentes dispositivos.

---

### Estructura del proyecto

```
front-end/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── Login.jsx
│   ├── LoginForm.jsx
│   ├── main.jsx
│   ├── Navbar.jsx
│   ├── Register.jsx
│   ├── RegisterForm.jsx
│   ├── TaskManager.jsx
│   ├── Todo-form.jsx
├── .gitignore
├── package.json
├── README.md
├── vite.config.js
```

---

### Configuración inicial

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LorenzoCampos/ProyectoFinal-Cilsa.git
   cd ProyectoFinal-Cilsa/front-end
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

### Tecnologías utilizadas

- **React**, **Vite**, **Axios**, **React Router**
- **CSS puro**, **Bootstrap**

---

### API

Interactúa con la API alojada en `https://proyectofinal-cilsa.onrender.com`. Asegúrate de que esté activa para habilitar la funcionalidad.

---

## Back-end: ToDo List API

### Descripción

API RESTful que permite registrar usuarios, autenticar sesiones y gestionar tareas. Utiliza JWT para autenticación y SQLite como base de datos.

---

### Estructura del proyecto

```
back-end/
├── controllers/
│   ├── authController.js
│   ├── taskController.js
├── models/
│   ├── userModel.js
│   ├── taskModel.js
│   ├── tokenModel.js
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
├── .gitignore
├── database.sqlite
├── index.js
├── database.js
├── middleware.js
├── package.json
├── README.md
```

---

### Configuración inicial

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LorenzoCampos/ProyectoFinal-Cilsa.git
   cd ProyectoFinal-Cilsa/back-end
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicializa la base de datos:
   ```bash
   node index.js
   ```

---

### Dependencias principales

- **bcryptjs**, **jsonwebtoken**, **sequelize**, **sqlite3**
- **Express**, **body-parser**, **cors**

---

### Rutas

#### **Autenticación**

- `POST /register`: Registra un nuevo usuario.
- `POST /login`: Inicia sesión y genera un token.
- `POST /logout`: Cierra sesión eliminando el token.

#### **Gestión de tareas**

- `POST /tasks`: Crea una nueva tarea.
- `GET /tasks`: Obtiene todas las tareas del usuario autenticado.
- `PUT /tasks/:id`: Actualiza una tarea existente.
- `DELETE /tasks/:id`: Elimina una tarea.

---

## Cómo ejecutar el proyecto completo

1. Instala dependencias tanto en el front como en el back.
2. Inicia el servidor backend:
   ```bash
   cd ProyectoFinal-Cilsa/back-end
   npm start
   ```
3. Inicia el servidor frontend:
   ```bash
   cd ProyectoFinal-Cilsa/front-end
   npm run dev
   ```

---

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).