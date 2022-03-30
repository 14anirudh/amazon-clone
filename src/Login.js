import React from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault(); //prevent refreshing of page
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://bhartiyanaukri.in/wp-content/uploads/2021/12/data-entry-jobs-in-amazon.png"
          alt="amazon logo "
          className="login_logo"
        />
      </Link>
      <div className="login_container">
        <h1>Sign-In</h1>

        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signIn" onClick={signIn} type="submit">
            Sign In
          </button>
        </form>

        <p>
          By signing in you agree to the Conditions of Use.Please see our
          Privacy Notice ,our Cookies Notice and our internet-Based Ads Notice.
        </p>
        <button className="signUp" onClick={register}>
          Create Your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
