import { type ChangeEvent, type FormEvent, type FC, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { register } from "../features/auth/authApi";
import { InputRow } from "../components/InputRow";
import { useApiCall } from "../hooks/useApiCall";
import "./css/register.css";

export const Register: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, saving, rejected, error, execute } = useApiCall<any>();
  const isLogin = location.pathname === "/login";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    password: "",
  });

  /* ✅ FIXED handleChange (prevents cursor jump issues) */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await execute(() => register(formData), { saving: true });
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <>
      <main className="register-main">
        <div className="register-card">

          <h2 className="register-title">
            {isLogin ? "Login to your account" : "Create your account"}
          </h2>

          <form onSubmit={handleSubmit} className="register-form">

            <InputRow
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />

            <InputRow
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />

            <InputRow
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <InputRow
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />

            {/* ✅ GENDER RADIO BUTTONS */}
            <div className="gender-section">
              <label className="gender-label">Gender</label>

              <div className="gender-options">
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    checked={formData.gender === "Male"}
                    className="accent-blue-500"
                  />
                  Male
                </label>

                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    checked={formData.gender === "Female"}
                    className="accent-blue-500"
                  />
                  Female
                </label>

                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    onChange={handleChange}
                    checked={formData.gender === "Other"}
                    className="accent-blue-500"
                  />
                  Other
                </label>
              </div>
            </div>

            {/* ✅ DATE PICKER */}
            <InputRow
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            <InputRow
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <button
              type="submit"
              className="register-btn"
              disabled={loading || saving}
            >
              {saving ? "Saving..." : "Register"}
            </button>

            {rejected && error && (
              <div className="register-error">
                <p>{error}</p>
              </div>
            )}

            <p className="register-link">
              Already have an account?{" "}
              <NavLink to="/login" className="text-white hover:underline">
                Login
              </NavLink>
            </p>

          </form>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 MyApp. All rights reserved.</p>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
};