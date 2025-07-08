import Sidebar from "./sidebar";
import { Outlet } from "react-router";
import { useAuth } from "@/context/auth-context";

const Option2 = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-0 md:ml-64 flex-1 p-6 bg-[#1e1e1e] min-h-screen text-white">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hello {user?.username}</h1>
          <p className="text-sm text-gray-400">Welcome back</p>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Option2;
