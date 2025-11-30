import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEscapeKey, useClickOutside } from "../hooks";

import { fetchProductsByFilters } from "../redux/slices/productsSlice";

import { FilterSidebar, ProductGrid } from "../components/Products";
import SortOption from "../components/Products/SortOption";
import { FilterIcon } from "lucide-react";

const CollectionPage = () => {
  const collections = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Fetch all the data by filters
  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        collections: String(collections),
        ...queryParams,
      }) as any
    );
  }, [dispatch, collections, searchParams]);

  // Scroll to top from initial
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEscapeKey({
    escapeCondition: isSidebarOpen,
    setEscapeCondition: setIsSidebarOpen,
  });
  useClickOutside(sidebarRef, () => setIsSidebarOpen(false), buttonRef);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        ref={buttonRef}
        className="lg:hidden border border-gray-200 p-2 flex justify-end items-center"
        onClick={toggleSidebar}
      >
        <FilterIcon className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* Sort Options */}
        <SortOption />

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
