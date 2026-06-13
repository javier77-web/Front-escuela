import api from "../axiosConfig";

// Obtener una relación evaluación-alumno por id
export const getEvaluacionAlumnoPorId = (id) =>
    api.get(`/api/academica/evaluacionalumnos/${id}`);

// Crear relación evaluación-alumno
export const crearEvaluacionAlumno = (data) =>
    api.post("/api/academica/evaluacionalumnos/", data);

// Eliminar relación evaluación-alumno
export const eliminarEvaluacionAlumno = (id) =>
    api.delete(`/api/academica/evaluacionalumnos/${id}`);

// Listar alumnos de una evaluación
export const getPorEvaluacion = (id) =>
    api.get(`/api/academica/evaluacionalumnos/evaluacion/${id}`);

// Listar evaluaciones de un alumno
export const getPorAlumno = (firebaseuid) =>
    api.get(`/api/academica/evaluacionalumnos/alumno/${firebaseuid}`);

// Actualizar nota de un alumno en una evaluación
export const actualizarNota = (evaluacionId, firebaseuid, data) =>
    api.put(
        `/api/academica/evaluacionalumnos/${evaluacionId}/${firebaseuid}`,
        data
    );

// Obtener alumnos en riesgo por asignatura
export const getAlumnosEnRiesgo = (asignaturaId) =>
    api.get(
        `/api/academica/evaluacionalumnos/asignatura/${asignaturaId}/en-riesgo`
    );

// Obtener todas las notas de un alumno
export const getNotasAlumno = (firebaseuid) =>
    api.get(
        `/api/academica/evaluacionalumnos/alumno/${firebaseuid}/notas`
    );

// Obtener alumnos asociados a una evaluación
export const getAlumnosEvaluacion = (idEvaluacion) =>
    api.get(
        `/api/academica/evaluacionalumnos/evaluacion/${idEvaluacion}/alumnos`
    );