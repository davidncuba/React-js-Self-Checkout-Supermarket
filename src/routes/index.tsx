import { Routes, Route } from "react-router-dom";
import { Welcome } from "../components/pages/Welcome";
import NoMatch from "../components/pages/NoMatch";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
