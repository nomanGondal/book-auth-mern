import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { googleauth } from "../api";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    try {
      if (response["code"]) {
        const code = response["code"];
        const result = await googleauth(code);

        const { name, email } = result.data.user;
        const token = result.data.token;

        const obj = { name, email, token };
        localStorage.setItem("user", JSON.stringify(obj));

        navigate("/mainpage");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const Googlelogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      navigate("/mainpage");
    }
  }, [navigate]);

  return (
    <div className="home">
      <div className="home__overlay"></div>
      <div className="home__content">
        <h1 className="home__title">📚 Welcome to BookCollection</h1>
        <p className="home__subtitle">
          Manage, track, and explore your reading journey — smarter in 2025.
        </p>

        <div className="home__actions">
          <button className="btn btn--google" onClick={Googlelogin}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="btn__icon"
            />
            Continue with Google
          </button>

          <div className="home__links">
            <Link to="/signup" className="btn btn--secondary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn--outline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
