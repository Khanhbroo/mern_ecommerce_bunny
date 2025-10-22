import { Hero } from "../components/Common";
import { GenderCollectionSection, NewArrival } from "../components/Products";
import ProductDetails from "../components/Products/ProductDetails";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrival />

      {/* Best seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />
    </div>
  );
};

export default HomePage;
