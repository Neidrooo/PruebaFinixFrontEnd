import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../src/services/AuthServices";
import Spinner from "../src/components/StyledComponents/Spinner"; // Verifica la ruta

const ProtectedRoute = ({ children, inverse = false }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      const token = localStorage.getItem("token");
      // Verificar el token solo si existe, para las rutas protegidas
      if (token) {
        const validToken = await verifyToken(token);
        setIsAuthenticated(validToken);
        if (!validToken && !inverse) {
          navigate("/login");
        } else if (inverse && validToken) {
          // Usuario ya autenticado intentando acceder a una ruta como '/login'
          navigate("/"); // Redirige a inicio o dashboard
        } else {
          setIsLoading(false); // El token es válido, deja de mostrar el spinner
        }
      } else {
        if (inverse) {
          setIsLoading(false); // No hay token pero está intentando acceder a rutas como '/login'
        } else {
          navigate("/login"); // No hay token y está intentando acceder a rutas protegidas
        }
      }
    };

    checkTokenAndRedirect();
  }, [navigate, inverse]);

  if (isLoading) {
    return <Spinner />;
  }

  return isAuthenticated || inverse ? children : null;
};
export default ProtectedRoute;
