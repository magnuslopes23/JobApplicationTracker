import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, FileText, Home, Settings, PlusCircle } from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Home", icon: <Home size={20} />, to: "/" },
    { label: "Applications", icon: <FileText size={20} />, to: "/jobs" },
    { label: "Tailor Resume", icon: <PlusCircle size={20} />, to: "/resume" },
    { label: "Settings", icon: <Settings size={20} />, to: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-lg rounded-r-xl fixed top-0 left-0 flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold text-purple-600">JobTracker</div>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition ${
                pathname === item.to
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-purple-50"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <button className="flex items-center gap-2 text-red-600 hover:text-red-800">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
