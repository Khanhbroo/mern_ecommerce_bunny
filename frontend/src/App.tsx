import { BrowserRouter, Route, Routes } from "react-router";

import { UserLayout, AdminLayout } from "./components/Layout";
import { HomePage } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
