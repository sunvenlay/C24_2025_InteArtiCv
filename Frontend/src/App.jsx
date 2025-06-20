import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import LectorCV from "./components/LectorCV";
import HistorialCV from "./components/HistorialCV";
import ChatEntrevista from "./components/Entrevista";
import ProtectedRoute from "./components/ProtectedRoute";
import authService from "./services/authService";
import "./styles/Chat.css";
import "./styles/layout.css";
import "./index.css";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/register";

  const handleLogout = () => {
    console.log("Usuario ha cerrado sesión");
    authService.logout();
    // Redirigir al login
    window.location.href = "/";
  };

  return (
    <GoogleOAuthProvider clientId="258181987281-jd71k4f6k0no7e61qk34mpvc6i7nh2sp.apps.googleusercontent.com">
      {/* Estructura principal completamente reorganizada */}
      <div className="app-root">
        {/* Header fijo en la parte superior */}
        {!isLoginPage && (
          <div className="header-container">
            <Header onLogout={handleLogout} />
          </div>
        )}
        
        {/* Contenido principal con espacio para evitar el header */}
        <div className={`content-wrapper ${!isLoginPage ? 'with-header' : ''}`}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas protegidas */}
            <Route path="/welcome" element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            } />
            <Route path="/lector-cv" element={
              <ProtectedRoute>
                <LectorCV />
              </ProtectedRoute>
            } />
            <Route path="/entrevista" element={
              <ProtectedRoute>
                <ChatEntrevista />
              </ProtectedRoute>
            } />
            <Route path="/historialCV" element={
              <ProtectedRoute>
                <HistorialCV />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;