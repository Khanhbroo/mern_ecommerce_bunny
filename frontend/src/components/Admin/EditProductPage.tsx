import { useState, type ChangeEvent } from "react";
import type { EditProduct } from "../../type/admin";

const initialProductData: EditProduct = {
  name: "",
  description: "",
  price: 0,
  countInStock: 0,
  sku: "",
  category: "",
  brand: "",
  sizes: [],
  colors: [],
  collections: "",
  material: "",
  gender: "",
  images: [
    {
      url: "https://picsum.photos/150?random=1",
    },
    {
      url: "https://picsum.photos/150?random=2",
    },
  ],
};

const EditProductPage = () => {
  const [productData, setProductData] =
    useState<EditProduct>(initialProductData);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      Array.isArray(event.target.value) ||
      event.target.name === "sizes" ||
      event.target.name === "colors"
    ) {
      setProductData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value
          .split(",")
          .map((value) => value.trim()),
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    }

    // Another method to approach
    // const {name, value} = event.target;
    // setProductData(prevData => ({...prevData, [name]: value}))
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("Uploaded file:", file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Updated Product Data:", productData);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Product Name
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={productData.name}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block font-semibold mb-2">
            Product Description
          </label>
          <textarea
            required
            rows={5}
            name="description"
            id="description"
            value={productData.description}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label htmlFor="price" className="block font-semibold mb-2">
            Product Price
          </label>
          <input
            required
            type="number"
            step="1"
            min={0}
            name="price"
            id="price"
            value={productData.price}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label htmlFor="countInStock" className="block font-semibold mb-2">
            Count In Stock
          </label>
          <input
            required
            type="number"
            step="1"
            min={0}
            name="countInStock"
            id="countInStock"
            value={productData.countInStock}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label htmlFor="sku" className="block font-semibold mb-2">
            SKU
          </label>
          <input
            required
            type="text"
            name="sku"
            id="sku"
            value={productData.sku}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label htmlFor="sizes" className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>
          <input
            required
            type="text"
            name="sizes"
            id="sizes"
            value={productData.sizes.join(", ")}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label htmlFor="colors" className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>
          <input
            required
            type="text"
            name="colors"
            id="colors"
            value={productData.colors.join(", ")}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label htmlFor="image" className="block font-semibold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="border border-gray-300 px-3 py-2 rounded-md"
            onChange={handleImageUpload}
          />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
