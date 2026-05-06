import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../firebaseConfig/config";

export const usuariosApi = createApi({
  reducerPath: "usuariosApi",

  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/usuarios`,

    // adjunta el JWT de Firebase en cada request automaticamente
    prepareHeaders: async (headers) => {
      const idToken = await auth.currentUser?.getIdToken();
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  // etiqueta para invalidar cache cuando se crea/elimina
  tagTypes: ["Usuarios"],

  endpoints: (builder) => ({
    // GET /api/usuarios/usuarios?rol=alumno
    obtenerUsuarios: builder.query({
      query: (rol) => `/usuarios?rol=${rol}`,
      providesTags: ["Usuarios"],
    }),

    // POST — solo guarda en PostgreSQL (Firebase lo maneja el AuthContext)
    crearUsuario: builder.mutation({
      query: (nuevoUsuario) => ({
        url: "/usuarios",
        method: "POST",
        body: nuevoUsuario,
      }),
      invalidatesTags: ["Usuarios"],
    }),

    // DELETE /api/usuarios/usuarios/:id
    eliminarUsuario: builder.mutation({
      query: (id) => ({
        url: `/usuarios/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Usuarios"],
    }),
  }),
});

export const {
  useObtenerUsuariosQuery,
  useCrearUsuarioMutation,
  useEliminarUsuarioMutation,
} = usuariosApi;
