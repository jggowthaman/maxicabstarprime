
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CalendarDays,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  CarFront,
  MapPin,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";

import StatusBadge from "../admin-components/StatusBadge";

const initialBookings = [
  {
    id: "MCB-1001",
    customer: "Arun Kumar",
    email: "arun@example.com",
    phone: "+65 8123 4567",
    pickup: "Changi Airport",
    destination: "Marina Bay Sands",
    date: "2026-10-27",
    time: "10:30 AM",
    vehicle: "Premium Sedan",
    passengers: 2,
    amount: 85,
    status: "Confirmed",
  },
  {
    id: "MCB-1002",
    customer: "Priya Sharma",
    email: "priya@example.com",
    phone: "+65 9234 5678",
    pickup: "Orchard Road",
    destination: "Sentosa Island",
    date: "2026-10-27",
    time: "12:00 PM",
    vehicle: "Luxury SUV",
    passengers: 4,
    amount: 120,
    status: "Pending",
  },
  {
    id: "MCB-1003",
    customer: "Michael Tan",
    email: "michael@example.com",
    phone: "+65 8345 6789",
    pickup: "Marina Bay",
    destination: "Changi Airport",
    date: "2026-10-28",
    time: "08:00 AM",
    vehicle: "Business Class",
    passengers: 3,
    amount: 95,
    status: "Completed",
  },
  {
    id: "MCB-1004",
    customer: "Sarah Lee",
    email: "sarah@example.com",
    phone: "+65 9456 7890",
    pickup: "Jurong East",
    destination: "Singapore Zoo",
    date: "2026-10-28",
    time: "02:30 PM",
    vehicle: "Premium MPV",
    passengers: 5,
    amount: 110,
    status: "Confirmed",
  },
  {
    id: "MCB-1005",
    customer: "Daniel Wong",
    email: "daniel@example.com",
    phone: "+65 8567 8901",
    pickup: "Changi Airport",
    destination: "Orchard Road",
    date: "2026-10-29",
    time: "06:15 PM",
    vehicle: "Premium Sedan",
    passengers: 2,
    amount: 75,
    status: "Cancelled",
  },
  {
    id: "MCB-1006",
    customer: "Emily Chen",
    email: "emily@example.com",
    phone: "+65 9678 9012",
    pickup: "Sentosa Island",
    destination: "Marina Bay Sands",
    date: "2026-10-29",
    time: "09:45 AM",
    vehicle: "Luxury SUV",
    passengers: 4,
    amount: 130,
    status: "Pending",
  },
  {
    id: "MCB-1007",
    customer: "Kevin Lim",
    email: "kevin@example.com",
    phone: "+65 8789 0123",
    pickup: "Bugis",
    destination: "Changi Airport",
    date: "2026-10-30",
    time: "11:00 AM",
    vehicle: "Business Class",
    passengers: 2,
    amount: 90,
    status: "Confirmed",
  },
  {
    id: "MCB-1008",
    customer: "Jessica Ong",
    email: "jessica@example.com",
    phone: "+65 9890 1234",
    pickup: "Woodlands",
    destination: "Orchard Road",
    date: "2026-10-30",
    time: "04:00 PM",
    vehicle: "Premium MPV",
    passengers: 6,
    amount: 145,
    status: "Completed",
  },
];

