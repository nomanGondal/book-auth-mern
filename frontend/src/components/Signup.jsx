import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  // Password strength logic
  const evaluatePasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength("");
      return;
    }

    const weak = /^(?=.*[a-z]).{6,}$/;
    const medium = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    const strong = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_]).{10,}$/;

    if (strong.test(password)) {
      setPasswordStrength("strong");
    } else if (medium.test(password)) {
      setPasswordStrength("medium");
    } else if (weak.test(password)) {
      setPasswordStrength("weak");
    } else {
      setPasswordStrength("too-short");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("⚠️ Please fill in all fields.", { position: "top-center" });
      return;
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Signup failed");
      await response.json();

      toast.success("🎉 Signup successful!", { position: "top-center" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("❌ Signup failed. Please try again.", {
        position: "top-center",
      });
    }

    setFormData({ name: "", email: "", password: "" });
    setPasswordStrength("");
  };

  return (
    <div className="signup">
      <div className="signup__card">
        <h2 className="signup__title">Create Your Account</h2>
        <form onSubmit={handleSignup} className="signup__form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordStrength && (
              <p className={`strength ${passwordStrength}`}>
                {passwordStrength === "too-short"
                  ? "Too Short"
                  : passwordStrength.charAt(0).toUpperCase() +
                    passwordStrength.slice(1)}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn--primary">
            Sign Up
          </button>

          <p className="signup__login-text">
            Already have an account?{" "}
            <Link to="/login" className="signup__login-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
