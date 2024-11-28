# ToDo List App

## Descripción

Esta aplicación es un administrador de tareas que permite a los usuarios registrarse, iniciar sesión, y gestionar una lista de tareas de forma eficiente. Los usuarios pueden agregar, editar, completar y eliminar tareas. Está desarrollada en **React** con **Vite** y utiliza una API externa para el backend.

---

## Características principales

- **Autenticación de usuarios**: Registro e inicio de sesión.
- **Gestión de tareas**: Crear, editar, completar y eliminar tareas.
- **Interfaz intuitiva**: Navegación amigable y diseño limpio.
- **Responsividad**: Diseñada para funcionar en diferentes dispositivos.

---

## Estructura del proyecto

```
front-end/
├── public/
│   ├── vite.svg
├── src/
│   ├── assets/
│   │   ├── react.svg
│   ├── App.css          # Estilos principales
│   ├── App.jsx          # Componente principal de la aplicación
│   ├── Login.jsx        # Página de inicio de sesión
│   ├── LoginForm.jsx    # Formulario de inicio de sesión
│   ├── main.jsx         # Punto de entrada
│   ├── Navbar.jsx       # Barra de navegación
│   ├── Register.jsx     # Página de registro
│   ├── RegisterForm.jsx # Formulario de registro
│   ├── TaskManager.jsx  # Página principal para la gestión de tareas
│   ├── Todo-form.jsx    # Componente para gestionar tareas
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

---

## Configuración inicial

### Requisitos

- Node.js (v16 o superior)
- npm o yarn

### Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/LorenzoCampos/ProyectoFinal-Cilsa.git
   ```

2. Accede al directorio del proyecto:
   ```bash
   cd ProyectoFinal-Cilsa
   cd front-end
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## Uso

### Páginas principales

- `/` : Página principal para gestionar tareas.
- `/register` : Página para crear una nueva cuenta.
- `/login` : Página para iniciar sesión.

### Funcionalidades

1. **Registro de usuario**: Llena el formulario de registro y crea tu cuenta.
2. **Inicio de sesión**: Ingresa tu usuario y contraseña para acceder.
3. **Gestión de tareas**:
   - Crear nuevas tareas.
   - Editar tareas existentes.
   - Marcar tareas como completadas.
   - Eliminar tareas.

---

## Tecnologías utilizadas

- **Frontend**:
  - React
  - Vite
  - Axios (para solicitudes HTTP)
  - React Router (para manejo de rutas)
- **Estilos**:
  - CSS puro
  - Bootstrap

---

## Personalización

Los estilos principales están definidos en `App.css`. Puedes modificarlos según las necesidades de tu proyecto.

---

## API

Esta aplicación interactúa con una API externa alojada en `https://proyectofinal-cilsa.onrender.com`. Asegúrate de que la API esté funcionando para que las funcionalidades de autenticación y tareas operen correctamente.

---

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).