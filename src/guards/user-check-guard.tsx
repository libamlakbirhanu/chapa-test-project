import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

const UserCheckGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    if (user.role === "user") navigate("/dashboard");
    if (user.role === "admin") navigate("/admin/users");
    if (user.role === "super-admin") navigate("/admin/users");
  }

  return children;
};

export default UserCheckGuard;
