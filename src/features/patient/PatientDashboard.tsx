import { type FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "./css/PatientDashboard.css";

export const PatientDashboard: FC = () => {
  const roles = useSelector((state: any) => state.auth.roles);
  const canBook = roles.includes("ROLE_PATIENT");

  return (
    <div className="patient-dashboard">

      {/* LEFT SIDEBAR */}
      <aside className="patient-sidebar">

        <h2 className="patient-title">Patient Panel</h2>

        <nav className="patient-nav">
          {canBook && (
            <NavLink
              to="book"
              className={({ isActive }) =>
                isActive ? "patient-nav-link active" : "patient-nav-link"
              }
            >
              Book Appointment
            </NavLink>
          )}

          <NavLink
            to="view"
            className={({ isActive }) =>
              isActive ? "patient-nav-link active" : "patient-nav-link"
            }
          >
            View Appointments
          </NavLink>

        </nav>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="patient-main">
        <Outlet />
      </main>

    </div>
  );
};