import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import GrantsPage from "./pages/GrantsPage";
import PhasesPage from "./pages/PhasesPage";
import TransparencyPage from "./pages/TransparencyPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import SubmitPitchPage from "./pages/SubmitPitchPage";
import AdminPage from "./pages/AdminPage";

// Capture referral code from URL and persist in localStorage
function ReferralCapture() {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("odb_referral_code", ref);
    }
  }, [location.search]);
  return null;
}

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);
  return null;
}

function AppInner() {
  return (
    <>
      <ReferralCapture />
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/grants" element={<GrantsPage />} />
          <Route path="/phases" element={<PhasesPage />} />
          <Route path="/transparency" element={<TransparencyPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/submit-pitch" element={<SubmitPitchPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </div>
  );
}

export default App;
