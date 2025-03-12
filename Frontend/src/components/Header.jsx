import PropTypes from "prop-types"; // ✅ Importar PropTypes
import "../styles/Header.css";
import Slidebar from "./Slidebar";
import Perfil from "./Perfil";
import logo from "../assets/logo.png";

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        {/* Contenedor para el Slidebar y Logo */}
        <div className="logo-slidebar-container">
          <img src={logo} alt="Tecsup logo" className="logo" />
          <div className="separator"></div> {/* Línea separadora */}
          <Slidebar />
        </div>

        {/* Contenedor del Perfil */}
        <div className="perfil-container">
          <Perfil onLogout={onLogout} /> {/* Botón de perfil y menú */}
        </div>
      </div>
    </header>
  );
};

/* ✅ Validar las props con PropTypes */
Header.propTypes = {
  onLogout: PropTypes.func.isRequired, // onLogout debe ser una función y es obligatorio
};

export default Header;
