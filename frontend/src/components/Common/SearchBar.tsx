import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSearchToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form className="relative flex flex-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              className="bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outline-rabbit-red/20 w-full"
            />
            <h1></h1>
          </div>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <Search size={24} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
