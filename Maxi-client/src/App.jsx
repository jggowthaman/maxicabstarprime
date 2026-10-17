
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import pages
import Home from "./pages/Home/Home";
import Booking from "./pages/Booking";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Vehicles from "./pages/Vehicles";
// import Contact from "./pages/Contact";
// import Booking from "./pages/Booking";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import TermsAndConditions from "./pages/TermsAndConditions";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F4EE] text-[#0B0B0B]">
        <Navbar />

        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />

          <Route path="/booking" element={<Booking />} />

          {/* <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} /> */}

          {/* Legal pages */}
          {/* <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          /> */}

          {/* 404 page */}
          <Route
            path="*"
            element={
              <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
                <h1 className="font-serif text-5xl font-semibold text-[#D4AF37]">
                  404
                </h1>
                <p className="mt-4 text-lg">
                  Sorry, this page could not be found.
                </p>
                <a
                  href="/"
                  className="mt-6 rounded-full bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0B0B] transition hover:bg-[#E6C65C]"
                >
                  Back to Home
                </a>
              </main>
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
