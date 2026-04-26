import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./css/AdminDashboard.css";

export const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>
        <nav className="admin-nav">
          <NavLink
            to="create-doctors"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            Create Doctors
          </NavLink>
          <NavLink
            to="view"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            View Appointments
          </NavLink>
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

