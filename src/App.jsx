import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout"; // Importa el nuevo componente de layout
import ListaFormulario from "./pages/ListaFormulario/ListaFormulario";
import Formulario from "./pages/Formulario/Formulario";
import ProtectedRoute from "../auth/ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login/Login";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/ListaFormulario" />} /> */}
          <Route element={<Layout />}>
            <Route
              path="/Formulario"
              element={
                <ProtectedRoute>
                  <Formulario />
                </ProtectedRoute>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <ListaFormulario />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/Login"
            element={
              <ProtectedRoute inverse={true}>
                <Login />
              </ProtectedRoute>
            }
          />{" "}
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
