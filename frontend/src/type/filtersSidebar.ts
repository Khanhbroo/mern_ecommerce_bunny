export type FiltersSidebar = {
  category: string;
  gender: string;
  color: string;
  size: string[];
  material: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
  [key: string]: string | string[] | number;
};
