import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import MyOrdersPage from "./MyOrdersPage";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const ProfilePage = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle log out, clear userInfo, userToken and cart in localStorage then redirect to login
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {user ? user?.name : "Username"}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {user ? user?.email : "user@example.com"}
            </p>
            <button
              className="w-full bg-bunny-red text-white py-2 px-4 rounded-sm hover:bg-bunny-red/90 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* Right Section: Orders table */}
          <div className="w-full md:h-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
