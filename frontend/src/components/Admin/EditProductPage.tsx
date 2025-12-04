import { useEffect, useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import type { EditProduct } from "../../type/admin";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminProductSlice";

const API_URL = import.meta.env.VITE_BACKEND_URL;
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
      url: "",
    },
    {
      url: "",
    },
  ],
};

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state: any) => state.products
  );

  const [productData, setProductData] =
    useState<EditProduct>(initialProductData);
  const [isUploading, setIsUploading] = useState<boolean>(false);

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

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const data = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProductData((prevData) => ({
        ...prevData,
        images: [
          ...prevData.images,
          { url: data.imageUrl, altText: data.imageUrl },
        ],
      }));
      setIsUploading(false);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateProduct({ id, productData }) as any);
    navigate("/admin/products");
  };

  // Dispatch action to set the selectedProduct state due to the params
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails({ id }) as any);
    }
  }, [dispatch, id]);

  // Fetch the product details data
  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

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
