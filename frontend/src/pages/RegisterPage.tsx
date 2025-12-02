import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";

import register from "/register.webp";
import { registerUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

const RegisterPage = () => {
  const { user, guestId } = useSelector((state: any) => state.auth);
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // register?redirect=checkout
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(registerUser({ name, email, password }) as any);
  };

  // Check if user already existed, then navigate to checkout
  useEffect(() => {
    if (user) {
      // If there's any product in cart, then merge it from guest to user cart
      if (cart?.products.length > 0) {
        dispatch(mergeCart({ guestId }) as any).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "checkout" : "/");
      }
    }
  }, [dispatch, cart, user, guestId, navigate, isCheckoutRedirect]);

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col flex-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-300 shadow-md"
        >
          <div className="flex flex-center mb-6">
            <h2 className="text-xl font-medium">Bunny</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 🙌</h2>

          <p className="text-center mb-6">
            Enter your username and password to Login.
          </p>

          <div className="mb-4">
            <label htmlFor="name" className="block tesxt-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded-md outline-bunny-red/50"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block tesxt-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md outline-bunny-red/50"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block tesxt-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md outline-bunny-red/50"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            Sign Up
          </button>

          <p className="mt-6 text-center text-sm">
            Already had an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col flex-center">
          <img
            src={register}
            alt="Register to Accout"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
