import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import type { PaypalUserDetails, ShippingAddress } from "../../type/checkout";
import { PaypalButton } from "./";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

// As there's no other payment, I set the payment method now is Paypal, this can later be changed
const PAYMENT_METHOD = "Paypal";
// API URL
const API_URL = import.meta.env.VITE_BACKEND_URL;

const Checkout = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { cart, loading, error } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
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

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: PAYMENT_METHOD,
          totalPrice: cart.totalPrice,
        } as any) as any
      );

      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); // Set the checkout ID if creating checkout successfully
      }
    }
  };

  const handlePaymentSuccess = async (details: PaypalUserDetails) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("userToken") as string
            )}`,
          },
        }
      );

      if (response.status === 200) {
        await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment is successful
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
    navigate("/order-confirmation");
  };

  const handleFinalizeCheckout = async (checkoutId: number | null) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("userToken") as string
            )}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/order-confirmation");
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center">Loading cart...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty!</p>;
  }

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
              value={user ? user.email : "No email provided"}
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
                  amount={cart.totalPrice}
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
                  className="w-20 h-24 object-cover mr-4"
                />

                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                  <p className="text-gray-500">Quantity: {product.quantity}</p>
                </div>
              </div>

              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>

        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>{cart.shippingFee ? `$${cart.shippingFee}` : "Free"}</p>
        </div>

        <div className="flex justify-between items-center text-lg mt-4 border-t border-gray-300 pt-4">
          <p>Total</p>
          <p>
            $
            {(cart.shippingFee
              ? cart.totalPrice - cart.shippingFee
              : cart.totalPrice
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
