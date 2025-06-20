import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Client ID con fallbacks
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 
                           import.meta.env.REACT_APP_GOOGLE_CLIENT_ID ||
                           "258181987281-jd71k4f6k0no7e61qk34mpvc6i7nh2sp.apps.googleusercontent.com";

  // Debug
  console.log('Google Client ID:', GOOGLE_CLIENT_ID);

  const responseGoogle = async (response) => {
    console.log('Google response:', response);
    if (response.credential) {
      try {
        const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
        console.log('Decoded token:', decodedToken);
        
        const googleId = decodedToken.sub;
        const nombre = decodedToken.name;
        const correo = decodedToken.email;
        const picture = decodedToken.picture;

        try {
          const res = await fetch('http://localhost:8000/api/google-login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              google_id: googleId,
              nombre: nombre,
              correo: correo,
              picture: picture,
            }),
          });

          if (!res.ok) {
            console.error('Error HTTP:', res.status);
            throw new Error(`Error HTTP: ${res.status}`);
          }

          const data = await res.json();
          console.log('Respuesta del servidor:', data);
          
          if (data.status === 'success') {
            localStorage.setItem('access_token', data.access || 'google_token_' + Date.now());
            localStorage.setItem('refresh_token', data.refresh || '');
            localStorage.setItem('alumno_id', data.alumno_id || googleId);
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('correo', correo);
            localStorage.setItem('picture', picture);
            
            console.log('Login exitoso:', nombre);
            
            // ✅ Redirigir a Welcome
            navigate('/welcome', { state: { username: nombre } });
          } else {
            console.error('Error en la autenticación:', data.error || 'Error desconocido');
            alert('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
          }
        } catch (backendError) {
          console.warn('Backend no disponible, usando autenticación frontend:', backendError);
          
          localStorage.setItem('access_token', 'google_' + Date.now());
          localStorage.setItem('nombre', nombre);
          localStorage.setItem('correo', correo);
          localStorage.setItem('picture', picture);
          localStorage.setItem('google_id', googleId);
          
          console.log('Login exitoso (offline):', nombre);
          
          // ✅ Redirigir a Welcome (modo offline)
          navigate('/welcome', { state: { username: nombre } });
        }
      } catch (tokenError) {
        console.error('Error al procesar token de Google:', tokenError);
        alert('Error al procesar la respuesta de Google');
      }
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google Login Error:', error);
    alert('Error al conectar con Google. Verifica la configuración.');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    
    console.log('Login normal:', { email, password });
    localStorage.setItem('access_token', 'login_' + Date.now());
    localStorage.setItem('nombre', email);
    
    // ✅ Redirigir a Welcome
    navigate('/welcome', { state: { username: email } });
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="tecsup-login-container">
        <div className="tecsup-unified-card">
          <div className="tecsup-form-side">
            <div className="tecsup-form-container">
              <div className="tecsup-header">
                <div className="tecsup-logo">
                  <span className="tecsup-logo-text">Tecsup</span>
                  <span className="tecsup-tagline">TECNOLOGÍA CON SENTIDO</span>
                </div>
                <h1 className="tecsup-system-title">Sistema de evaluación laboral con IA</h1>
              </div>

              <div className="tecsup-form">
                <div className="tecsup-input-group">
                  <input
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Usuario (DNI)"
                    className="tecsup-input"
                    required
                  />
                </div>

                <div className="tecsup-input-group">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="tecsup-input"
                    required
                  />
                </div>

                <div className="tecsup-forgot-password">
                  <a href="#" className="tecsup-forgot-link">¿Olvidó la contraseña?</a>
                </div>

                <button type="button" onClick={handleLogin} className="tecsup-login-btn">
                  Iniciar Sesión
                </button>

                <div className="tecsup-divider">
                  <span>o</span>
                </div>

                <div className="tecsup-google-container">
                  <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={handleGoogleError}
                    theme="outline"
                    text="signin_with"
                    shape="rectangular"
                    width="100%"
                    useOneTap={false}
                    auto_select={false}
                  />
                </div>

                <div className="tecsup-register">
                  <span>¿No tienes una cuenta? </span>
                  <a href="#" className="tecsup-register-link">Crear una cuenta</a>
                </div>
              </div>
            </div>
          </div>

          <div className="tecsup-image-side">
            <div className="tecsup-image-overlay">
              <div className="tecsup-center-image">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                  alt="Estudiantes de TECSUP"
                  className="tecsup-main-image"
                />
                <div className="tecsup-image-caption">
                  Tecnología con Sentido
                </div>
                <div className="tecsup-image-subcaption">
                  Formando profesionales del futuro
                </div>
              </div>
              
              <div className="tecsup-decorative-lines">
                <div className="tecsup-line tecsup-line-1"></div>
                <div className="tecsup-line tecsup-line-2"></div>
                <div className="tecsup-line tecsup-line-3"></div>
                <div className="tecsup-line tecsup-line-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;