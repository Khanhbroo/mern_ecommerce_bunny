import { BrowserRouter, Link, Route, Routes } from "react-router";

import { UserLayout, AdminLayout } from "./components/Layout";
import {
  CollectionPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "./pages";
import { Toaster } from "sonner";
import { ProductDetails } from "./components/Products";
import { Checkout } from "./components/Cart";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route
              path="collection/:collectionId"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}></Route>

          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col flex-center container p-8 mx-auto">
                <p className="font-medium text-3xl lg:text-4xl mb-12">
                  Sorry, it's seem like you've entered the wrong URL
                </p>
                <Link
                  to="/"
                  className="py-4 px-6 bg-gray-500 hover:bg-gray-400 transition-colors rounded-full text-white inline-block"
                >
                  Back to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
