import { NavLink, Outlet } from "react-router-dom";

export const PatientDashboard = () => {
  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-blue-900 text-white p-5 space-y-6">

        <h2 className="text-xl font-bold">Patient Panel</h2>

        <nav className="flex flex-col space-y-4">

          <NavLink
            to="book"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-gray-300"
            }
          >
            Book Appointment
          </NavLink>

          <NavLink
            to="view"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-gray-300"
            }
          >
            View Appointments
          </NavLink>

        </nav>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

    </div>
  );
};