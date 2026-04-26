import { type FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./css/MultiRoleDashboard.css";

export const MultiRoleDashboard: FC = () => {
  return (
    <div className="multi-dashboard">
      <aside className="multi-sidebar">
        <h2 className="multi-title">Dashboard</h2>
        <nav className="multi-nav">
          <NavLink
            to="create-doctors"
            className={({ isActive }) =>
              isActive ? "multi-nav-link active" : "multi-nav-link"
            }
          >
            Create Doctors
          </NavLink>
          <NavLink
            to="book"
            className={({ isActive }) =>
              isActive ? "multi-nav-link active" : "multi-nav-link"
            }
          >
            Book Appointment
          </NavLink>
          <NavLink
            to="view"
            className={({ isActive }) =>
              isActive ? "multi-nav-link active" : "multi-nav-link"
            }
          >
            View Appointments
          </NavLink>
        </nav>
      </aside>

      <main className="multi-main">
        <Outlet />
      </main>
    </div>
  );
};

