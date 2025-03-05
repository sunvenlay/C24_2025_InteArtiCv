import "../styles/Header.css";
import Slidebar from "./Slidebar"; // Importamos Slidebar
import Perfil from "./Perfil"; // Importamos el nuevo componente Perfil
import logo from "../assets/logo.png"; // Importamos el logo

const Header = () => {
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    // Aquí puedes agregar la lógica para cerrar sesión
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Contenedor de Logo y Slidebar */}
        <div className="logo-slidebar-container">
          <img src={logo} alt="Tecsup logo" className="logo" />
          <div className="separator"></div>
          <Slidebar />
        </div>

        {/* Contenedor del perfil en la derecha */}
        <div className="header-right">
          <Perfil onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
