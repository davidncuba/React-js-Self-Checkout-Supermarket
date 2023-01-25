import { Routes, Route } from "react-router-dom";
import { Welcome } from "../components/pages/Welcome";
import NoMatch from "../components/pages/NoMatch";
import { Products } from "../components/pages/Products";
import { Checkout } from "../components/pages/Checkout";
import EditPriceAndDiscount from "../components/pages/EditPriceAndDiscount";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/product" element={<Products />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/price" element={<EditPriceAndDiscount />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
