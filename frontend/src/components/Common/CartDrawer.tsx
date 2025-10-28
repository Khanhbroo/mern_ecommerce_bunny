import { useNavigate } from "react-router";
import { useRef } from "react";
import { useClickOutside } from "../../hooks";

import { X } from "lucide-react";
import { CartContents } from "../Cart";

const CartDrawer = ({
  drawOpen,
  setDrawOpen,
  toggleCartDrawer,
}: {
  drawOpen: boolean;
  setDrawOpen: (open: boolean) => void;
  toggleCartDrawer: () => void;
}) => {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useClickOutside(sidebarRef, () => setDrawOpen(false));

  const handleCheckout = () => {
    setDrawOpen(false);
    navigate("/checkout");
  };

  return (
    <div>
      {/* If the drawer is open, there will be a backdrop blur */}
      {drawOpen && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-sm z-10"
          onClick={() => {
            toggleCartDrawer();
          }}
        />
      )}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 xl:w-1/4 h-full bg-white shadow-2xl rounded-tl-2xl rounded-bl-2xl transition-transform duration-300 flex flex-col z-50 ${
          drawOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleCartDrawer}>
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Cart contents with scrollable area */}
        <div className="flex-grow-1 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {/* Component for Cart Contents */}
          <CartContents />
        </div>

        {/* Checkout button fixed at the bottom */}
        <div className="p-4 bg-white sticky bottom-0">
          <button
            className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-colors duration-200"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
            Shipping, taxes, and discount codes calculated at the checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
