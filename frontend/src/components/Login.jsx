import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [logininfo, setlogininfo] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); //  toggle state

  const handleChange = (e) => {
    setlogininfo({ ...logininfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;

    if (!email || !password) {
      toast.error("⚠️ Please fill in all fields.", { position: "top-center" });
      return;
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logininfo),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      console.log(" Login successful:", data);

      toast.success(" Login successful!", { position: "top-center" });

      const { name, email } = data.user;
      const token = data.token;
      localStorage.setItem("user", JSON.stringify({ name, email, token }));

      setTimeout(() => navigate("/mainpage"), 2000);
    } catch (error) {
      toast.error(" Login failed. Please try again.", {
        position: "top-center",
      });
    }

    setlogininfo({ email: "", password: "" });
  };

  return (
    <div className="login">
      <div className="login__card">
        <h2 className="login__title">Welcome Back 👋</h2>
        <p className="login__subtitle">Log in to continue</p>

        <form onSubmit={handleLogin} className="login__form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={logininfo.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={logininfo.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <button type="submit" className="btn btn--primary">
            Login
          </button>

          <p className="login__footer">
            Don’t have an account?{" "}
            <Link to="/signup" className="login__link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
