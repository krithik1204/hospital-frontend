import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import { Register } from "./register";
import { Signin } from "./signin";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";
import { PatientDashboard } from "./PatientDashboard";
import { BookAppointment } from "./BookAppointment";
import { ViewAppointments } from "./ViewAppointments";
function App() {
  const dispatch = useDispatch(); // ✅ FIX 1

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">

      {/* HEADER */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-blue-950/60 backdrop-blur-md">

        <h1 className="text-white text-lg font-semibold">
          Life Bridge Hospital
        </h1>

        <nav className="flex space-x-6 text-sm text-blue-200">

          {/* ✅ FIX 2: wrap in fragment */}
          {!isAuthenticated && (
            <>
              <NavLink to="/register" className="hover:text-white">
                Register
              </NavLink>

              <NavLink to="/login" className="hover:text-white">
                Login
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <button
              onClick={() => dispatch(logout())}
              className="text-red-300 hover:text-white"
            >
              Logout
            </button>
          )}

        </nav>
      </header>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Signin />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
        <Route
          path="/patient"
          element={isAuthenticated ? <PatientDashboard /> : <Navigate to="/login" />}
        >
          <Route path="book" element={<BookAppointment />} />
          <Route path="view" element={<ViewAppointments />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;