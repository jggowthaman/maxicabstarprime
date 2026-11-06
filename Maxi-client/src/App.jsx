
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
} from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Website Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Booking from "./pages/Booking";
import Services from "./pages/Services/Services";
import Vehicles from "./pages/Vehicles/Vehicles";
import Contact from "./pages/Contact/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

// Admin Pages
import Dashboard from "./admin/Dashboard";
import Bookings from "./admin/Bookings";
import BookingDetails from "./admin/BookingDetails";
import Customers from "./admin/Customers";
import Settings from "./admin/Settings";
import AdminLogin from "./admin/AdminLogin";


// Floating WhatsApp Button
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Authentication key
const AUTH_KEY = "maxicab_admin_authenticated";

// Protect admin routes
function ProtectedAdminRoute() {
  const isAuthenticated =
    sessionStorage.getItem(AUTH_KEY) === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

// 404 Page
function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0B0B] px-4 text-center text-[#F8F4EE]">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
        Page Not Found
      </p>

      <h1 className="text-7xl font-bold text-[#D4AF37] sm:text-8xl">
        404
      </h1>

      <p className="mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
        Sorry, the page you are looking for does not exist or may have been
        moved.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#E6C65A]"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC WEBSITE */}
        <Route
          path="/"
          element={
            <>
              <MainLayout />
              <FloatingWhatsApp />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="booking" element={<Booking />} />
          <Route path="services" element={<Services />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route
  path="terms-and-conditions"
  element={<TermsAndConditions />}
/>

        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* PROTECTED ADMIN PANEL */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* Default admin route */}
            <Route
              index
              element={
                <Navigate
                  to="/admin/dashboard"
                  replace
                />
              }
            />

            {/* Dashboard */}
            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            {/* Bookings */}
            <Route
              path="bookings"
              element={<Bookings />}
            />

            {/* Booking Details */}
            <Route
              path="bookings/:id"
              element={<BookingDetails />}
            />

            {/* Customers */}
            <Route
              path="customers"
              element={<Customers />}
            />

            {/* Settings */}
            <Route
              path="settings"
              element={<Settings />}
            />
          </Route>
        </Route>

        {/* 404 PAGE */}
        <Route
          path="*"
          element={<NotFound />}
        />

        
      </Routes>
    </BrowserRouter>
  );
}
