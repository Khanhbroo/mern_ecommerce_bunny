import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

const NewArrival = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Classic White Shirt",
      price: 75,
      images: [
        {
          url: "https://picsum.photos/500/500?random=2",
          altText: "Classic White Shirt",
        },
      ],
    },
    {
      _id: "3",
      name: "Denim Jeans",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=3",
          altText: "Denim Jeans",
        },
      ],
    },
    {
      _id: "4",
      name: "Casual Sneakers",
      price: 110,
      images: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Casual Sneakers",
        },
      ],
    },
    {
      _id: "5",
      name: "Cotton Hoodie",
      price: 95,
      images: [
        {
          url: "https://picsum.photos/500/500?random=5",
          altText: "Cotton Hoodie",
        },
      ],
    },
    {
      _id: "6",
      name: "Leather Belt",
      price: 45,
      images: [
        {
          url: "https://picsum.photos/500/500?random=6",
          altText: "Leather Belt",
        },
      ],
    },
    {
      _id: "7",
      name: "Slim Fit Trousers",
      price: 100,
      images: [
        {
          url: "https://picsum.photos/500/500?random=7",
          altText: "Slim Fit Trousers",
        },
      ],
    },
    {
      _id: "8",
      name: "Woolen Scarf",
      price: 60,
      images: [
        {
          url: "https://picsum.photos/500/500?random=8",
          altText: "Woolen Scarf",
        },
      ],
    },
  ];

  // Update scroll for checking button if can scroll left or right
  useEffect(() => {
    const container = scrollRef.current;

    if (container) {
      container?.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () =>
        container?.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

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
