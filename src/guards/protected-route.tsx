import { useAuth } from "@/context/auth-context";
import Unauthorized from "@/components/unauthorized";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user } = useAuth();

  // If user is not logged in, show unauthorized
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user doesn't have the required role, show unauthorized
  if (!allowedRoles.includes(user.role || "")) {
    return <Unauthorized />;
  }

  // User is authenticated and has the required role
  return <>{children}</>;
}
