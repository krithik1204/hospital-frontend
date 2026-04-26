import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import "./css/signin.css";

export const Signin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ FIXED (inside component)

  const isLogin = location.pathname === "/login";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login(formData);
console.log(JSON.stringify(response.data));
      const token = response?.data?.token;
      const responseRoles = response?.data?.roles;
      const userRoles = Array.isArray(responseRoles) ? responseRoles : [];
      const userEmail = response?.data?.email || formData.email;
      const userId = response?.data?.userId || response?.data?.id;

      if (!token) {
        alert("Invalid login response");
        return;
      }

      // ✅ Store token + roles + email + userId via RTK
      dispatch(
        loginSuccess({
          token,
          roles: userRoles,
          email: userEmail,
          userId,
        })
      );

      // 👉 redirect after login
      const hasAdmin = userRoles.includes("ROLE_ADMIN");
      const hasPatient = userRoles.includes("ROLE_PATIENT");
      const redirectPath = hasAdmin && hasPatient
        ? "/dashboard"
        : hasAdmin
        ? "/admin/view"
        : "/patient/book";

      navigate(redirectPath);

    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <>
      <main className="signin-main">
        <div className="signin-image-section"></div>
        <div className="signin-form-section">
          <div className="signin-card">

            <h2 className="signin-title">
              {isLogin ? "Login to your account" : "Create your account"}
            </h2>

            <form onSubmit={handleSubmit} className="signin-form">

              {/* EMAIL */}
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="signin-btn"
              >
                Login
              </button>

              {/* LINK */}
              <p className="signin-link">
                Don’t have an account?{" "}
                <NavLink to="/register" className="signin-link-btn">
                  Register
                </NavLink>
              </p>

            </form>
          </div>
        </div>
      </main>
    </>
  );
};