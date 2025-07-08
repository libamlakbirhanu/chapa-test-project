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
import ErrorPage from "./pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserCheckGuard>
        <Login />
      </UserCheckGuard>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <DashboardUser />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users",
        element: (
          <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
            <Users />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "payment-summary",
        element: (
          <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
            <PaymentSummary />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "employees",
        element: (
          <ProtectedRoute allowedRoles={["super-admin"]}>
            <Employees />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "statistics",
        element: (
          <ProtectedRoute allowedRoles={["super-admin"]}>
            <Statistics />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
