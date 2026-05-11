import api from "../axiosConfig";

export const getAsignaturaPorId = (id) =>
    api.get(`/api/academica/Asignaturas/${id}`);