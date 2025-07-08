import {
  ChartBarIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export const navItems = [
  {
    label: "Dashboard",
    icon: <HomeIcon className="w-5 h-5" />,
    to: "/dashboard",
    access: ["user"],
  },
  {
    label: "Users",
    icon: <UserIcon className="w-5 h-5" />,
    to: "/admin/users",
    access: ["admin", "super-admin"],
  },
  {
    label: "Payment Summary",
    icon: <UserIcon className="w-5 h-5" />,
    to: "/admin/payment-summary",
    access: ["admin", "super-admin"],
  },
  {
    label: "Employees",
    icon: <UserGroupIcon className="w-5 h-5" />,
    to: "/admin/employees",
    access: ["super-admin"],
  },
  {
    label: "Statistics",
    icon: <ChartBarIcon className="w-5 h-5" />,
    to: "/admin/statistics",
    access: ["super-admin"],
  },
];
