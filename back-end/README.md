# Todo List API

Una API backend para gestionar tareas (todo list) con autenticación de usuarios. Desarrollada con Node.js, Express y SQLite.

## Características

- **Autenticación JWT**: Registro, inicio de sesión, cierre de sesión.
- **Gestión de tareas**: Crear, leer, actualizar y eliminar tareas por usuario.
- **Base de datos SQLite**: Persistencia de datos.
- **Middleware de autenticación**: Verifica los tokens JWT en las rutas protegidas.

## Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v16 o superior
- [npm](https://www.npmjs.com/) (incluido con Node.js)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/todo-list-api.git
   cd todo-list-api
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y configura tus variables de entorno. Por ejemplo:

   ```plaintext
   SECRET_KEY=tu_clave_secreta
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

   El servidor estará corriendo en `http://localhost:3000`.

## Endpoints

### Autenticación

| Método | Endpoint       | Descripción            |
|--------|----------------|------------------------|
| POST   | `/register`    | Registro de usuario    |
| POST   | `/login`       | Inicio de sesión       |
| POST   | `/logout`      | Cierre de sesión       |

### Tareas

| Método | Endpoint          | Descripción                  |
|--------|-------------------|------------------------------|
| GET    | `/tasks`          | Listar tareas del usuario    |
| POST   | `/tasks`          | Crear una nueva tarea        |
| PUT    | `/tasks/:id`      | Actualizar una tarea         |
| DELETE | `/tasks/:id`      | Eliminar una tarea           |

## Estructura del proyecto

```
back-end/
├── controllers/
│   ├── authController.js
│   ├── taskController.js
├── middleware/
│   ├── authenticate.js
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
├── package.json
├── README.md
```

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para crear el servidor.
- **SQLite**: Base de datos ligera.
- **Sequelize**: ORM para interactuar con SQLite.
- **jsonwebtoken**: Para la autenticación mediante JWT.
- **bcryptjs**: Para el cifrado de contraseñas.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un *issue* o envía un *pull request*.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.