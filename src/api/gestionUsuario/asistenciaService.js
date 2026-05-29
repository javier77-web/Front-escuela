import api from "../axiosConfig";

//Ajusté los endpoint, no coincidian con el back

export const getAsistenciasPorUsuario = (firebaseuid) =>
  api.get(`/api/usuarios/asistencias/usuario/${firebaseuid}`);

export const getAsistenciasPorUsuarioYAsignatura = (firebaseuid, idAsignatura) =>
  api.get(`/api/usuarios/asistencias/usuario/${firebaseuid}/asignatura/${idAsignatura}`);

export const getAsistenciasPorAsignaturaYFecha = (idAsignatura, fecha) =>
  api.get(`/api/usuarios/asistencias/asignatura/${idAsignatura}/fecha/${fecha}`);

export const registrarAsistencia = (data) =>
  api.post("/api/usuarios/asistencias", data);

export const eliminarAsistencia = (id) =>
  api.delete(`/api/usuarios/asistencias/${id}`);