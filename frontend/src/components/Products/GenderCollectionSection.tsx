import { Link } from "react-router";
import menCollectionImage from "/men-collection.jpg";
import womenCollectionImage from "/women-collection.jpg";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0 ">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women Collection */}
        <div className="relative flex-1 rounded-2xl overflow-hidden">
          <img
            src={womenCollectionImage}
            alt="Women's collection"
            className="w-full h-[400px] md:h-[500px] xl:h-[700px] object-cover hover:brightness-75 duration-300 transition-all"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4 mb-3 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900">
              Women&apos;s Collection
            </h2>
            <Link
              to="/collections/all?gender=Female"
              className="text-gray-900 hover:text-gray-700 transition-colors underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men Collection */}
        <div className="relative flex-1 rounded-2xl overflow-hidden">
          <img
            src={menCollectionImage}
            alt="Men's collection"
            className="w-full h-[400px] md:h-[500px] xl:h-[700px] object-cover object-top hover:brightness-75 duration-300 transition-all"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4 mb-3 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Men&apos;s Collection
            </h2>
            <Link
              to="/collections/all?gender=Male"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
