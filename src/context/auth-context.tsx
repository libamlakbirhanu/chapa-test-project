// src/context/AuthContext.tsx
import { getUser } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import FullPageLoader from "@/components/ui/full-page-loader";
import { AuthContextType, Role } from "@/types";

const AuthContext = createContext<AuthContextType>({
  user: {
    role: null,
    email: "",
    username: "",
  },
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(true);

  const [user, setUser] = useState<{
    role: Role;
    email: string;
    username: string;
  } | null>(null);

  const { mutateAsync: getCurrentUser } = useMutation({
    mutationFn: getUser,
    onSuccess: (data) => {
      setUser(data);
      setInitialize(false);
    },
    onError: () => {
      setUser(null);
      setInitialize(false);
    },
  });

  useEffect(() => {
    const email = sessionStorage.getItem("user");
    if (email) {
      getCurrentUser(email);
    } else {
      setInitialize(false);
    }
  }, []);

  const login = (newUser: { role: Role; email: string; username: string }) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {initialize ? <FullPageLoader /> : children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
