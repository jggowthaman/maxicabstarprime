
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  CarFront,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    label: "OVERVIEW",
    items: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        name: "Bookings",
        path: "/admin/bookings",
        icon: CalendarDays,
      },
      {
        name: "Customers",
        path: "/admin/customers",
        icon: Users,
      },
    ],
  },
  {
    label: "PREFERENCES",
    items: [
      {
        name: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

function SidebarContent({ onNavigate, onLogout }) {
  return (
    <div className="flex h-full flex-col bg-[#101010] text-[#F8F4EE]">
      {/* Brand */}
      <div className="flex h-[84px] items-center gap-3 border-b border-white/[0.07] px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
          <CarFront className="text-[#D4AF37]" size={25} />
        </div>

        <div>
          <h1 className="text-sm font-bold tracking-[0.12em]">
            MAXICABSTAR
          </h1>

          <p className="mt-1 text-[10px] tracking-[0.35em] text-[#D4AF37]">
            PRIME ADMIN
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-7">
        {navigation.map((group) => (
          <div key={group.label}>
            <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.2em] text-gray-500">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/admin/dashboard"}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 ${
                        isActive
                          ? "bg-[#D4AF37] text-[#0B0B0B]"
                          : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-center gap-3">
                          <Icon size={19} />

                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </span>

                        {isActive && (
                          <ChevronRight size={16} />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Website shortcut */}
      <div className="border-t border-white/[0.07] p-4">
        <NavLink
          to="/"
          onClick={onNavigate}
          className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
        >
          <span>View Website</span>
          <ExternalLink size={16} />
        </NavLink>

        <button
          type="button"
          onClick={onLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F8F4EE]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-white/[0.07] lg:block">
        <SidebarContent onLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close sidebar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] lg:hidden"
            >
              <div className="relative h-full">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setSidebarOpen(false)}
                  className="absolute right-3 top-6 z-10 rounded-lg p-2 text-gray-400 hover:bg-white/10"
                >
                  <X size={20} />
                </button>

                <SidebarContent
                  onNavigate={() => setSidebarOpen(false)}
                  onLogout={handleLogout}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[84px] items-center justify-between border-b border-white/[0.07] bg-[#0B0B0B]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-white/10 p-2 text-gray-300 hover:border-[#D4AF37]/40 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-[10px] tracking-[0.22em] text-[#D4AF37]">
                MAXICABSTAR PRIME
              </p>

              <h2 className="mt-1 text-sm font-semibold sm:text-base">
                Administration
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">Administrator</p>
              <p className="mt-1 text-xs text-gray-500">
                Booking Management
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-sm font-semibold text-[#D4AF37]">
              A
            </div>
          </div>
        </header>

        <main className="min-w-0 p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>

        <footer className="border-t border-white/[0.07] px-5 py-5 text-center text-xs text-gray-500 lg:text-left lg:px-10">
          © {new Date().getFullYear()} MaxiCabStar Prime. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
