import api from "./axiosConfig";

// GET todos los usuarios
// GET /api/usuarios/usuarios
export const getUsuarios = () => api.get("/api/usuarios/usuarios");

// GET usuario por UID (lo usa AuthContext para obtener el perfil)
// GET /api/usuarios/usuarios/:uid
export const getUsuarioPorUid = (uid) =>
  api.get(`/api/usuarios/usuarios/${uid}`);

// POST crear usuario (admin crea con rol asignado)
// POST /api/usuarios/usuarios
// data { firebaseuid, nombre, apellido, idRol }
export const createUsuario = (data) => api.post("/api/usuarios/usuarios", data);

// PUT actualizar usuario
// PUT /api/usuarios/usuarios/:uid
// data: { nombre, apellido, idRol }
export const updateUsuario = (uid, data) =>
  api.put(`/api/usuarios/usuarios/${uid}`, data);

// DELETE eliminar usuario
// DELETE /api/usuarios/usuarios/:uid
export const deleteUsuario = (uid) =>
  api.delete(`/api/usuarios/usuarios/${uid}`);
