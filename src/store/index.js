import { configureStore } from "@reduxjs/toolkit";
import { usuariosApi } from "./api/usuariosApi";

export const store = configureStore({
  reducer: {
    // reducer de RTK Query
    [usuariosApi.reducerPath]: usuariosApi.reducer,
  },
  // middleware necesario para cache y invalidaciones
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usuariosApi.middleware),
});
