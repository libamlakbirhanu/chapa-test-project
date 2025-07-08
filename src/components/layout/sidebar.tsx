import { NavLink, useNavigate } from "react-router-dom";
import { navItems } from "@/utils/data";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/context/auth-context";

interface SidebarProps {
  sidebarId: string;
}

export default function Sidebar({ sidebarId }: SidebarProps) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
    navigate("/");
  };

  // Close sidebar on mobile after clicking a nav item
  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      const checkbox = document.getElementById(sidebarId) as HTMLInputElement;
      if (checkbox) checkbox.checked = false;
    }
  };

  return (
    <aside className="bg-[#121212] text-white w-full h-full flex flex-col justify-between p-4 overflow-y-auto">
      {/* Logo or User Info */}
      <div>
        <img src="/logo.png" alt="Chapa Logo" className="h-8 w-auto" />

        <nav className="space-y-2 mt-10">
          {navItems
            ?.filter((item) => item.access.includes(user?.role || ""))
            ?.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#78C306] text-black"
                      : "text-gray-300 hover:bg-[#78C306] hover:text-black"
                  }`
                }
                onClick={handleNavClick}
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
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 w-full text-left"
          onClick={handleLogout}
        >
          <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
