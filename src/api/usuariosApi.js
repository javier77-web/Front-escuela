import api from "./axiosConfig";

export const getUsuarios = () =>
    api.get("/api/usuarios/usuarios");

export const createUsuario = (data) =>
    api.post("/api/usuarios/usuarios", data);

export const deleteUsuario = (uid) =>
    api.delete(`/api/usuarios/usuarios/${uid}`);