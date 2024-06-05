import React, { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import api from "../api/index";
import { Link, redirect, useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";

export const signUpLoader = async ({ request }) => {
  if (checkAuth()) {
    return redirect("/");
  }
  return null;
};

const SignUp = () => {
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (msg && msg.length > 0) {
      alert(msg);
    }
  }, [msg]);

  const signUpReq = async (user) => {
    const endpoint = "/auth/sign-up";
    try {
      const response = await api.post(endpoint, user);
      if (response.status >= 200 && response.status < 300) {
        setIsError(false);
        setMsg(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMsg(error.response.data.message);
    }
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };
    signUpReq(newUser);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={styles.formContainer}>
          <div className={styles.usernameContainer}>
            <label htmlFor="username">Username:</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              className={styles.usernameInputBox}
              placeholder="username or email"
            />
          </div>
          <div className={styles.emailContainer}>
            <label htmlFor="email">Email:</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              id="email"
              className={styles.emailInputBox}
              placeholder="xyz@gmail.com"
            />
          </div>
          <div className={styles.pwdContainer}>
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              id="password"
              className={styles.passwordInputBox}
              placeholder="min 8 characters"
            />
          </div>
          <button type="submit">Register</button>
          <Link to="/login">Already have an account? Log in</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
