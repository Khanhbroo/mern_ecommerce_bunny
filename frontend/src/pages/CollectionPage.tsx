import { useEffect, useRef, useState } from "react";

import type { mockProducts } from "../type/products";
import { FilterIcon } from "lucide-react";
import { FilterSidebar } from "../components/Products";

const fetchedProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=3" }],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=4" }],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=5" }],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=6" }],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=7" }],
  },
  {
    _id: 6,
    name: "Product 6",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=8" }],
  },
  {
    _id: 7,
    name: "Product 7",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=9" }],
  },
  {
    _id: 8,
    name: "Product 8",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=10" }],
  },
] as mockProducts;

const CollectionPage = () => {
  const [products, setProducts] = useState<mockProducts>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setProducts(fetchedProducts);
    }, 2000);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Close sidebar if clicked outside
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        className="lg:hidden border border-gray-200 p-2 flex justify-end items-center"
        onClick={toggleSidebar}
      >
        <FilterIcon className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <FilterSidebar />
      </div>
    </div>
  );
};

export default CollectionPage;
