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
          </Route>

          <Route path="/admin" element={<AdminLayout />}></Route>

          <Route
            path="*"
            element={
              <>
                <p>Not found</p>
                <Link
                  to="/"
                  className="py-4 px-6 bg-gray-500 hover:bg-gray-400 transition-colors rounded-full text-white inline-block"
                >
                  Back to Home
                </Link>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
