import { Trash2 } from "lucide-react";

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Polos",
      size: "XL",
      color: "Green",
      quantity: 10,
      price: 12,
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: 3,
      name: "Sweater",
      size: "L",
      color: "Blue",
      quantity: 3,
      price: 18,
      image: "https://picsum.photos/200?random=3",
    },
    {
      productId: 4,
      name: "Hoodie",
      size: "XXL",
      color: "Cyan",
      quantity: 2,
      price: 35,
      image: "https://picsum.photos/200?random=4",
    },
    {
      productId: 5,
      name: "Cardigan",
      size: "SM",
      color: "Yellow",
      quantity: 8,
      price: 25,
      image: "https://picsum.photos/200?random=5",
    },
  ];

  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded-sm"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border border-gray-300 hover:border-gray-400 transition-colors rounded-sm px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border border-gray-300 hover:border-gray-400 transition-colors rounded-sm px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>$ {product.price.toLocaleString()}</p>
            <button>
              <Trash2 size={24} className="mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
