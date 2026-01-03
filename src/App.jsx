import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import OtpVerify from "./pages/OtpVerify";
import ProductListing from "./pages/ProductListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify" element={<OtpVerify />} />
        <Route path="/products" element={<ProductListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
