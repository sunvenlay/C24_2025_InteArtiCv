import "../styles/LectorCV.css";
import Footer from "./Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaDownload, FaFileAlt } from "react-icons/fa";

const LectorCV = () => {
  const [cvUploaded, setCvUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCvUploaded(true);
      setFileName(file.name);
      setLoading(true);

      // Simula la generación del informe
      setTimeout(() => {
        setLoading(false);
        setReportReady(true);
      }, 2000);
    }
  };

  return (
    <div className="lector-cv-container">
      {/* Sección que contendrá el Lector y el Informe juntos */}
      <div className="lector-cv-content">
        
        {/* Lector de CV (Permanece en la izquierda) */}
        <div className="cv-preview">
          {cvUploaded ? (
            <motion.div 
              className="uploaded-file"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaFileAlt className="file-icon" />
              <span className="file-name">{fileName}</span>
            </motion.div>
          ) : (
            <label className="upload-label">
              <input type="file" accept=".pdf,.jpg,.png" onChange={handleUpload} hidden />
              <span className="upload-text">📂 Subir CV</span>
            </label>
          )}
          <motion.div
            className="review-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button className="review-btn">
              <FaFileAlt /> Revisar
            </button>
            <button className="accept-btn">
              <FaCheckCircle /> Aceptar
            </button>
            <button className="reject-btn">
              <FaTimesCircle /> Rechazar
            </button>
          </motion.div>
        </div>

        {/* Informe (Aparecerá a la derecha) */}
        {cvUploaded && (
          <motion.div
            className="cv-analysis"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {loading ? (
              <p>Generando informe...</p>
            ) : reportReady ? (
              <motion.button
                className="download-btn"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FaDownload /> Descargar el informe
              </motion.button>
            ) : null}
          </motion.div>
        )}

      </div>

      {/* Contenedor del footer */}
      <motion.div
        className="footer-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default LectorCV;
