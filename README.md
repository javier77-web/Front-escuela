# 🚀 Sistema de Gestión Académica (Frontend)

Este es el frontend de una plataforma educativa modular construida con React y Vite. El sistema está diseñado para proporcionar una interfaz de usuario intuitiva para usuarios (profesores/alumnos/administradores), integrando Firebase para la autenticación y conectándose a un backend en Spring Boot para la gestión de datos académicos.

## 🛠️ Tecnologías Utilizadas

- **Lenguaje**: JavaScript (ES6+)
- **Framework**: React 19.2.4
- **Bundler**: Vite
- **Enrutamiento**: React Router DOM 7.14.1
- **Autenticación**: Firebase Authentication
- **HTTP Client**: Axios 1.16.0
- **Animaciones**: Framer Motion 12.38.0
- **Estilos**: CSS Vanilla con Bootstrap 5.3.8
- **Linter**: ESLint

## 🏗️ Arquitectura del Proyecto

El frontend sigue una arquitectura modular organizada por roles y componentes reutilizables:

- **Páginas Públicas**: Home, Nuestro Colegio, Noticias, Contacto, Login
- **Páginas Privadas**: Paneles específicos para Alumno, Profesor y Admin
- **Componentes**: Organizados en Atomic Design (Atoms, Molecules, Organisms, Sections)
- **Hooks Personalizados**: Para gestión de estado local y lógica reutilizable
- **Layouts**: MainLayout para públicas, PanelLayout para privadas
- **Autenticación**: AuthContext con integración Firebase y backend

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js instalado (versión 16 o superior)
- npm o yarn
- Un proyecto en Firebase con Authentication activo
- Backend corriendo en http://localhost:8081 (o la URL configurada)

### Pasos para Ejecutar

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/javier77-web/front-escuela.git
   cd front-escuela
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```


3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en http://localhost:5173.

4. **Construir para producción**:
   ```bash
   npm run build
   npm run preview
   ```

## 📱 Características Principales

### Para Todos los Usuarios
- **Home**: Página de bienvenida con información institucional
- **Nuestro Colegio**: Descripción y valores del colegio
- **Noticias**: Información actualizada del colegio
- **Contacto**: Formulario para consultas

### Para Alumnos
- **Dashboard Personal**: Resumen de cursos, notas y asistencia
- **Cursos**: Lista de asignaturas inscritas
- **Notas**: Visualización de calificaciones por asignatura
- **Asistencia**: Historial de presencia/ausencia
- **Anotaciones**: Registro de comentarios positivos/negativos

### Para Profesores
- **Dashboard Docente**: Estadísticas de cursos y estudiantes
- **Gestión de Cursos**: Asignaturas a cargo
- **Marcar Asistencia**: Registro diario de presencia
- **Ingresar Notas**: Calificaciones por estudiante
- **Crear Anotaciones**: Comentarios sobre rendimiento
- **Evaluaciones**: Gestión de pruebas y trabajos

### Para Administradores
- **Dashboard Administrativo**: Estadísticas globales
- **Gestión de Usuarios**: Crear y administrar cuentas
- **Reportes**: Análisis de asistencia, notas y cursos

## 🛡️ Decisiones de Diseño (Roadmap Técnico)

- **Atomic Design**: Componentes organizados en átomos, moléculas y organismos para máxima reutilización y mantenibilidad.
- **Autenticación Híbrida**: Firebase para login + backend para perfiles, permitiendo sincronización segura de datos.
- **Instancia Firebase Secundaria**: Para creación de usuarios sin afectar la sesión del admin actual.
- **Validación Frontend**: Hooks personalizados para validación de formularios antes del envío.
- **Estado Local vs Global**: React Context para autenticación global, hooks useState para estado local.
- **Responsive Design**: CSS vanilla con media queries para adaptabilidad móvil/desktop.
- **Simulación de Datos**: Hooks con datos mockeados hasta integración completa con backend.

## 📂 Estructura del Proyecto

```
src/
├── api/                 # Configuración Axios y servicios API
├── auth/                # Contexto de autenticación
├── components/          # Componentes reutilizables
│   ├── atoms/          # Componentes básicos (Botón, Input, etc.)
│   ├── molecules/      # Combinaciones (Cards, Rows, etc.)
│   ├── organisms/      # Grandes (Navbar, Sidebar, etc.)
│   └── sections/       # Secciones de página
├── firebaseConfig/     # Configuración Firebase
├── gateway/            # Servicios de sincronización
├── hooks/              # Hooks personalizados
├── layouts/            # Layouts de página
├── pages/              # Páginas principales
├── routes/             # Configuración de rutas
├── store/              # Estado global (preparado para Redux)
└── styles/             # Estilos CSS organizados
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
