import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useClickOutside, useEscapeKey } from "../../hooks";

import { Search, X } from "lucide-react";
import { setFilters } from "../../redux/slices/productsSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current && isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // When using escape this hook helps close the search bar
  useEscapeKey({ escapeCondition: isOpen, setEscapeCondition: setIsOpen });

  // When clicking outside of the searchbar, it will be hidden
  useClickOutside(searchBarRef, () => setIsOpen(false));

  const handleSearchToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Search the item then navigate to the collection page
    dispatch(setFilters({ search: searchTerm }));
    navigate(`/collection/all?search=${searchTerm}`);
    // Close the search bar
    setIsOpen(false);
    // Clear the search term in search bar
    setSearchTerm("");
  };

  return (
    <div ref={searchBarRef}>
      <button onClick={handleSearchToggle} className="outline-none">
        <Search size={24} />
      </button>

      <div
        className={`absolute left-0 top-0 w-full flex flex-center bg-white z-50 h-24 transition-all duration-300 ease-in-out
        ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        {isOpen && (
          <form
            onSubmit={handleSearch}
            className="relative flex flex-center w-full"
          >
            <div className="relative w-1/2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                className="bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outline-bunny-red/50 w-full placeholder:text-gray-700 outline-transparent transition-all duration-300"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Search size={24} />
              </button>
            </div>

            {/* Close button */}
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={handleSearchToggle}
            >
              <X className="24" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
