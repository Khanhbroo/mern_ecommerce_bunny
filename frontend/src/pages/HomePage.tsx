import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductsByFilters } from "../redux/slices/productsSlice";

import axios from "axios";

import { Hero } from "../components/Common";
import {
  FeaturedCollection,
  FeaturesSection,
  GenderCollectionSection,
  NewArrival,
  ProductDetails,
  ProductGrid,
} from "../components/Products";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: any) => state.products
  );
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }) as any
    );

    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBestSeller();
  }, []);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrival />

      {/* Best seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller products ...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <div className="px-12 sm:px-0">
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
