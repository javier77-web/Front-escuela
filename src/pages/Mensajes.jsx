import React from "react";
import "../styles/pages/mensajes.css";
import PanelLayout from "../layouts/PanelLayout";
import Titulo from "../components/atoms/Titulo";
import Texto from "../components/atoms/Texto";
import Boton from "../components/atoms/Boton";
import Spinner from "../components/atoms/Spinner";
import useMensajes from "../hooks/useMensajes";
import { useAuth } from "../hooks/useAuth";

function Mensajes() {
  const { perfil } = useAuth();
  const rol = perfil?.rol?.nombre ?? "alumno";

  const {
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
  } = useMensajes();

  const chars = form.contenido.length;

  if (loading) {
    return (
      <PanelLayout rol={rol}>
        <div className="mensajes-loading">
          <Spinner texto="Cargando mensajes..." />
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout rol={rol}>
      <div className="mensajes-container">

        {/* HEADER */}
        <div className="mensajes-header">
          <div>
            <Titulo level={1}>Mensajes</Titulo>
            <Texto color="muted">Comunicación interna del colegio</Texto>
          </div>
        </div>

        {/* TABS */}
        <div className="mensajes-tabs">
          <button
            className={`tab-btn ${vista === "recibidos" ? "active" : ""}`}
            onClick={() => setVista("recibidos")}
          >
            Recibidos
            {recibidos.length > 0 && (
              <span className="tab-badge">{recibidos.length}</span>
            )}
          </button>

          <button
            className={`tab-btn ${vista === "enviados" ? "active" : ""}`}
            onClick={() => setVista("enviados")}
          >
            Enviados
            {enviados.length > 0 && (
              <span className="tab-badge">{enviados.length}</span>
            )}
          </button>

          <button
            className={`tab-btn ${vista === "nuevo" ? "active" : ""}`}
            onClick={() => setVista("nuevo")}
          >
            + Nuevo mensaje
          </button>
        </div>

        {/* VISTA: RECIBIDOS */}
        {vista === "recibidos" && (
          <div className="mensajes-lista">
            {recibidos.length === 0 ? (
              <div className="mensajes-vacio">
                <div className="mensajes-vacio-icon">📭</div>
                <Titulo level={3}>Sin mensajes recibidos</Titulo>
                <Texto color="muted">Cuando alguien te escriba, aparecerá aquí.</Texto>
              </div>
            ) : (
              recibidos.map((m) => (
                <div key={m.id_mensaje} className="mensaje-card recibido">
                  <div className="mensaje-card-header">
                    <span className="mensaje-persona">
                      {getNombreUsuario(m.usuario?.firebaseuid ?? "")}
                      <span>remitente</span>
                    </span>
                    <span className="mensaje-fecha">{formatFecha(m.fecha_envio)}</span>
                  </div>
                  <p className="mensaje-contenido">{m.contenido}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* VISTA: ENVIADOS */}
        {vista === "enviados" && (
          <div className="mensajes-lista">
            {enviados.length === 0 ? (
              <div className="mensajes-vacio">
                <div className="mensajes-vacio-icon">📤</div>
                <Titulo level={3}>Sin mensajes enviados</Titulo>
                <Texto color="muted">Los mensajes que envíes aparecerán aquí.</Texto>
              </div>
            ) : (
              enviados.map((m) => (
                <div key={m.id_mensaje} className="mensaje-card enviado">
                  <div className="mensaje-card-header">
                    <span className="mensaje-persona">
                      Para: {getNombreUsuario(m.receptorUid)}
                      <span>Destinatario</span>
                    </span>
                    <span className="mensaje-fecha">{formatFecha(m.fecha_envio)}</span>
                  </div>
                  <p className="mensaje-contenido">{m.contenido}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* VISTA: NUEVO MENSAJE */}
        {vista === "nuevo" && (
          <div className="mensajes-form">
            <Titulo level={2}>Nuevo mensaje</Titulo>

            {/* Destinatario */}
            <div className="mensajes-form-campo">
              <label className="mensajes-form-label">Destinatario</label>
              <select
                className="mensajes-form-select"
                value={form.receptorUid}
                onChange={(e) => setForm({ ...form, receptorUid: e.target.value })}
              >
                <option value="">Selecciona al destinatario </option>
                {destinatarios.map((u) => (
                  <option key={u.firebaseuid} value={u.firebaseuid}>
                    {u.nombre} {u.apellido}
                    {u.rol?.nombre ? ` (${u.rol.nombre})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Contenido */}
            <div className="mensajes-form-campo">
              <label className="mensajes-form-label">Mensaje</label>
              <textarea
                className="mensajes-form-textarea"
                placeholder="Escribe tu mensaje aquí..."
                value={form.contenido}
                maxLength={255}
                onChange={(e) => setForm({ ...form, contenido: e.target.value })}
              />
              <span className={`mensajes-form-contador ${chars > 230 ? "alerta" : ""}`}>
                {chars} / 255
              </span>
            </div>

            {/* Feedback */}
            {formError && <div className="mensajes-error">⚠ {formError}</div>}
            {formExito && (
              <div className="mensajes-exito">
                ✓ Mensaje enviado correctamente.
              </div>
            )}

            {/* Acción */}
            <Boton
              variant="primary"
              onClick={handleEnviar}
              disabled={enviando}
            >
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </Boton>
          </div>
        )}

      </div>
    </PanelLayout>
  );
}

export default Mensajes;
