import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import type { filtersSidebar } from "../../type/filtersSidebar";
import RadioRow from "../Common/RadioRow";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFitlers] = useState<filtersSidebar>({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState<Array<number>>([0, 100]);
  const filterInputRef = useRef<HTMLInputElement | null>(null);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Rabbit",
    "Hop Couture",
    "BunnyWear",
    "Fluffy Threads",
    "Midnight Bunny",
    "Carrot & Co",
  ];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFitlers({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.band.split(",") : [],
      minPrice: parseFloat(params.minPrice) || 0,
      maxPrice: parseFloat(params.maxPrice) || 0,
    });
    setPriceRange([filters.minPrice, filters.maxPrice]);
  }, [searchParams]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-gray-600 font-medium mb-2"
        >
          Category
        </label>
        {categories.map((category) => (
          <RadioRow key={category} name="category">
            {category}
          </RadioRow>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label
          htmlFor="gender"
          className="block text-gray-600 font-medium mb-2"
        >
          Gender
        </label>
        {genders.map((gender) => (
          <RadioRow key={gender} name="gender">
            {gender}
          </RadioRow>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
