import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import type { filtersSidebar } from "../../type/filtersSidebar";
import RadioRow from "../Common/RadioRow";
import CheckboxRow from "../Common/CheckboxRow";
import type { ReactFormState } from "react-dom/client";

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
  const [priceRange, setPriceRange] = useState<Array<number>>([0, 1000]);
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
      maxPrice: parseFloat(params.maxPrice) || 1000,
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

      {/* Color Filter */}
      <div className="mb-6">
        <label htmlFor="color" className="block text-grau-600 font-medium mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105"
              style={{
                backgroundColor: color.toLowerCase(),
              }}
            ></button>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Material
        </label>
        {materials.map((material) => (
          <CheckboxRow key={material} name={material}>
            {material}
          </CheckboxRow>
        ))}
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Size
        </label>
        {sizes.map((size) => (
          <CheckboxRow key={size} name={size}>
            {size}
          </CheckboxRow>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label htmlFor="brand" className="block text-gray-600 font-medium mb-2">
          Brand
        </label>
        {brands.map((brand) => (
          <CheckboxRow key={brand} name={brand}>
            {brand}
          </CheckboxRow>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label htmlFor="price" className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="price"
          min={0}
          max={1000}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
