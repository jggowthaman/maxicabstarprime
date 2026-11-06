import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

import {
  ShieldCheck,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  CarFront,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("maxicab_admin_token");

    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

 const handleLogin = async (event) => {
  event.preventDefault();
  setError("");

  const normalizedId = userId.trim().toLowerCase();

  if (!normalizedId || !password) {
    setError("Please enter your admin ID and password.");
    return;
  }

  setIsLoading(true);

  try {
    const response = await api.post("/auth/login", {
      username: normalizedId,
      password,
    });

    if (response.data?.success && response.data?.token) {
      sessionStorage.setItem(
        "maxicab_admin_authenticated",
        "true"
      );

      sessionStorage.setItem(
        "maxicab_admin_user",
        response.data.admin?.username || normalizedId
      );

      sessionStorage.setItem(
        "maxicab_admin_token",
        response.data.token
      );

      navigate("/admin/dashboard", { replace: true });
    } else {
      setError(response.data?.message || "Login failed. Please try again.");
    }
  } catch (err) {
    console.error("Admin login error:", err);
    console.error("Backend response:", err.response?.data);

    if (err.response?.status === 401) {
      setError("Invalid admin ID or password.");
    } else if (err.response?.status === 404) {
      setError("Login API not found. Check your backend route.");
    } else if (err.response) {
      setError(
        err.response.data?.message ||
          `Login failed. Server returned ${err.response.status}.`
      );
    } else {
      setError(
        "Cannot connect to the backend. Check whether the server is running."
      );
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B0B] px-4 py-10 text-[#F8F4EE] sm:px-6">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-[#D4AF37]/[0.05] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            aria-label="Return to website"
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]"
          >
            <CarFront size={34} strokeWidth={1.5} />
          </Link>

          <h1 className="text-2xl font-semibold tracking-wide sm:text-3xl">
            MAXICABSTAR <span className="text-[#D4AF37]">PRIME</span>
          </h1>

          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gray-500">
            Premium Singapore Transport
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-3xl border border-white/10 bg-[#111111]/95 p-6 shadow-2xl sm:p-9">
          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
              <ShieldCheck size={25} />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Admin Login
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to manage your bookings and customers.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-300"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Admin ID */}
            <div>
              <label
                htmlFor="admin-user-id"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Admin ID / Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="admin-user-id"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter admin ID or email"
                  value={userId}
                  onChange={(event) => {
                    setUserId(event.target.value);
                    setError("");
                  }}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 disabled:opacity-60"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] py-3.5 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 disabled:opacity-60"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#D4AF37]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-[#E6C65A] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Please wait...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials intentionally removed */}
          <div className="mt-6 rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#D4AF37]"
              />

              <p className="text-xs leading-5 text-gray-400">
                Authorized administrator access only. Your credentials
                are verified securely by the server.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/5 pt-5 text-xs text-gray-500">
            <ShieldCheck size={15} className="text-[#D4AF37]" />
            Administrator access
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-500 transition hover:text-[#D4AF37]"
          >
            ← Back to website
          </Link>

          <p className="mt-4 text-xs text-gray-700">
            © {new Date().getFullYear()} MaxiCabStar Prime
          </p>
        </div>
      </motion.div>
    </main>
  );
}