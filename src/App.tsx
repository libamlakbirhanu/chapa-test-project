import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./components/layout/main-layout";
import DashboardUser from "./pages/user-dashboard";
import { AuthProvider } from "./context/auth-context";
import Login from "./pages/auth/login";
import ProtectedRoute from "./guards/protected-route";
import Users from "./pages/admin/users";
import PaymentSummary from "./pages/admin/payment-summary";
import Employees from "./pages/admin/employees";
import Statistics from "./pages/admin/statistics";
import UserCheckGuard from "./guards/user-check-guard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserCheckGuard>
        <Login />
      </UserCheckGuard>
    ),
  },
  {
    path: "dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <DashboardUser />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "admin",
    element: <MainLayout />,
    children: [
      {
        path: "users",
        element: (
          <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment-summary",
        element: (
          <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
            <PaymentSummary />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees",
        element: (
          <ProtectedRoute allowedRoles={["super-admin"]}>
            <Employees />
          </ProtectedRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <ProtectedRoute allowedRoles={["super-admin"]}>
            <Statistics />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AuthProvider>{<RouterProvider router={router} />}</AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
