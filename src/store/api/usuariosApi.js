// store/api/usuariosApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../firebaseConfig/config";

// Helper que espera hasta tener un currentUser con token válido
const getFirebaseToken = () => {
  return new Promise((resolve) => {
    // Si ya hay usuario activo, devuelve el token de inmediato
    if (auth.currentUser) {
      auth.currentUser.getIdToken().then(resolve).catch(() => resolve(null));
      return;
    }
    // Si no, espera el primer cambio de estado (Firebase tardó en inicializar)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        user.getIdToken().then(resolve).catch(() => resolve(null));
      } else {
        resolve(null);
      }
    });
  });
};

export const usuariosApi = createApi({
  reducerPath: "usuariosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/usuarios`,
    prepareHeaders: async (headers) => {
      const idToken = await getFirebaseToken();
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Usuarios"],
  endpoints: (builder) => ({
    obtenerUsuarios: builder.query({
      query: (rol) => `/usuarios?rol=${rol}`,
      providesTags: ["Usuarios"],
    }),
    crearUsuario: builder.mutation({
      query: (nuevoUsuario) => ({
        url: "/usuarios",
        method: "POST",
        body: nuevoUsuario,
      }),
      invalidatesTags: ["Usuarios"],
    }),
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