import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./LoginComponent.module.css";
import state, { setLogin } from "../../../state";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginComplete, setIsLoginComplete] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password };

    const login = async (user) => {
      await axios
        .post("/api/auth/login", user)
        .then((response) => {
          setIsLoginComplete(true);
          const loggedIn = response.data;
          if (loggedIn) {
            dispatch(
              setLogin({
                token: loggedIn.token,
                user: loggedIn.user,
                isAdmin: loggedIn.isAdmin,
                userId: loggedIn.userId,
              })
            );
          }

          if (response.data.isAdmin) navigate("/admin");
          else navigate("/customer");
        })
        .catch((error) => {
          console.log(error.message);
          throw error;
        });
    };
    const myPromise = login(user);

    toast.promise(myPromise, {
      pending: `Logging in...`,
      success: `Successfully Logged in!`,
      error: `Error Logging in`,
    });
  };

  return (
    <div className={`${styles.loginContainer} max-w-3xl md:m-auto m-2`}>
      {!isLoginComplete && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            {/* <div className={styles.inputContainer}>
                    <input 
                        required
                        type="text" 
                        className={styles.inputField} 
                        placeholder=" " 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className={styles.inputLabel}>Name</label>
                </div> */}
            <div className={styles.inputContainer}>
              <input
                required
                type="email"
                className={styles.inputField}
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className={styles.inputLabel}>Email</label>
            </div>
            <div className={styles.inputContainer}>
              <input
                required
                type="password"
                className={styles.inputField}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className={styles.inputLabel}>Password</label>
            </div>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
          <div className="mt-4 text-center text-white">
            <p>
              Don&rsquo;t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-500"
              >
                Signup
              </button>
            </p>
          </div>
        </>
      )}

      {isLoginComplete && (
        <div className="text-white">
          <p>Login Complete</p>
          <p>Redirecting to User Page...</p>
        </div>
      )}
    </div>
  );
}

export default LoginComponent;
