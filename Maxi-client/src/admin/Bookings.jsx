
import { useCallback, useEffect, useMemo, useState } from "react";
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
  RefreshCw,
} from "lucide-react";
import api from "../api/axios";

const filters = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const statusStyles = {
  Pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Confirmed: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  Completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Cancelled: "border-red-500/20 bg-red-500/10 text-red-400",
};

const formatDate = (date) => {
  if (!date) return "—";

  const dateString =
    typeof date === "string" ? date.slice(0, 10) : date;

  const parsed = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return dateString;

  return parsed.toLocaleDateString("en-SG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (time) => {
  if (!time) return "—";

  const value = String(time).slice(0, 5);
  const [hours, minutes] = value.split(":");

  if (hours === undefined || minutes === undefined) return value;

  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Extract customer information from special_requests.
// Home2.jsx currently saves details in this format:
// Customer name: ...
// Customer phone: ...
// Customer email: ...
const getCustomerDetails = (booking) => {
  const notes = booking.special_requests || "";

  const getValue = (label) => {
    const line = notes
      .split("\n")
      .find((item) =>
        item.toLowerCase().startsWith(`${label.toLowerCase()}:`)
      );

    return line ? line.substring(label.length + 1).trim() : "";
  };

  return {
    name: getValue("Customer name") || `Customer #${booking.customer_id ?? "N/A"}`,
    phone: getValue("Customer phone") || "Phone not provided",
    email: getValue("Customer email") || "",
    tripType: getValue("Trip type") || "",
  };
};

const normalizeStatus = (status) => {
  const value = String(status || "Pending").toLowerCase();

  return (
    {
      pending: "Pending",
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",
    }[value] || "Pending"
  );
};

const normalizeBooking = (booking) => {
  const customer = getCustomerDetails(booking);

  return {
    ...booking,
    id: booking.id,
    customer: customer.name,
    phone: customer.phone,
    email: customer.email,
    tripType: customer.tripType,
    pickup: booking.pickup_location || "—",
    destination: booking.dropoff_location || "—",
    date: booking.pickup_date
      ? String(booking.pickup_date).slice(0, 10)
      : "",
    time: booking.pickup_time,
    vehicle: booking.vehicle_type || "Not specified",
    passengers: Number(booking.passengers) || 1,
    luggage: booking.luggage || "Not specified",
    amount: Number(booking.amount || 0),
    status: normalizeStatus(booking.status),
  };
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

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [statusMenu, setStatusMenu] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const itemsPerPage = 6;

  const getAuthConfig = () => {
    const token = sessionStorage.getItem("maxicab_admin_token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchBookings = useCallback(async (showRefresh = false) => {
    try {
      setError("");

      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await api.get("/bookings", getAuthConfig());

      const data = response.data?.bookings || [];

      setBookings(data.map(normalizeBooking));
    } catch (err) {
      console.error("Fetch bookings error:", err);

      if (err.response?.status === 401) {
        setError("Your admin session has expired. Please log in again.");
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to load bookings. Please check the backend."
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !query ||
        String(booking.id).toLowerCase().includes(query) ||
        booking.customer.toLowerCase().includes(query) ||
        booking.phone.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query) ||
        booking.pickup.toLowerCase().includes(query) ||
        booking.destination.toLowerCase().includes(query) ||
        booking.vehicle.toLowerCase().includes(query);

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
      description: "All bookings from database",
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

  const changeStatus = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId);
      setError("");
      setStatusMenu(null);

      await api.patch(
        `/bookings/${bookingId}/status`,
        { status: newStatus },
        getAuthConfig()
      );

      // Refresh from database after successful update.
      await fetchBookings(true);
    } catch (err) {
      console.error("Status update error:", err);

      setError(
        err.response?.data?.message ||
          "Could not update booking status."
      );
    } finally {
      setUpdatingId(null);
    }
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
              Bookings<span className="text-[#D4AF37]">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
              Manage reservations, track trip statuses, and review customer
              booking information.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => fetchBookings(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            >
              Dashboard
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300 sm:flex-row sm:items-center sm:justify-between">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => fetchBookings(true)}
              className="font-semibold text-red-200 underline"
            >
              Retry
            </button>
          </div>
        )}

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
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <RefreshCw
                        size={25}
                        className="mx-auto animate-spin text-[#D4AF37]"
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Loading bookings...
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="transition hover:bg-white/[0.025]"
                    >
                      {/* Booking ID */}
                      <td className="px-5 py-5">
                        <span className="text-sm font-semibold text-[#D4AF37]">
                          MCB-{booking.id}
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
                          {formatTime(booking.time)}
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

                      {/* Status */}
                      <td className="px-5 py-5">
                        <div className="relative">
                          <button
                            type="button"
                            disabled={updatingId === booking.id}
                            onClick={() =>
                              setStatusMenu(
                                statusMenu === booking.id ? null : booking.id
                              )
                            }
                            aria-label={`Change status for booking ${booking.id}`}
                            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${
                              statusStyles[booking.status] ||
                              "border-white/10 bg-white/5 text-gray-300"
                            } disabled:opacity-50`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {updatingId === booking.id
                              ? "Updating..."
                              : booking.status}
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
                            navigate(`/admin/bookings/${booking.id}`, {
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
                  ))
                )}

                {!loading && paginatedBookings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
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
          {!loading && (
            <div className="flex flex-col justify-between gap-4 border-t border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-300">
                  {filteredBookings.length === 0
                    ? 0
                    : (currentPage - 1) * itemsPerPage + 1}
                  –
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredBookings.length
                  )}
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
                  onClick={() =>
                    setPage((previous) => Math.max(1, previous - 1))
                  }
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={17} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
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
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setPage((previous) =>
                      Math.min(totalPages, previous + 1)
                    )
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-gray-600">
          Live booking records from your MaxiCabStar Prime database.
        </p>
      </div>
    </div>
  );
}
