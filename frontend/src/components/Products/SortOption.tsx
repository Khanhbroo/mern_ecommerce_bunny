import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router";

const SortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;
    const params = new URLSearchParams();
    params.set("sortBy", sortBy);
    setSearchParams(params);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        name="sort"
        id="sort"
        value={searchParams.get("sortBy") || ""}
        className="border p-2 rounded-md focus:outline-none"
        onChange={handleSortChange}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOption;
