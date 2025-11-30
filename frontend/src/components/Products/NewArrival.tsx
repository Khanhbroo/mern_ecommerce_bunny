import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const NewArrival = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const [newArrivals, setNewArrivals] = useState([]);

  // Fetching new arrival items from database
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewArrivals();
  }, []);

  // Update scroll for checking button if can scroll left or right
  useEffect(() => {
    const container = scrollRef.current;

    if (container) {
      container?.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () =>
        container?.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  // Take scroll amount when clicking the button
  const scroll = (direction: string) => {
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Update Scroll Buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const scrollLeftWidth = container?.scrollLeft;
      const rightScrollable =
        container?.scrollWidth > scrollLeftWidth + container?.clientWidth;

      setCanScrollLeft(scrollLeftWidth > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  // Handle scrolling when using mouse
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(event.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current?.scrollLeft);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;

    event.preventDefault();

    const x = event.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;

    scrollRef.current.scrollLeft = scrollLeft - walk * 3;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="pb-20 sm:pb-12 pt-4 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-2 sm:mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-4 sm:mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="relative">
        <div
          ref={scrollRef}
          className={`container mx-auto overflow-x-scroll custom-scrollbar flex space-x-6 relative ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-full sm:min-w-[50%] lg:min-w-[30%] relative"
            >
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-[500px] object-cover rounded-lg hover:brightness-75 transition-all"
                draggable="false"
              />

              <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg">
                <Link
                  to={`/product/${product._id}`}
                  className="block"
                  target="_blank"
                >
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="mt-1">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Scroll Buttons */}
        <div className="absolute right-1/2 max-sm:translate-x-1/2 max-sm:bottom-[-50px] sm:right-16 sm:top-[-55px] flex space-x-2">
          <button
            className="p-2 rounded-sm border bg-white text-black border-gray-300 hover:border-gray-400 transition-all disabled:opacity-50  disabled:hover:border-gray-300"
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="text-2xl" />
          </button>

          <button
            className="p-2 rounded-sm border bg-white text-black border-gray-300 hover:border-gray-400 transition-all disabled:opacity-50  disabled:hover:border-gray-300"
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
          >
            <ChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
