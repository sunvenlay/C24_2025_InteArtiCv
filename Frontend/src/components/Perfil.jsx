import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Importar PropTypes
import "../styles/Perfil.css"; 

const Perfil = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="perfil-container">
      {/* Botón de perfil */}
      <button className="perfil-button" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="perfil-icon">👤</span>
      </button>

      {/* Menú desplegable con animación */}
      <div className={`perfil-menu ${menuOpen ? "show" : ""}`}>
        <button className="logout-button" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

/* ✅ Validar las props con PropTypes */
Perfil.propTypes = {
  onLogout: PropTypes.func.isRequired, // onLogout debe ser una función y es obligatorio
};

export default Perfil;
