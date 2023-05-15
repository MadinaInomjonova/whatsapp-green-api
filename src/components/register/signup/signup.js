import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../../../firebase";

import "../login/login.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png" />
        <div className="login__text">
          <h3>Sign up</h3>
        </div>

        <form className="login__info">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signUp} type="submit">
            Sign up
          </button>
        </form>

        <Link className="login__link" to="/">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
