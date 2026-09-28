import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import BuGun from "./pages/BuGun";
import Statistika from "./pages/Statistika";
import Tarixce from "./pages/Tarixce";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<BuGun />} />
        <Route
          path="/statistika"
          element={<Statistika />}
        />
        <Route
          path="/tarixce"
          element={<Tarixce />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
