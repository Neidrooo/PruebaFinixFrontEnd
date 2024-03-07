# Gestión de Bancos - Cliente React

Este proyecto es una interfaz de usuario desarrollada con React que interactúa con una API REST de gestión de bancos desarrollada en .NET 7. Permite a los usuarios autenticarse, visualizar una lista de bancos, así como editar o eliminar registros bancarios.

## Características Principales

- **Autenticación de Usuarios**: Inicio de sesión seguro que almacena un token JWT para futuras solicitudes a la API.
- **Visualización de Bancos**: Muestra una tabla con todos los bancos disponibles en la base de datos.
- **Agregar, Edición y Eliminación de Bancos**: Permite a los usuarios agregar un nuevo banco, modificar la información de un banco o eliminarlo completamente.
- **Visualizar datos del usuario**: Permite a los usuarios visualizar sus datos, haciendo click en el icono de usuario en la parte superior derecha.

## Tecnologías Utilizadas

- React
- Vite
- Styled Components para el diseño de la UI.
- fetch para las solicitudes HTTP.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- `assets`: Contiene imágenes y otros recursos estáticos usados en la UI.
- `components`: Componentes reutilizables de React, incluyendo un Header y varios componentes estilizados.
- `context`: Contexto de React para manejar el estado global relacionado con la autenticación de usuarios.
- `pages`: Componentes que representan las páginas de la aplicación, incluyendo Login, Lista de Formularios, y Formulario de edición.
- `services`: Servicios para interactuar con la API REST, incluyendo autenticación y operaciones CRUD sobre bancos.

## Instalación y Ejecución

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

```bash
git clone https://github.com/Neidrooo/PruebaFinixFrontEnd.git
cd [nombre del proyecto]
npm install
npm run dev
```
