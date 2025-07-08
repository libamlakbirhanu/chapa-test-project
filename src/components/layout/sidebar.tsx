import { NavLink, useNavigate } from "react-router-dom";
import { navItems } from "@/utils/data";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/context/auth-context";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <aside className="bg-[#121212] text-white w-64 h-screen flex flex-col justify-between fixed top-0 left-0 z-10 p-4 hidden md:flex">
      {/* Logo or User Info */}
      <div>
        <img src="/logo.png" alt="" />

        <nav className="space-y-2 mt-10">
          {navItems
            ?.filter((item) => item.access.includes(user?.role || ""))
            ?.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-[#78C306] text-black" : "hover:bg-[#78C306]"
                  }`
                }
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="mt-auto">
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 w-full"
          onClick={handleLogout}
        >
          <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
