import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
import { AppRoutes } from "./routes/AppRoutes";
import "./css/App.css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, email } = useSelector((state: any) => state.auth);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Life Bridge Hospital</h1>

        <nav className="app-nav">
          {!isAuthenticated && (
            <>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <span className="user-email">{email}</span>
              <button
                onClick={() => dispatch(logout())}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="app-main">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;

