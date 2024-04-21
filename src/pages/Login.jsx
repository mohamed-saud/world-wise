import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import User from "../components/User";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { logIn, isAuthantcated } = useContext(AuthContext);
  const navegate = useNavigate();
  // console.log(logIn);

  function handelSubmit(e) {
    e.preventDefault();
    logIn(email, password);
    navegate("/app/cities");
  }
  return (
    <main className={styles.login}>
      <PageNav />
      {isAuthantcated ? (
        <User />
      ) : (
        <form className={styles.form} onSubmit={(e) => handelSubmit(e)}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div>
            <button>Login</button>
          </div>
        </form>
      )}
    </main>
  );
}
