import { Link } from "react-router";
import type { Products } from "../../type/products";

const ProductGrid = ({
  products,
  loading,
  error,
}: {
  products: Products;
  loading: boolean;
  error: string;
}) => {
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {products.map((product, index) => (
        <div className="flex flex-col py-4" key={index}>
          <Link
            to={`/product/${product._id}`}
            className="block mb-4"
            target="_blank"
          >
            <div className="bg-white rounded-lg">
              <div className="w-full h-80">
                <img
                  src={product.images[0].url}
                  alt={product.images[0].url || product.name}
                  className="w-full h-full object-cover rounded-lg hover:brightness-75 transition-all"
                />
              </div>
            </div>
          </Link>
          <h3 className="text-sm mb-2">{product.name}</h3>
          <p className="text-gray-500 font-medium text-sm tracking-tigher">
            ${product.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
