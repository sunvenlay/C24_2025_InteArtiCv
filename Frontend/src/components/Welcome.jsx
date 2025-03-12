import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom'; // Para obtener el estado de la ruta
import "../styles/Welcome.css";
import Header from "./Header";
import Footer from "./Footer";
import cvReaderImage from "../assets/cv-reader.png";
import interviewSimulationImage from "../assets/interview-simulation.png";

const Welcome = ({ username = "Personal de DPE" }) => {
  const location = useLocation();
  const user = location.state?.username || username;

  return (
    <div className="welcome-container">
      <Header />

      {/* Caja de Bienvenida */}
      <div className="welcome-box">
        <h1 className="welcome-text">
          Bienvenido/a <span className="username">({user})</span>
        </h1>
      </div>

      {/* Contenedor de Opciones */}
      <div className="options-container">
        {/* Tarjeta 1 */}
        <div className="option-card">
          <img src={cvReaderImage} alt="Lector de C.V." />
          <h3>Lector de C.V.</h3>
          <button>
            <a href="/lector-cv">Pruebalo ahora</a>
          </button>
        </div>

        {/* Tarjeta 2 */}
        <div className="option-card">
          <img src={interviewSimulationImage} alt="Simulación de Entrevista" />
          <h3>Simulación de Entrevista</h3>
          <button>Pruebalo ahora</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Validación de PropTypes
Welcome.propTypes = {
  username: PropTypes.string, // Ahora es opcional
};

export default Welcome;