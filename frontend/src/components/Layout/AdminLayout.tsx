import { MenuIcon } from "lucide-react";
import { useRef, useState } from "react";
import { AdminSidebar } from "../Admin";
import { useClickOutside } from "../../hooks";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // When clicked outside of sidebar, close it
  useClickOutside(sidebarRef, () => setIsSidebarOpen(false));

  const toggleSideBar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSideBar}>
          <MenuIcon size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>

      {/* Overlay for mobile sizebar */}
      <div
        className={`fixed inset-0 z-10 md:hidden transition-opacity 
        ${
          isSidebarOpen
            ? "opacity-100 bg-black/50"
            : "opacity-0 bg-black/50 pointer-events-none"
        }
      `}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition md:translate-x-0 md:block z-20`}
      >
        <AdminSidebar onLinkChange={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
