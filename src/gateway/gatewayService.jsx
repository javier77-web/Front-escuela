//GatewayService
const API_URL = import.meta.env.VITE_API_URL;

// Función base privada — adjunta el JWT de Firebase en cada request
const authFetch = async (endpoint, options = {}) => {
    const { auth } = await import('../firebaseConfig/config');
    
    //Testeando posibles soluciones
    // Espera hasta 3 segundos a que Firebase restaure la sesión (si carga todo altiro puede que no se carguen credenciales o que se)
    if (!auth.currentUser) {
        await new Promise((resolve) => {
            const unsub = auth.onAuthStateChanged((u) => {
                unsub();
                resolve(u);
            });
        });
    }

    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) throw new Error('No hay sesión activa');

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
    }

    return response.json();
};

// Sincroniza el usuario de Firebase con la BD del backend
// Se llama una sola vez después del register
export const syncUserWithBackend = async (firebaseUser, nombre, apellido, idRol) => {
    const idToken = await firebaseUser.getIdToken(true);

    console.log("Token para sync:", idToken ? "presente" : "vacío")

    const response = await fetch(`${API_URL}/api/usuarios/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
            firebaseuid: firebaseUser.uid,
            nombre: nombre,
            apellido: apellido,
            idRol: idRol
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Error al crear usuario con el backend');
    }

    return response.json();
};

// Helpers GET y POST para usar en cualquier página
//Son funciones que envuelven authFetch para no tener que repetir configuración en cada llamada. 
// Sin ellos, cada vez que quisieras pedir datos tendrías que escribir:
/**
 *
Antes de de los helpers:
authFetch('/gestion-academica/cursos', { method: 'GET' })
authFetch('/gestion-academica/cursos', { method: 'POST', body: JSON.stringify(data) })

Después de los helpers:
apiGet('/gestion-academica/cursos')
apiPost('/gestion-academica/cursos', data)
 */
export const apiGet = (endpoint) =>
    authFetch(endpoint, { method: 'GET' });

export const apiPost = (endpoint, body) =>
    authFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    });

export const apiPut = (endpoint, body) =>
    authFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
    });

export const apiDelete = (endpoint) =>
    authFetch(endpoint, { method: 'DELETE' });