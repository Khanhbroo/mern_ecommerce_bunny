import { useState } from "react";
import { Link } from "react-router";
import { useEscapeKey } from "../../hooks";

import { SearchBar, CartDrawer } from "../Common";
import { Handbag, Menu, UserRound, X } from "lucide-react";

const Navbar = () => {
  const [drawOpen, setDrawOpen] = useState<boolean>(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState<boolean>(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen((prev) => !prev);
  };

  const toggleCartDrawer = () => {
    setDrawOpen((prev) => !prev);
  };

  // When using escape this hook helps close the the drawer
  useEscapeKey({ escapeCondition: drawOpen, setEscapeCondition: setDrawOpen });
  // When using escape this hook helps close the navbar mobile
  // In this situation, you can give the Esc button or not due to your preference. In my opinion, in mobile version, we don't need the Esc key to turn the backdrop down. Only when users using simulations like Bluestack, LDPlayer, ...
  useEscapeKey({
    escapeCondition: navDrawerOpen,
    setEscapeCondition: setNavDrawerOpen,
  });

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left - Logo */}
        <Link to="/" className="text-2xl font-medium">
          Bunny
        </Link>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top wear
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom wear
          </Link>
        </div>

        {/* Right - Icon */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <UserRound size={24} className="text-gray-700" />
          </Link>
          <button
            className="relative hover:text-black outline-none"
            onClick={toggleCartDrawer}
          >
            <Handbag size={24} className="text-gray-700" />
            <span className="absolute bg-bunny-red text-white text-xs rounded-full px-2 py-0.5 -top-1  translate-x-[1px]">
              4
            </span>
          </button>

          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button className="md:hidden outline-none" onClick={toggleNavDrawer}>
            <Menu size={24} className="text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawOpen={drawOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div>
        {navDrawerOpen && (
          <div
            className="inset-0 fixed backdrop-blur-lg z-10"
            onClick={() => setNavDrawerOpen(false)}
          />
        )}
        <div
          className={`fixed top-0 left-0 w-34 sm:w-1/2 md:w-1/3 h-full rounded-tr-2xl rounded-br-2xl bg-white shadow-lg transition-transform duration-300 z-50 ${
            navDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex justify-end p-4">
            <button onClick={() => setNavDrawerOpen(false)}>
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            <nav className="space-y-4">
              <Link
                to="#"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black transition-colors"
              >
                Men
              </Link>

              <Link
                to="#"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black transition-colors"
              >
                Women
              </Link>

              <Link
                to="#"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black transition-colors"
              >
                Top Wear
              </Link>

              <Link
                to="#"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black transition-colors"
              >
                Bottom Wear
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
