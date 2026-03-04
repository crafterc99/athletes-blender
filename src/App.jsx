import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Build from "./pages/Build";
import HowItWorksPage from "./pages/HowItWorks";
import Blender from "./pages/Blender";
import Teams from "./pages/Teams";
import SeekTruth from "./pages/SeekTruth";
import FAQ from "./pages/FAQ";
import Account from "./pages/Account";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<Build />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/blender" element={<Blender />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/seek-truth" element={<SeekTruth />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
