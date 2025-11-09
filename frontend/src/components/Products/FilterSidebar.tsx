import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { RadioRow, CheckboxRow } from "../Common";
import { type FiltersSidebar } from "../../type/filtersSidebar";

const FilterSidebar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFitlers] = useState<FiltersSidebar>({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });
  const [priceRange, setPriceRange] = useState<Array<number>>([0, 1000]);

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

    const newFilters = {
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: parseFloat(params.minPrice) || 0,
      maxPrice: parseFloat(params.maxPrice) || 1000,
    };

    setFitlers(newFilters);

    setPriceRange([newFilters.minPrice, newFilters.maxPrice]);
  }, [searchParams]);

  const handleClearFilter = () => {
    const params = new URLSearchParams();
    setSearchParams(params);
  };

  const handleFilterChange = (event: HTMLInputElement) => {
    const { name, value, checked, type } = event;

    const newFilters = { ...filters } as FiltersSidebar;

    if (type === "checkbox") {
      const mutipleItems = newFilters[name] as string[];

      if (checked) {
        newFilters[name] = [...(mutipleItems || []), value] as string[];
      } else {
        newFilters[name] = mutipleItems.filter(
          (item) => item !== value
        ) as string[];
      }
    } else {
      newFilters[name] = value as string;
    }
    setFitlers(newFilters);
    updatedURLParams(newFilters);
  };

  const updatedURLParams = (newFilters: any) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(",")); // "XS,S"
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (event: any) => {
    const newPrice = event.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFitlers(newFilters);
    updatedURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button
          className="text-sm text-gray-500 hover:text-bunny-red transition"
          onClick={handleClearFilter}
        >
          Clear all
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-gray-600 font-medium mb-2"
        >
          Category
        </label>
        {categories.map((category) => (
          <RadioRow
            key={category}
            name="category"
            value={category}
            isChecked={filters.category === category}
            onChange={handleFilterChange}
          >
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
          <RadioRow
            key={gender}
            name="gender"
            value={gender}
            isChecked={filters.gender === gender}
            onChange={handleFilterChange}
          >
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
              value={color}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "border-gray-500" : ""
              }`}
              onClick={() =>
                handleFilterChange({
                  name: "color",
                  value: color,
                  checked: true,
                  type: "button",
                } as HTMLInputElement)
              }
              style={{
                backgroundColor: color.toLowerCase(),
              }}
            ></button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Size
        </label>
        {sizes.map((size) => (
          <CheckboxRow
            key={size}
            name="size"
            value={size}
            isChecked={filters.size.includes(size)}
            onChange={handleFilterChange}
          >
            {size}
          </CheckboxRow>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Material
        </label>
        {materials.map((material) => (
          <CheckboxRow
            key={material}
            name="material"
            value={material}
            isChecked={filters.material.includes(material)}
            onChange={handleFilterChange}
          >
            {material}
          </CheckboxRow>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label htmlFor="brand" className="block text-gray-600 font-medium mb-2">
          Brand
        </label>
        {brands.map((brand) => (
          <CheckboxRow
            key={brand}
            name="brand"
            value={brand}
            isChecked={filters.brand.includes(brand)}
            onChange={handleFilterChange}
          >
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
          value={priceRange[1]}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          onChange={handlePriceChange}
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
