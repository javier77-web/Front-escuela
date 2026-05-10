import api from "./axiosConfig";

// GET asistencias de un alumno específico
// GET /api/usuarios/asistencias/usuario/:firebaseuid
export const getAsistenciasPorUsuario = (firebaseuid) =>
  api.get(`/api/usuarios/asistencias/usuario/${firebaseuid}`);

// GET asistencias de un día específico (lista diaria para el profesor)
// GET /api/usuarios/asistencias/fecha/:fecha
// fecha formato: "2025-05-09"
export const getAsistenciasPorFecha = (fecha) =>
  api.get(`/api/usuarios/asistencias/fecha/${fecha}`);

// POST registrar asistencia
// POST /api/usuarios/asistencias
// data { fecha, estado, usuario: { firebaseuid } }
export const registrarAsistencia = (data) =>
  api.post("/api/usuarios/asistencias", data);

// DELETE eliminar asistencia por id
// DELETE /api/usuarios/asistencias/:id
export const eliminarAsistencia = (id) =>
  api.delete(`/api/usuarios/asistencias/${id}`);
