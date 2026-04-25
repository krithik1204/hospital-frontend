import { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { login } from "./api/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/authSlice";

export const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ FIXED (inside component)

  const isLogin = location.pathname === "/login";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

    try {
      const response = await login(formData);

      const token = response?.data?.token;

      if (!token) {
        alert("Invalid login response");
        return;
      }

      // ✅ Store token via RTK
      dispatch(loginSuccess(token));

      // 👉 redirect after login
    navigate("/patient/book");

    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg">

          <h2 className="text-center text-2xl font-bold text-white">
            {isLogin ? "Login to your account" : "Create your account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-blue-100">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md bg-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-blue-100">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md bg-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full text-white py-2 rounded-md font-semibold bg-green-500 hover:bg-green-400"
            >
              Login
            </button>

            {/* LINK */}
            <p className="text-center text-sm text-blue-200 mt-4">
              Don’t have an account?{" "}
              <NavLink to="/register" className="text-white hover:underline">
                Register
              </NavLink>
            </p>

          </form>
        </div>
      </main>
    </>
  );
};