import { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { register } from "./api/auth";

/* ✅ MUST be outside component to avoid re-render issues */
const InputRow = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div className="flex items-center gap-4">
    <label className="w-36 text-sm text-blue-100">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex-1 rounded-md bg-white/20 px-3 py-2 text-white placeholder-blue-200 outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(formData);
    const res = await register(formData);
    console.log(res.data);
    navigate("/login");
  };

  return (
    <>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg">

          <h2 className="text-center text-2xl font-bold text-white">
            {isLogin ? "Login to your account" : "Create your account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">

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
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm text-blue-100">Gender</label>

              <div className="flex gap-6 text-white">
                <label className="flex items-center gap-2 cursor-pointer">
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

                <label className="flex items-center gap-2 cursor-pointer">
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

                <label className="flex items-center gap-2 cursor-pointer">
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
              className="w-full text-white py-2 rounded-md font-semibold bg-blue-500 hover:bg-blue-400 transition"
            >
              Register
            </button>

            <p className="text-center text-sm text-blue-200 mt-4">
              Already have an account?{" "}
              <NavLink to="/login" className="text-white hover:underline">
                Login
              </NavLink>
            </p>

          </form>
        </div>
      </main>

      <footer className="bg-blue-950/70 text-blue-200 text-sm py-4 px-6 mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
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