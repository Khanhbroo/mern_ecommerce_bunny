import { useDispatch } from "react-redux";

import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

import { Trash2 } from "lucide-react";

const CartContents = ({
  cartProducts,
  userId,
  guestId,
}: {
  cartProducts: {
    productId: string;
    image: string;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  userId?: string;
  guestId: string;
}) => {
  const dispatch = useDispatch();

  // Handle adding or substracting cart
  const handleAddToCart = ({
    productId,
    delta,
    quantity,
    size,
    color,
  }: {
    productId: string;
    delta: number;
    quantity: number;
    size: string;
    color: string;
  }) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          size,
          color,
          guestId,
          userId,
        }) as any
      );
    }
  };

  const handleRemoveFromCart = ({
    productId,
    size,
    color,
  }: Record<string, string>) => {
    dispatch(
      removeFromCart({ productId, size, color, guestId, userId }) as any
    );
  };

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
                Size: {product.size} | Color: {product.color}
              </p>
              <div
                className="flex items-center mt-2"
                onClick={() =>
                  handleAddToCart({
                    productId: product.productId,
                    delta: -1,
                    quantity: product.quantity,
                    size: product.size,
                    color: product.color,
                  })
                }
              >
                <button className="border border-gray-300 hover:border-gray-400 transition-colors rounded-sm px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  className="border border-gray-300 hover:border-gray-400 transition-colors rounded-sm px-2 py-1 text-xl font-medium"
                  onClick={() =>
                    handleAddToCart({
                      productId: product.productId,
                      delta: 1,
                      quantity: product.quantity,
                      size: product.size,
                      color: product.color,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>$ {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart({
                  productId: product.productId,
                  size: product.size,
                  color: product.color,
                })
              }
            >
              <Trash2 size={24} className="mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
