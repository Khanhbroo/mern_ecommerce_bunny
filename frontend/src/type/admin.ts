export type UserManagement = {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "customer";
};

export type EditProduct = {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  sku: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  collections: string;
  material: string;
  gender: string;
  images: {
    url: string;
  }[];
};
