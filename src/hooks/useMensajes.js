import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../auth/AuthContext";
import {
  getMensajesPorEmisor,
  getMensajesPorReceptor,
  enviarMensaje,
} from "../api/gestionUsuario/mensajesService";
import { getUsuarios } from "../api/gestionUsuario/usuariosApi";

function useMensajes() {
  const { user, perfil } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [vista, setVista] = useState("recibidos");
  const [form, setForm] = useState({ receptorUid: "", contenido: "" });
  const [formError, setFormError] = useState("");
  const [formExito, setFormExito] = useState(false);

  // Todos los usuarios para el selector de destinatario
  const { data: usuarios = [] } = useQuery({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const { data } = await getUsuarios();
      return Array.isArray(data) ? data : [];
    },
    enabled: !!user,
    staleTime: 10 * 60 * 1000,
  });

  // Mensajes recibidos
  const { data: recibidos = [], isPending: loadingRecibidos } = useQuery({
    queryKey: ["mensajes-recibidos", user?.uid],
    queryFn: async () => {
      const { data } = await getMensajesPorReceptor(user.uid);
      return Array.isArray(data) ? data : [];
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
  });

  // Mensajes enviados
  const { data: enviados = [], isPending: loadingEnviados } = useQuery({
    queryKey: ["mensajes-enviados", user?.uid],
    queryFn: async () => {
      const { data } = await getMensajesPorEmisor(user.uid);
      return Array.isArray(data) ? data : [];
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
  });

  // Mutación para enviar mensaje
  const { mutate: enviar, isPending: enviando } = useMutation({
    mutationFn: (payload) => enviarMensaje(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mensajes-enviados", user?.uid] });
      setForm({ receptorUid: "", contenido: "" });
      setFormError("");
      setFormExito(true);
      setTimeout(() => setFormExito(false), 3000);
    },
    onError: () => {
      setFormError("No se pudo enviar el mensaje. Intenta nuevamente.");
    },
  });

  const handleEnviar = () => {
    setFormError("");
    if (!form.receptorUid) {
      setFormError("Debes seleccionar un destinatario.");
      return;
    }
    if (!form.contenido.trim()) {
      setFormError("El mensaje no puede estar vacío.");
      return;
    }
    if (form.contenido.trim().length > 255) {
      setFormError("El mensaje no puede superar los 255 caracteres.");
      return;
    }
    enviar({
      contenido: form.contenido.trim(),
      usuario: { firebaseuid: user.uid },
      receptorUid: form.receptorUid,
    });
  };

  const getNombreUsuario = (uid) => {
    const u = usuarios.find((u) => u.firebaseuid === uid);
    return u ? `${u.nombre} ${u.apellido}` : uid;
  };

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const d = new Date(fechaStr);
    return d.toLocaleString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const destinatarios = usuarios.filter((u) => u.firebaseuid !== user?.uid);
  const loading = loadingRecibidos || loadingEnviados;

  return {
    vista,
    setVista,
    recibidos,
    enviados,
    loading,
    form,
    setForm,
    formError,
    formExito,
    enviando,
    handleEnviar,
    getNombreUsuario,
    formatFecha,
    destinatarios,
    perfil,
  };
}

export default useMensajes;
