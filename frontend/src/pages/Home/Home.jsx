import React, { useRef, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import Login from "../../components/RegisterComponent/LoginComponent/LoginComponent";

const Home = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const loginRef = useRef(null);

  const handleLoginClick = () => {
    setLogin((prev) => !prev);
    setTimeout(() => {
      if (loginRef.current) {
        loginRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 10);
  };

  return (
    <>
      <WelcomeMessage />
      <div
        className="border-[1px] border-[#8686862c] m-2 md:m-auto gap-4 rounded-lg p-8 max-w-3xl text-center flex bg-[#0000009a] flex-col justify-center items-center"
        style={{ backdropFilter: "blur(10px)" }}
      >
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
        <p className="text-white">
          Already have an account?{" "}
          <button
            onClick={handleLoginClick}
            className="active:scale-[0.9] active:text-blue-300 text-blue-500"
          >
            Login
          </button>
        </p>
      </div>
      {login && (
        <div ref={loginRef} className="mb-[50px]">
          <Login />
        </div>
      )}
    </>
  );
};

export default Home;
