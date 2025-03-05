import PropTypes from "prop-types";
import "../styles/Welcome.css"; // Se mantiene el archivo de estilos externo
import Header from "./Header";
import Footer from "./Footer";
import cvReaderImage from "../assets/cv-reader.png"; // Importamos las imágenes correctamente
import interviewSimulationImage from "../assets/interview-simulation.png"; // Otra imagen

const Welcome = ({ username = "Personal de DPE" }) => {
  return (
    <div className="welcome-container">
      <Header />

      {/* Caja de Bienvenida */}
      <div className="welcome-box">
        <h1 className="welcome-text">
          Bienvenido/a <span className="username">({username})</span>
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
          <button>
          <a href="/entrevista">Pruebalo ahora</a>
          </button>
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
