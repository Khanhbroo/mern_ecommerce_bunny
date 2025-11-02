import { Link } from "react-router";

const mockProducts = [
  {
    _id: 123,
    name: "Shirt",
    price: 110,
    sku: "SH-001",
  },
];

const ProductManagement = () => {
  const handleDelete = (productId: number) => {
    if (
      window.confirm(`Are you sure you want to delete product ${productId}?`)
    ) {
      console.log("Deleted product with ID:", productId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Skull</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.length > 0 ? (
              mockProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-300 hover:bg-gray-50 last:border-b-0 cursor-pointer transition"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-sm mr-2 transition hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-bunny-red text-white px-2 py-1 rounded-sm transition hover:bg-red-700"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
