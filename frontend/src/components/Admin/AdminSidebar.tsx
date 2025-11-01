import {
  ClipboardCheckIcon,
  LogOutIcon,
  PackageOpenIcon,
  StoreIcon,
  User2Icon,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";

const AdminSidebar = ({ onLinkChange }: { onLinkChange: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          Rabbit
        </Link>
      </div>

      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 transition"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 transition"
          }
          onClick={onLinkChange}
        >
          <User2Icon />
          <span>User</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 transition"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 transition"
          }
          onClick={onLinkChange}
        >
          <PackageOpenIcon />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 transition"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 transition"
          }
          onClick={onLinkChange}
        >
          <ClipboardCheckIcon />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 transition"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 transition"
          }
          onClick={onLinkChange}
        >
          <StoreIcon />
          <span>Shop</span>
        </NavLink>
      </nav>

      <div className="mt-6">
        <button
          className="w-full bg-bunny-red/80 hover:bg-bunny-red text-white py-2 px-4 rounded-sm flex items-center justify-center space-x-2 transition"
          onClick={handleLogout}
        >
          <LogOutIcon />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
