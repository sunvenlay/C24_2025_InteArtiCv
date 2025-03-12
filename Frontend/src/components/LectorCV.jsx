import "../styles/LectorCV.css";
import Footer from "./Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaDownload, FaFileAlt, FaSearch, FaFilePdf } from "react-icons/fa";

const API_BASE_URL = "http://127.0.0.1:8000";

const LectorCV = () => {
  const [cvUploaded, setCvUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [cvId, setCvId] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [analysisText, setAnalysisText] = useState("");

  // Subir CV al Backend
  const uploadCVToAPI = async (file) => {
    const formData = new FormData();
    formData.append("archivo", file);
    formData.append("alumno_id", 1); // 🔹 Cambia este valor por el ID del alumno correspondiente

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/subir-cv/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al subir el CV");
      }

      const data = await response.json();
      console.log("✅ CV subido con éxito:", data);

      setCvId(data.id); // 🔹 Guardamos el ID del CV
      setCvUploaded(true);
      setFileName(file.name);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error:", error);
      setUploadError(error.message || "Error al subir el CV. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  // Analizar el CV
  const analyzeCV = async () => {
    if (!cvId) {
      setUploadError("Primero sube un CV antes de analizarlo.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/analizar-cv/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv_id: cvId }),
      });

      if (!response.ok) {
        throw new Error("Error al analizar el CV");
      }

      const data = await response.json();
      console.log("✅ Análisis completado:", data);

      setAnalysisText(data.analisis); // 🔹 Guarda el texto del análisis
      setReportReady(true);
      setReportId(data.informe_id); // Guardamos el ID del informe
      setLoading(false);
    } catch (error) {
      console.error("❌ Error:", error);
      setUploadError("Error al analizar el CV. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  // Descargar el Informe
  const downloadReport = async () => {
    if (!reportId) {
      setUploadError("No hay informe disponible para descargar.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/descargar-informe/${reportId}/`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al descargar el informe");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Informe_CV.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("❌ Error:", error);
      setUploadError("Error al descargar el informe.");
    }
  };

  // Cancelar el CV
  const handleCancel = async () => {
    if (!cvId) {
      setUploadError("No hay un CV para cancelar.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/eliminar-cv/${cvId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al cancelar el CV");
      }

      console.log("✅ CV cancelado con éxito");

      setCvUploaded(false);
      setFileName("");
      setCvId(null);
      setReportReady(false);
      setReportId(null);
      setAnalysisText("");
      setLoading(false);
    } catch (error) {
      console.error("❌ Error:", error);
      setUploadError("Error al cancelar el CV. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  // Manejo del archivo subido
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setUploadError("Solo se permiten archivos PDF, JPG o PNG.");
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setUploadError("El archivo no puede ser mayor a 5MB.");
        return;
      }

      setUploadError(null);
      uploadCVToAPI(file);
    }
  };

  return (
    <div className="lector-cv-container">
      <div className="lector-cv-content">
        {/* Lector de CV (Izquierda) */}
        <div className="cv-preview">
          {cvUploaded ? (
            <motion.div
              className="uploaded-file"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaFilePdf className="file-icon" /> {/* 🔹 Ícono de PDF */}
              <span className="file-name">{fileName}</span>
              <FaCheckCircle className="success-icon" />
            </motion.div>
          ) : (
            <label className="upload-label">
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={handleUpload}
                hidden
              />
              <span className="upload-text">📂 Subir CV</span>
            </label>
          )}

          {uploadError && <p className="error-message">{uploadError}</p>}
          {loading && <p>Procesando...</p>}

          {/* Barra de revisión */}
          {cvUploaded && (
            <motion.div
              className="review-bar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <button className="review-btn" onClick={analyzeCV}>
                <FaSearch /> Analizar CV
              </button>
              <button className="reject-btn" onClick={handleCancel}>
                <FaTimesCircle /> Cancelar
              </button>
            </motion.div>
          )}
        </div>

        {/* Panel de Análisis (Derecha) */}
        {reportReady && (
          <motion.div
            className="analysis-panel"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h3>Análisis del CV</h3>
            <div className="analysis-text">
              {analysisText}
            </div>
            <motion.button
              className="download-btn"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={downloadReport}
            >
              <FaDownload /> Descargar el informe
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
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