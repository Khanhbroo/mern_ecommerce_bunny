import { BrowserRouter, Route, Routes } from "react-router";

import { UserLayout, AdminLayout } from "./components/Layout";
import { HomePage, LoginPage, ProfilePage, RegisterPage } from "./pages";
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
          </Route>

          <Route path="/admin" element={<AdminLayout />}></Route>

          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
