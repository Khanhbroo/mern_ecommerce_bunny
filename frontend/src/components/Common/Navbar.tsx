import { Link } from "react-router";

const Navbar = () => {
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left - Logo */}
        <Link to="/" className="text-2xl font-medium">
          Bunny
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
