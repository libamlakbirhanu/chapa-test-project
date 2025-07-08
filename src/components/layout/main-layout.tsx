import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/auth-context";

export default function MainLayout() {
  const { user } = useAuth();
  const sidebarCheckbox = useRef<HTMLInputElement>(null);
  const sidebarId = "sidebar-toggle";

  return (
    <div className="flex h-screen overflow-hidden bg-[#1e1e1e] text-white">
      {/* Hidden checkbox to control the sidebar */}
      <input
        type="checkbox"
        id={sidebarId}
        ref={sidebarCheckbox}
        className="peer hidden"
        aria-hidden="true"
      />

      {/* Mobile menu button */}
      <label
        htmlFor={sidebarId}
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer md:hidden"
        aria-label="Toggle sidebar"
      >
        <Bars3Icon className="h-6 w-6 block peer-checked:hidden" />
        <XMarkIcon className="h-6 w-6 hidden peer-checked:block" />
      </label>

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 w-64 transform -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0 md:translate-x-0 md:relative">
        <Sidebar sidebarId={sidebarId} />
      </div>

      {/* Overlay for mobile */}
      <label
        htmlFor={sidebarId}
        className="fixed inset-0 bg-black bg-opacity-50 z-30 opacity-0 invisible transition-opacity duration-300 peer-checked:opacity-100 peer-checked:visible md:hidden"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#1e1e1e] md:p-6 md:ml-0 p-4 ml-auto pt-5 sticky top-0  z-10 border-b border-gray-800">
          <h1 className="text-2xl font-bold">Hello {user?.username}</h1>
          <p className="text-sm text-gray-400">Welcome back</p>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
