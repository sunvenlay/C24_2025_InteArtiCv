import { useState } from "react";
import ChatBox from "./Chatbox";
import ChatInput from "./ChatInput";
import "../styles/Chat.css";

const preguntas = [
  "Háblame sobre ti y tu experiencia profesional.",
  "¿Cuáles son tus fortalezas y debilidades?",
  "¿Por qué quieres trabajar en nuestra empresa?",
  "Cuéntame sobre un desafío laboral que hayas superado.",
  "¿Tienes alguna pregunta para nosotros?"
];

const Entrevista = () => {
  const [chat, setChat] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [preguntaIndex, setPreguntaIndex] = useState(0);

  const handleEnviarMensaje = () => {
    if (mensaje.trim() === "") return;

    // Agregar mensaje del usuario
    const nuevoChat = [...chat, { tipo: "usuario", texto: mensaje }];
    setChat(nuevoChat);
    setMensaje("");

    // Simular respuesta de IA con retardo
    setTimeout(() => {
      // Si todavía hay preguntas
      if (preguntaIndex < preguntas.length - 1) {
        const textoIA = `Gracias por tu respuesta. ${preguntas[preguntaIndex + 1]}`;
        setChat([...nuevoChat, { tipo: "ia", texto: textoIA }]);
        setPreguntaIndex(preguntaIndex + 1);
      } else {
        // Si se han terminado las preguntas
        const textoIA = "¡La entrevista ha finalizado! Calificación: Aprobada.";
        setChat([...nuevoChat, { tipo: "ia", texto: textoIA }]);
      }
    }, 1500);
  };

  return (
    <div className="chat-container">
      <ChatBox chat={chat} preguntaInicial={preguntas[0]} />
      <ChatInput mensaje={mensaje} setMensaje={setMensaje} onEnviar={handleEnviarMensaje} />
    </div>
  );
};

export default Entrevista;
