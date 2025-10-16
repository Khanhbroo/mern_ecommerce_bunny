import { TopBar } from "../Layout";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <TopBar />
      <Navbar />
    </header>
  );
};

export default Header;
