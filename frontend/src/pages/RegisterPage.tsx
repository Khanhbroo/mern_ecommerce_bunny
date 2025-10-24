import { useState } from "react";
import { Link } from "react-router";

import register from "/register.webp";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("User Register", { name, email, password });
  };

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
