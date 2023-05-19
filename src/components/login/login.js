import "./login.css";

const Login = ({ state, setState, signIn }) => {
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png"
          alt="whatsapp-logo"
        />
        <div className="login__text">
          <h3>Login</h3>
        </div>

        <form className="login__info">
          <input
            type="text"
            placeholder="IdInstance"
            name="id"
            value={state.id}
            onChange={inputHandler}
          />
          <input
            type="text"
            placeholder="ApiTokenInstance"
            name="token"
            value={state.token}
            onChange={inputHandler}
          />
          <button type="submit" onClick={signIn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
