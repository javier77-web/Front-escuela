import api from "./axiosConfig";

// GET historial de mensajes enviados por un usuario
export const getMensajesPorEmisor = (firebaseuid) =>
  api.get(`/api/usuarios/mensajes/emisor/${firebaseuid}`);

// POST enviar un mensaje
// data { contenido, fecha_envio, usuario: { firebaseuid } }
export const enviarMensaje = (data) => api.post("/api/usuarios/mensajes", data);
