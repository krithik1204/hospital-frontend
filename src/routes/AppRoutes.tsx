import { type FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Register } from "../pages/register";
import { Signin } from "../pages/signin";
import { PatientDashboard } from "../features/patient/PatientDashboard";
import { BookAppointment } from "../features/patient/BookAppointment";
import { ViewAppointments } from "../features/patient/ViewAppointments";
import { AdminDashboard } from "../features/admin/AdminDashboard";
import { CreateDoctors } from "../features/admin/CreateDoctors";
import { MultiRoleDashboard } from "../features/common/MultiRoleDashboard";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

export const AppRoutes: FC = () => {
  const { isAuthenticated, roles } = useSelector((state: any) => state.auth);
  const hasAdmin = roles.includes("ROLE_ADMIN");
  const hasPatient = roles.includes("ROLE_PATIENT");
  const isMultiRole = hasAdmin && hasPatient;
  const defaultDashboard = isMultiRole
    ? "/dashboard/book"
    : hasAdmin
    ? "/admin/view"
    : "/patient/book";

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? defaultDashboard : "/login"}
            replace
          />
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <Register />
          ) : (
            <Navigate to={defaultDashboard} replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Signin />
          ) : (
            <Navigate to={defaultDashboard} replace />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MultiRoleDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="create-doctors" replace />} />
        <Route
          path="create-doctors"
          element={
            <RoleProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <CreateDoctors />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="book"
          element={
            <RoleProtectedRoute allowedRoles={["ROLE_PATIENT"]}>
              <BookAppointment />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="view"
          element={
            <RoleProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_PATIENT"]}>
              <ViewAppointments />
            </RoleProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/patient"
        element={
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="book" replace />} />
        <Route
          path="book"
          element={
            <RoleProtectedRoute allowedRoles={["ROLE_PATIENT"]}>
              <BookAppointment />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="view"
          element={
            <RoleProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_PATIENT"]}>
              <ViewAppointments />
            </RoleProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="create-doctors" replace />} />
        <Route
          path="create-doctors"
          element={
            <RoleProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <CreateDoctors />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="view"
          element={
            <RoleProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <ViewAppointments />
            </RoleProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
