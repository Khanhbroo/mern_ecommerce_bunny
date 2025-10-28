import { useState } from "react";
import { useNavigate } from "react-router";

import type { PaypalUserDetails, ShippingAddress } from "../../type/checkout";
import { PaypalButton } from "./";

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://picsum.photos/150?random=1",
    },
    {
      name: "Casual Sneakers",
      size: "42",
      color: "White",
      price: 75,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  get totalPrice() {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  },
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState<number | null>(null);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (event: React.FormEvent) => {
    event.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details: PaypalUserDetails) => {
    console.log("Payment Successful", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              required
              id="email"
              type="email"
              value="user@example.com"
              className="w-full p-2 border border-gray-300 rounded-sm bg-gray-100 outline-bunny-red/60"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                required
                id="firstName"
                type="text"
                value={shippingAddress.firstName}
                className="w-full p-2 border border-gray-300 rounded-sm outline-bunny-red/60"
                onChange={(event) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
              </label>
              <input
                required
                id="lastName"
                type="text"
                value={shippingAddress.lastName}
                className="w-full p-2 border border-gray-300 rounded-sm outline-bunny-red/60"
                onChange={(event) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">
              Address
            </label>
            <input
              required
              id="address"
              type="text"
              value={shippingAddress.address}
              className="w-full p-2 border border-gray-300 rounded-sm outline-bunny-red/60"
              onChange={(event) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: event.target.value,
                })
              }
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-gray-700">
                City
              </label>
              <input
                required
                id="city"
                type="text"
                value={shippingAddress.city}
                className="w-full p-2 border border-gray-300 rounded-sm outline-bunny-red/60"
                onChange={(event) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-gray-700">
                Postal Code
              </label>
              <input
                required
                id="postalCode"
                type="text"
                value={shippingAddress.postalCode}
                className="w-full p-2 border border-gray-300 rounded-sm outline-bunny-red/60"
                onChange={(event) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700">
              Country
            </label>
            <input
              required
              id="country"
              type="text"
              value={shippingAddress.country}
              className="w-full p-2 border border-gray-300 rounded-sm outline-bunny-red/60"
              onChange={(event) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: event.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone Number
            </label>
            <input
              required
              id="phone"
              type="tel"
              value={shippingAddress.phone}
              className="w-full p-2 border border-gray-300 rounded-sm outline-bunny-red/60"
              onChange={(event) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: event.target.value,
                })
              }
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-sm hover:bg-black/80 transition-colors"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                {/* Paypal Component */}
                <PaypalButton
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  onError={(error) => {
                    alert("Payment Failed. Try Again.");
                    console.log(error);
                  }}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t border-gray-300 py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b border-gray-300"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr0-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
