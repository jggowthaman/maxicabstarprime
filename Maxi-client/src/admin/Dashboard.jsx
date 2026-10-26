
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
  ArrowRight,
  Plus,
  RefreshCw,
  TrendingUp,
  Users,
  Wallet,
  CalendarCheck,
  Plane,
  MapPin,
  Menu,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "—",
    description: "All-time reservations",
    icon: CalendarDays,
  },
  {
    title: "Pending Bookings",
    value: "—",
    description: "Awaiting confirmation",
    icon: Clock3,
  },
  {
    title: "Confirmed Bookings",
    value: "—",
    description: "Successfully confirmed",
    icon: CheckCircle2,
  },
  {
    title: "Total Customers",
    value: "—",
    description: "Registered customers",
    icon: Users,
  },
];

const quickActions = [
  {
    title: "Manage Bookings",
    description: "View and update reservations",
    icon: CalendarCheck,
    to: "/admin/bookings",
  },
  {
    title: "Manage Customers",
    description: "Review customer information",
    icon: Users,
    to: "/admin/customers",
  },
  {
    title: "View Website",
    description: "Visit the public website",
    icon: CarFront,
    to: "/",
  },
];

function StatCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="group rounded-2xl border border-white/10 bg-[#141414] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-[#181818]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400">{item.title}</p>

          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            {item.value}
          </h3>
        </div>

        <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-3 text-[#D4AF37] transition group-hover:bg-[#D4AF37]/20">
          <Icon size={22} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4">
        <TrendingUp size={15} className="text-[#D4AF37]" />
        <p className="text-xs text-gray-500">{item.description}</p>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    Confirmed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    Completed: "border-blue-400/20 bg-blue-400/10 text-blue-300",
    Cancelled: "border-red-400/20 bg-red-400/10 text-red-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
        styles[status] ||
        "border-white/10 bg-white/5 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshDashboard = () => {
    // Connect the dashboard API here when the backend is ready.
    setLastUpdated(new Date());
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] px-4 py-6 text-white sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                Administration
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Dashboard<span className="text-[#D4AF37]">.</span>
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Welcome to your MaxiCabStar Prime control centre.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={refreshDashboard}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#151515] px-4 py-3 text-sm text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <Link
              to="/admin/bookings"
              className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#E6C65C]"
            >
              <Plus size={17} />
              View Bookings
            </Link>
          </div>
        </motion.div>

        {/* System notice */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
              <Clock3 size={19} />
            </div>

            <div>
              <h2 className="text-sm font-medium text-white">
                Dashboard preview mode
              </h2>
              <p className="mt-1 text-xs leading-5 text-gray-400">
                Connect the Express API to display live booking and customer
                statistics.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full border border-[#D4AF37]/20 px-3 py-1 text-xs text-[#D4AF37]">
            API not connected
          </span>
        </div>

        {/* Statistics */}
        <section className="mb-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="mt-1 text-sm text-gray-500">
                Your business at a glance
              </p>
            </div>

            <span className="hidden text-xs text-gray-500 sm:block">
              Last refreshed: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <StatCard
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Recent bookings */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414] xl:col-span-2">
            <div className="flex flex-col justify-between gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:p-6">
              <div>
                <h2 className="text-lg font-semibold">Recent Bookings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  The latest customer reservations
                </p>
              </div>

              <Link
                to="/admin/bookings"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] transition hover:text-[#E6C65C]"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                      Booking
                    </th>
                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                      Pickup date
                    </th>
                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37]">
                        <CalendarDays size={25} />
                      </div>

                      <h3 className="mt-4 text-sm font-medium text-white">
                        No bookings to display
                      </h3>

                      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                        Once your backend is connected, customer reservations
                        will appear here automatically.
                      </p>

                      <Link
                        to="/admin/bookings"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                      >
                        Open bookings
                        <ArrowUpRight size={16} />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-white/10 px-5 py-4 sm:px-6">
              <p className="text-xs text-gray-500">
                Showing recent booking records when available.
              </p>
            </div>
          </section>

          {/* Quick actions */}
          <section className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              <p className="mt-1 text-sm text-gray-500">
                Frequently used admin tools
              </p>
            </div>

            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;

                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + index * 0.08,
                    }}
                  >
                    <Link
                      to={action.to}
                      className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
                    >
                      <div className="rounded-lg border border-[#D4AF37]/15 bg-[#D4AF37]/10 p-3 text-[#D4AF37]">
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                          {action.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {action.description}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-gray-600 transition group-hover:text-[#D4AF37]"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Booking status guide */}
            <div className="mt-7 border-t border-white/10 pt-6">
              <h3 className="mb-4 text-sm font-semibold">
                Booking Status Guide
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-400">Pending</span>
                  <StatusBadge status="Pending" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-400">Confirmed</span>
                  <StatusBadge status="Confirmed" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-400">Completed</span>
                  <StatusBadge status="Completed" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-400">Cancelled</span>
                  <StatusBadge status="Cancelled" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MaxiCabStar Prime. Admin Panel.
          </p>

          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Waiting for backend connection
          </p>
        </div>
      </div>
    </div>
  );
}
