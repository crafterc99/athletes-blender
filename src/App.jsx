import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import ToastContainer from "./components/ui/ToastContainer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AccountLayout from "./components/account/AccountLayout";

import Home from "./pages/Home";
import Build from "./pages/Build";
import HowItWorksPage from "./pages/HowItWorks";
import Blender from "./pages/Blender";
import Teams from "./pages/Teams";
import SeekTruth from "./pages/SeekTruth";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import OrderConfirmation from "./pages/OrderConfirmation";

import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import AccountDashboard from "./pages/account/AccountDashboard";
import OrderHistory from "./pages/account/OrderHistory";
import OrderDetail from "./pages/account/OrderDetail";
import SubscriptionManagement from "./pages/account/SubscriptionManagement";
import Profile from "./pages/account/Profile";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build" element={<Build />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/blender" element={<Blender />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/seek-truth" element={<SeekTruth />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* Auth (no navbar layout) */}
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />

          {/* Protected account routes */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AccountDashboard />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="subscription" element={<SubscriptionManagement />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
