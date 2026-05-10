import api from "../api/axiosConfig";

// Esta función es para registrar en PostgreSQL el usuario creado copn firebase por el admin
// Usa el token directo de firebaseUser porque auth.currentUser
// todavía no está disponible en el interceptor
export const syncUserWithBackend = async (firebaseUser, nombre, apellido, idRol) => {
    const idToken = await firebaseUser.getIdToken(true);

    //Log paara comprobar que se captura el token
    console.log("Token para sync:", idToken ? "presente" : "vacío")

    const {data} = await api.post(`/api/usuarios/usuarios`, {
        firebaseuid: firebaseUser.uid,
        nombre,
        apellido,
        idRol
    }, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    });
    return data;
};

//Antes era más compleja, no estaban aplicados los axios