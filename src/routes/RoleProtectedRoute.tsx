import { type FC, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface RoleProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const RoleProtectedRoute: FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const roles = useSelector((state: any) => state.auth.roles);
  const location = useLocation();

  const hasAccess = allowedRoles.some((role) => roles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RoleProtectedRoute;
