# ToDo List API

Esta es una API RESTful para una aplicación de lista de tareas (ToDo List), donde los usuarios pueden registrarse, iniciar sesión, crear, actualizar, obtener y eliminar tareas. Está construida con **Express.js** y **SQLite** como base de datos. La autenticación se maneja a través de **JWT** (JSON Web Tokens) y **bcryptjs** para el hashing de contraseñas.

## Características

- **Autenticación**: Registro de usuarios, inicio de sesión y cierre de sesión.
- **Gestión de tareas**: CRUD (Crear, Leer, Actualizar, Eliminar) de tareas para cada usuario.
- **Middleware de autenticación**: Protege las rutas de tareas para que solo usuarios autenticados puedan acceder.
- **Base de datos**: Utiliza **SQLite** como base de datos para almacenar usuarios, tareas y tokens válidos.

## Estructura del Proyecto

```plaintext
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

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/LorenzoCampos/ProyectoFinal-Cilsa.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd ProyectoFinal-Cilsa
   cd back-end
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Crea la base de datos y las tablas (el proyecto usará SQLite automáticamente):
   ```bash
   node index.js
   ```

   Esto iniciará el servidor y creará el archivo `database.sqlite` si aún no existe.

## Dependencias

- `bcryptjs`: Para el hashing de contraseñas.
- `body-parser`: Para analizar los cuerpos de las solicitudes HTTP.
- `cors`: Para habilitar el intercambio de recursos de origen cruzado.
- `express`: Framework web para Node.js.
- `jsonwebtoken`: Para la creación y verificación de tokens JWT.
- `sequelize`: ORM para interactuar con la base de datos SQLite.
- `sqlite3`: Driver SQLite para Node.js.

## Rutas

### **Autenticación**

- `POST /register`: Registra un nuevo usuario. Requiere `username` y `password`.
- `POST /login`: Inicia sesión y genera un token. Requiere `username` y `password`.
- `POST /logout`: Cierra sesión y elimina el token. Requiere un token en el encabezado `Authorization`.

### **Tareas**

- `POST /tasks`: Crea una nueva tarea. Requiere `title` (obligatorio) y `description` (opcional).
- `GET /tasks`: Obtiene todas las tareas del usuario autenticado.
- `PUT /tasks/:id`: Actualiza una tarea existente. Requiere `title`, `completed`, `description`.
- `DELETE /tasks/:id`: Elimina una tarea existente.

## Middleware de Autenticación

Para acceder a las rutas relacionadas con las tareas (`/tasks`), debes enviar un token válido en el encabezado `Authorization` de tus solicitudes. El token se genera al iniciar sesión.

## Ejecutando el Proyecto

1. Asegúrate de tener **Node.js** instalado.
2. Desde el directorio raíz de tu proyecto, ejecuta:
   ```bash
   npm start
   ```
   Esto iniciará el servidor en `http://localhost:3000`.

## Base de Datos

El proyecto utiliza **SQLite** como base de datos. La base de datos se gestiona automáticamente mediante **Sequelize** y se guarda en el archivo `database.sqlite`.

### Modelos

- **Usuario (`User`)**: Contiene `username` y `password`.
- **Tarea (`Task`)**: Contiene `title`, `description`, `completed` y una relación con un usuario (`UserId`).
- **Token (`Token`)**: Almacena los tokens JWT para la autenticación de los usuarios.

## Contribuciones

Si deseas contribuir a este proyecto, por favor haz un **fork**, crea una rama con tu característica o corrección, y luego abre un **pull request**.

## Licencia

Este proyecto está bajo la licencia **MIT**. Para más detalles, revisa el archivo `LICENSE`.