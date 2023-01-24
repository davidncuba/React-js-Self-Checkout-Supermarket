import { Routes, Route } from "react-router-dom";
import { Welcome } from "../components/pages/Welcome";
import NoMatch from "../components/pages/NoMatch";
import { Products } from "../components/pages/Products";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/product" element={<Products />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