const filters = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const statusStyles = {
  Pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Confirmed: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  Completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Cancelled: "border-red-500/20 bg-red-500/10 text-red-400",
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-SG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function BookingStat({ title, value, icon: Icon, description }) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#111111] p-5 transition duration-300 hover:border-[#D4AF37]/40">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-400">{title}</p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
          <Icon size={19} />
        </div>
      </div>

      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
        {value}
      </h3>

      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default function Bookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [statusMenu, setStatusMenu] = useState(null);

  const itemsPerPage = 6;

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !query ||
        booking.id.toLowerCase().includes(query) ||
        booking.customer.toLowerCase().includes(query) ||
        booking.phone.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query) ||
        booking.pickup.toLowerCase().includes(query) ||
        booking.destination.toLowerCase().includes(query);

      const matchesStatus =
        activeFilter === "All" || booking.status === activeFilter;

      const matchesDate = !dateFilter || booking.date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bookings, search, activeFilter, dateFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / itemsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: CalendarDays,
      description: "All bookings in this demo",
    },
    {
      title: "Pending",
      value: bookings.filter((b) => b.status === "Pending").length,
      icon: Clock3,
      description: "Awaiting confirmation",
    },
    {
      title: "Confirmed",
      value: bookings.filter((b) => b.status === "Confirmed").length,
      icon: CheckCircle2,
      description: "Confirmed reservations",
    },
    {
      title: "Completed",
      value: bookings.filter((b) => b.status === "Completed").length,
      icon: Users,
      description: "Successfully completed trips",
    },
  ];

  const changeStatus = (bookingId, newStatus) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );

    setStatusMenu(null);
  };

  const resetFilters = () => {
    setSearch("");
    setActiveFilter("All");
    setDateFilter("");
    setPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[#D4AF37]">
              <span className="h-px w-7 bg-[#D4AF37]" />
              MaxiCabStar Prime
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Bookings
              <span className="text-[#D4AF37]">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
              Manage reservations, track trip statuses, and review customer
              booking information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] sm:self-auto"
          >
            Dashboard
            <ArrowUpRight size={17} />
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <BookingStat key={stat.title} {...stat} />
          ))}
        </div>

        {/* Booking management */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111]">
          {/* Table header */}
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-semibold">All Reservations</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Review and manage customer trips.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search bookings..."
                    aria-label="Search bookings"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D4AF37]/60 sm:w-64"
                  />
                </div>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setPage(1);
                    }}
                    aria-label="Filter by travel date"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] py-3 pl-10 pr-3 text-sm text-gray-300 outline-none focus:border-[#D4AF37]/60 sm:w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Status filters */}
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
              <SlidersHorizontal
                size={17}
                className="mr-1 shrink-0 text-gray-500"
              />

              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => handleFilter(filter)}
                    className={`shrink-0 rounded-lg border px-4 py-2 text-xs font-medium transition ${
                      isActive
                        ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                        : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-[#D4AF37]/40 hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={resetFilters}
                title="Reset filters"
                className="ml-auto flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              >
                <RotateCcw size={14} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Bookings table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                  {[
                    "Booking ID",
                    "Customer",
                    "Journey",
                    "Travel Date",
                    "Vehicle",
                    "Amount",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.05]">
                {paginatedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="transition hover:bg-white/[0.025]"
                  >
                    {/* Booking ID */}
                    <td className="px-5 py-5">
                      <span className="text-sm font-semibold text-[#D4AF37]">
                        {booking.id}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-sm font-semibold text-[#D4AF37]">
                          {booking.customer
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="whitespace-nowrap text-sm font-medium text-white">
                            {booking.customer}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {booking.phone}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Journey */}
                    <td className="px-5 py-5">
                      <div className="max-w-[220px] space-y-2">
                        <p className="flex items-start gap-2 text-xs text-gray-300">
                          <span className="mt-0.5 text-emerald-400">
                            <MapPin size={13} />
                          </span>
                          <span>{booking.pickup}</span>
                        </p>

                        <p className="flex items-start gap-2 text-xs text-gray-500">
                          <span className="mt-0.5 text-[#D4AF37]">
                            <MapPin size={13} />
                          </span>
                          <span>{booking.destination}</span>
                        </p>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-5">
                      <p className="text-sm text-gray-200">
                        {formatDate(booking.date)}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {booking.time}
                      </p>
                    </td>

                    {/* Vehicle */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-300">
                        <CarFront size={17} className="text-[#D4AF37]" />
                        {booking.vehicle}
                      </div>
                      <p className="ml-6 mt-1 text-xs text-gray-500">
                        {booking.passengers} passengers
                      </p>
                    </td>

                    {/* Amount */}
                    <td className="whitespace-nowrap px-5 py-5">
                      <span className="text-sm font-semibold text-white">
                        S${booking.amount.toFixed(2)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-5">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setStatusMenu(
                              statusMenu === booking.id ? null : booking.id
                            )
                          }
                          aria-label={`Change status for ${booking.id}`}
                          className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${
                            statusStyles[booking.status] ||
                            "border-white/10 bg-white/5 text-gray-300"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {booking.status}
                        </button>

                        {statusMenu === booking.id && (
                          <div className="absolute left-0 top-full z-20 mt-2 min-w-36 overflow-hidden rounded-xl border border-white/10 bg-[#191919] p-1 shadow-xl">
                            {filters
                              .filter((status) => status !== "All")
                              .map((status) => (
                                <button
                                  key={status}
                                  type="button"
                                  onClick={() =>
                                    changeStatus(booking.id, status)
                                  }
                                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs transition hover:bg-white/[0.06] ${
                                    booking.status === status
                                      ? "text-[#D4AF37]"
                                      : "text-gray-300"
                                  }`}
                                >
                                  {status}
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-5">
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/admin/bookings/" + booking.id, {
                            state: { booking },
                          })
                        }
                        aria-label={`View booking ${booking.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-gray-400 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedBookings.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-20 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-gray-500">
                        {activeFilter === "Cancelled" ? (
                          <XCircle size={25} />
                        ) : (
                          <Search size={25} />
                        )}
                      </div>

                      <h3 className="mt-4 text-base font-medium text-white">
                        No bookings found
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Try another search term or change your filters.
                      </p>

                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-5 text-sm font-medium text-[#D4AF37] hover:underline"
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col justify-between gap-4 border-t border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-300">
                {filteredBookings.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}
                {"–"}
                {Math.min(currentPage * itemsPerPage, filteredBookings.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-300">
                {filteredBookings.length}
              </span>{" "}
              bookings
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((previous) => Math.max(1, previous - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`h-9 min-w-9 rounded-lg border px-3 text-xs font-medium transition ${
                      currentPage === pageNumber
                        ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                        : "border-white/10 text-gray-400 hover:border-[#D4AF37]/40 hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  setPage((previous) => Math.min(totalPages, previous + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Demo data notice */}
        <p className="mt-5 text-center text-xs leading-5 text-gray-600">
          Demo mode: booking information is sample data. Status changes are
          temporary and will reset when the page reloads.
        </p>
      </div>
    </div>
  );
}
