import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import api from "../api/index";
import { checkAuth } from "../utils/checkAuth";

export const loginLoader = async ({ request }) => {
  if (checkAuth()) {
    return redirect("/");
  }
  return null;
};

const Login = () => {
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (msg && msg.length > 0) {
      alert(msg);
    }
  }, [msg]);

  const location = useLocation();

  // console.log(redirectTo);

  const signInReq = async (user) => {
    const loginUrl =
      window.location.origin + location.pathname + location.search;
    const url = new URL(loginUrl);
    console.log(url.searchParams.get("redirectTo"));
    const redirectTo = url.searchParams.get("redirectTo") || "/";
    const endpoint = "/auth";
    try {
      const response = await api.post(endpoint, user);
      const token = response.data;
      localStorage.setItem("token", JSON.stringify(token.accessToken));
      if (response.status >= 200 && response.status < 300) {
        setIsError(false);
        setMsg(response.data.message);
        console.log(redirectTo);
        navigate(`${redirectTo}`, { replace: true });
      }
    } catch (error) {
      setIsError(true);
      setMsg(error?.response?.data?.message);
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //submit req handling

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };
    signInReq(newUser);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.usernameContainer}>
            <label htmlFor="username">Username:</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              className={styles.usernameInputBox}
              placeholder="username"
            />
          </div>
          <div className={styles.pwdContainer}>
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className={styles.passwordInputBox}
              placeholder="min 8 characters"
            />
          </div>
          <button type="submit" className={styles.loginBtn}>
            Log In
          </button>
        </form>
        <p>Or</p>
      </div>
    </div>
  );
};

export default Login;
