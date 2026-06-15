import api from "../axiosConfig";

// GET historial de mensajes enviados por un usuario (emisor)
export const getMensajesPorEmisor = (firebaseuid) =>
  api.get(`/api/usuarios/mensajes/emisor/${firebaseuid}`);

// GET historial de mensajes recibidos por un usuario (receptor)
export const getMensajesPorReceptor = (firebaseuid) =>
  api.get(`/api/usuarios/mensajes/receptor/${firebaseuid}`);

// POST enviar un mensaje
// data: { contenido, usuario: { firebaseuid }, receptorUid }
export const enviarMensaje = (data) => api.post("/api/usuarios/mensajes", data);
