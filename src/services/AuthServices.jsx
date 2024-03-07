import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginAuth = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const responseBody = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Credenciales inválidas",
          text: "Por favor, verifica tu correo y contraseña.",
        });
      }
    }
    return responseBody;
  } catch (error) {
    console.error("Error en la solicitud de login:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al conectar con el servidor, Intente mas tarde.",
    });
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/Auth/verifyToken`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error durante la verificación del token:", error);
    return false;
  }
};
