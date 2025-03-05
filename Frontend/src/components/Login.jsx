import "../styles/Login.css";

const Login = () => {
  return (
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
          <button type="button" className="google-login">
            Iniciar Sesión con Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
