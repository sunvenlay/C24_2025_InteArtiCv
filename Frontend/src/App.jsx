import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import LectorCV from "./components/LectorCV";
import Guia from "./components/Guia";
import ChatEntrevista from "./components/Entrevista"; // Importa el Chat IA
import "./styles/Chat.css"; // Importa los estilos del chat

const App = () => {
  const location = useLocation();
  console.log("Current Path:", location.pathname);

  // Detecta si es la página de login
  const isLoginPage = location.pathname === "/";

  // 🔹 Función para manejar el logout
  const handleLogout = () => {
    console.log("Usuario ha cerrado sesión");
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el estado o redirigir al login
  };

  return (
    <>
      {/* Muestra el Header en todas las páginas excepto en Login */}
      {!isLoginPage && <Header onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Login />} /> {/* Página de login */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/lector-cv" element={<LectorCV />} />
        <Route path="/guia" element={<Guia />} />

        {/* Nueva ruta para el Chat de Entrevista */}
        <Route path="/entrevista" element={<ChatEntrevista />} />
      </Routes>
    </>
  );
};

// 🔹 Define las propTypes para App
App.propTypes = {
  // Aquí puedes definir las propTypes si es necesario
};

export default App;