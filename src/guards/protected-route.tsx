// src/routes/ProtectedRoute.tsx
import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user?.role || ""))
    return <Navigate to="/" replace />;

  return children;
}
