import api from "../axiosConfig";

// todos los usuarios
export const getUsuarios = () => api.get("/api/usuarios/usuarios");

// usuario por UID (lo usa AuthContext para obtener el perfil)
export const getUsuarioPorUid = (uid) =>
  api.get(`/api/usuarios/usuarios/${uid}`);

// Pcrear usuario (admin crea con rol asignado)
export const createUsuario = (data) => api.post("/api/usuarios/usuarios", data);

//Metodo personalizado alumnos de un curso
export const getUsuariosPorCurso = (cursoId) => api.get(`/api/usuarios/usuarios/curso/${cursoId}`);

// actualizar usuario
export const updateUsuario = (uid, data) =>
  api.put(`/api/usuarios/usuarios/${uid}`, data);

// eliminar usuario
export const deleteUsuario = (uid) =>
  api.delete(`/api/usuarios/usuarios/${uid}`);
