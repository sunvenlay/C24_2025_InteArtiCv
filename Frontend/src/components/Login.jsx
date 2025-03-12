import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    console.log(response);
    if (response.credential) {
      // Decodificar el token para obtener la información del usuario
      const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
      const googleId = decodedToken.sub; // ID único de Google
      const nombre = decodedToken.name; // Nombre del usuario
      const correo = decodedToken.email; // Correo del usuario

      // Enviar los datos al backend de Django
      const res = await fetch('http://localhost:8000/google-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          google_id: googleId,
          nombre: nombre,
          correo: correo,
        }),
      });

      const data = await res.json();
      if (data.status === 'success') {
        // Redirigir al usuario a la página de bienvenida
        navigate('/welcome', { state: { username: nombre } });
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId="258181987281-jd71k4f6k0no7e61qk34mpvc6i7nh2sp.apps.googleusercontent.com">
      <div className="login-container">
        <div className="login-box">
          <h2>¡BIENVENIDO, POR FAVOR INICIA SESIÓN!</h2>
          <form>
            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" placeholder="Ingrese su correo" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" placeholder="Ingrese su contraseña" />
            </div>
            <br />
            <button type="button">
              <a href="/welcome" style={{ color: "white", textDecoration: "none" }}>Iniciar Sesión</a>
            </button>
            <br />
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;