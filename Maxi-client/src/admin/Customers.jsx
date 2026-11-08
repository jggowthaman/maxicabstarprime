import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import {
  Search,
  Users,
  UserCheck,
  CalendarDays,
  Mail,
  Phone,
  Eye,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  MapPin,
  ArrowUpRight,
  X,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-SG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "CU";

function CustomerStat({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5 transition duration-300 hover:border-[#D4AF37]/40">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-400">{title}</p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
          <Icon size={19} />
        </div>
      </div>

      <h3 className="mt-4 text-3xl font-semibold text-white">{value}</h3>
      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default function Customers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const itemsPerPage = 6;

  const fetchCustomers = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await api.get("/customers");
      const customerData = response.data?.customers;

      if (!Array.isArray(customerData)) {
        throw new Error("Invalid customer data received from server.");
      }

      setCustomers(customerData);
    } catch (err) {
      console.error("Failed to fetch customers:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load customers. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const searchableValues = [
        customer.id,
        customer.name,
        customer.email,
        customer.phone,
        customer.subject,
        customer.message,
      ];

      return (
        !query ||
        searchableValues.some((value) =>
          String(value ?? "").toLowerCase().includes(query)
        )
      );
    });
  }, [customers, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / itemsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setPage(1);
  };

  const stats = [
    {
      title: "Total Enquiries",
      value: customers.length,
      description: "All submitted contact enquiries",
      icon: Users,
    },
    {
      title: "With Email",
      value: customers.filter((customer) => customer.email).length,
      description: "Enquiries with email information",
      icon: UserCheck,
    },
    {
      title: "With Phone",
      value: customers.filter((customer) => customer.phone).length,
      description: "Enquiries with phone information",
      icon: Phone,
    },
    {
      title: "Today's Enquiries",
      value: customers.filter((customer) => {
        if (!customer.created_at) return false;

        return (
          new Date(customer.created_at).toDateString() ===
          new Date().toDateString()
        );
      }).length,
      description: "Enquiries received today",
      icon: CalendarDays,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#0B0B0B] text-white">
        <div className="text-center">
          <RefreshCw
            className="mx-auto animate-spin text-[#D4AF37]"
            size={30}
          />
          <p className="mt-4 text-sm text-gray-400">
            Loading customer enquiries...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[#D4AF37]">
              <span className="h-px w-7 bg-[#D4AF37]" />
              MaxiCabStar Prime
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Customers<span className="text-[#D4AF37]">.</span>
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Manage customer enquiries submitted through your website.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => fetchCustomers(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] disabled:opacity-50"
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
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            >
              Dashboard
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => fetchCustomers()}
              className="mt-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <CustomerStat key={stat.title} {...stat} />
          ))}
        </div>

        {/* Customer directory */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111]">
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  Customer Enquiries
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Search and review website contact submissions.
                </p>
              </div>

              <div className="relative w-full lg:w-80">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search name, email, phone..."
                  aria-label="Search customers"
                  className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D4AF37]/60"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              >
                <RotateCcw size={14} />
                Reset Search
              </button>

              <span className="ml-auto text-xs text-gray-500">
                {filteredCustomers.length} enquiries
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                  {[
                    "Customer",
                    "Contact Information",
                    "Subject",
                    "Message",
                    "Submitted",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.05]">
                {visibleCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-white/[0.025]"
                  >
                    {/* Customer */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-sm font-semibold text-[#D4AF37]">
                          {getInitials(customer.name)}
                        </div>

                        <div>
                          <p className="whitespace-nowrap text-sm font-medium text-white">
                            {customer.name || "Unknown"}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            #{customer.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-5">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-xs text-gray-300">
                          <Mail size={13} className="shrink-0 text-gray-500" />
                          {customer.email || "—"}
                        </p>

                        <p className="flex items-center gap-2 text-xs text-gray-400">
                          <Phone size={13} className="shrink-0 text-gray-500" />
                          {customer.phone || "—"}
                        </p>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-5 py-5">
                      <p className="max-w-[180px] truncate text-sm text-gray-300">
                        {customer.subject || "Website Enquiry"}
                      </p>
                    </td>

                    {/* Message */}
                    <td className="px-5 py-5">
                      <p className="max-w-[220px] truncate text-sm text-gray-400">
                        {customer.message || "—"}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-400">
                      {formatDate(customer.created_at)}
                    </td>

                    {/* View */}
                    <td className="px-5 py-5">
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(customer)}
                        aria-label={`View ${customer.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-gray-400 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {visibleCustomers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <Users size={30} className="mx-auto text-gray-600" />

                      <h3 className="mt-4 text-base font-medium text-white">
                        {error
                          ? "Unable to display customers"
                          : "No customer enquiries found"}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        {search
                          ? "Try another search term."
                          : "Contact form submissions will appear here."}
                      </p>

                      {search && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="mt-4 text-sm text-[#D4AF37] hover:underline"
                        >
                          Clear search
                        </button>
                      )}
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
              <span className="text-gray-300">
                {filteredCustomers.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}
                –
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredCustomers.length
                )}
              </span>{" "}
              of{" "}
              <span className="text-gray-300">
                {filteredCustomers.length}
              </span>{" "}
              customers
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

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`h-9 min-w-9 rounded-lg border px-3 text-xs transition ${
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
        </section>
      </div>

      {/* Customer details modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#141414] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] p-5 sm:p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  Customer Enquiry
                </p>

                <h2
                  id="customer-modal-title"
                  className="mt-2 text-xl font-semibold"
                >
                  Customer Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                aria-label="Close customer details"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-[#D4AF37]/40 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-4 border-b border-white/[0.07] pb-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-xl font-semibold text-[#D4AF37]">
                  {getInitials(selectedCustomer.name)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">
                    {selectedCustomer.name || "Unknown Customer"}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Customer ID: {selectedCustomer.id}
                  </p>

                  <span className="mt-2 inline-flex rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-2.5 py-1 text-xs text-[#D4AF37]">
                    Website Enquiry
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-[#D4AF37]" />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="mt-1 break-all text-sm text-gray-200">
                      {selectedCustomer.email || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 text-[#D4AF37]" />

                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="mt-1 text-sm text-gray-200">
                      {selectedCustomer.phone || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-[#D4AF37]" />

                  <div>
                    <p className="text-xs text-gray-500">Subject</p>
                    <p className="mt-1 text-sm text-gray-200">
                      {selectedCustomer.subject || "Website Enquiry"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 text-[#D4AF37]"
                  />

                  <div>
                    <p className="text-xs text-gray-500">Submitted Date</p>
                    <p className="mt-1 text-sm text-gray-200">
                      {formatDate(selectedCustomer.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare
                    size={18}
                    className="mt-0.5 text-[#D4AF37]"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Customer Message</p>

                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-gray-200">
                      {selectedCustomer.message || "No message provided."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email and Call buttons */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selectedCustomer.email && (
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      selectedCustomer.email.trim()
                    )}&su=${encodeURIComponent(
                      `Re: ${selectedCustomer.subject || "Website Enquiry"}`
                    )}&body=${encodeURIComponent(
                      `Hi ${selectedCustomer.name || "there"},\n\n\nRegards,\nMaxiCabStar Prime`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/30 px-4 py-3 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
                  >
                    <Mail size={16} />
                    Reply by Email
                  </a>
                )}

                {selectedCustomer.phone && (
                  <a
                    href={`tel:${String(selectedCustomer.phone).replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#E6C65A]"
                    title="Open your default calling app"
                  >
                    <Phone size={16} />
                    Call Customer
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="mt-4 w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:border-white/20 hover:text-white"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}