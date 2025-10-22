import { Hero } from "../components/Common";
import {
  GenderCollectionSection,
  NewArrival,
  ProductDetails,
} from "../components/Products";

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
