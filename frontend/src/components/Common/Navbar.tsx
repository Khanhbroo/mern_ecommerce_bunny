import { Handbag, Menu, UserRound } from "lucide-react";
import { Link } from "react-router";
import SearchBar from "./SearchBar";

const Navbar = () => {
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
          <button className="relative hover:text-black">
            <Handbag size={24} className="text-gray-700" />
            <span className="absolute bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5 -top-1  translate-x-[1px]">
              4
            </span>
          </button>

          {/* Search */}
          <SearchBar />
          <button className="md:hidden">
            <Menu size={24} className="text-gray-700" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
