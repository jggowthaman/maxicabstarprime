
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  UserCheck,
  CalendarDays,
  CircleDollarSign,
  Mail,
  Phone,
  Eye,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  UserRound,
  MapPin,
  ArrowUpRight,
  X,
} from "lucide-react";

const initialCustomers = [
  {
    id: "CUS-1001",
    name: "Arun Kumar",
    email: "arun@example.com",
    phone: "+65 8123 4567",
    location: "Singapore",
    bookings: 5,
    spent: 425,
    joined: "2026-08-12",
    status: "Active",
  },
  {
    id: "CUS-1002",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+65 9234 5678",
    location: "Orchard Road",
    bookings: 3,
    spent: 360,
    joined: "2026-08-20",
    status: "Active",
  },
  {
    id: "CUS-1003",
    name: "Michael Tan",
    email: "michael@example.com",
    phone: "+65 8345 6789",
    location: "Marina Bay",
    bookings: 8,
    spent: 760,
    joined: "2026-07-15",
    status: "Active",
  },
  {
    id: "CUS-1004",
    name: "Sarah Lee",
    email: "sarah@example.com",
    phone: "+65 9456 7890",
    location: "Jurong East",
    bookings: 2,
    spent: 220,
    joined: "2026-09-01",
    status: "Active",
  },
  {
    id: "CUS-1005",
    name: "Daniel Wong",
    email: "daniel@example.com",
    phone: "+65 8567 8901",
    location: "Changi",
    bookings: 4,
    spent: 310,
    joined: "2026-08-28",
    status: "Inactive",
  },
  {
    id: "CUS-1006",
    name: "Emily Chen",
    email: "emily@example.com",
    phone: "+65 9678 9012",
    location: "Sentosa",
    bookings: 6,
    spent: 580,
    joined: "2026-07-30",
    status: "Active",
  },
  {
    id: "CUS-1007",
    name: "Kevin Lim",
    email: "kevin@example.com",
    phone: "+65 8789 0123",
    location: "Bugis",
    bookings: 1,
    spent: 90,
    joined: "2026-09-10",
    status: "Active",
  },
  {
    id: "CUS-1008",
    name: "Jessica Ong",
    email: "jessica@example.com",
    phone: "+65 9890 1234",
    location: "Woodlands",
    bookings: 7,
    spent: 1015,
    joined: "2026-06-25",
    status: "Active",
  },
];

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-SG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

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

  const [customers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.id.toLowerCase().includes(query) ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.location.toLowerCase().includes(query);

      const matchesStatus =
        activeFilter === "All" || customer.status === activeFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, activeFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / itemsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalBookings = customers.reduce(
    (total, customer) => total + customer.bookings,
    0
  );

  const totalSpent = customers.reduce(
    (total, customer) => total + customer.spent,
    0
  );

  const stats = [
    {
      title: "Total Customers",
      value: customers.length,
      description: "All registered demo customers",
      icon: Users,
    },
    {
      title: "Active Customers",
      value: customers.filter((customer) => customer.status === "Active")
        .length,
      description: "Currently active demo profiles",
      icon: UserCheck,
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      description: "Combined sample booking count",
      icon: CalendarDays,
    },
    {
      title: "Total Spend",
      value: `S$${totalSpent.toLocaleString("en-SG")}`,
      description: "Combined sample customer spend",
      icon: CircleDollarSign,
    },
  ];

  const resetFilters = () => {
    setSearch("");
    setActiveFilter("All");
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
              Customers<span className="text-[#D4AF37]">.</span>
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Manage customer profiles and review their booking activity.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] sm:self-auto"
          >
            Dashboard
            <ArrowUpRight size={17} />
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <CustomerStat key={stat.title} {...stat} />
          ))}
        </div>

        {/* Customer table */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111]">
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-semibold">Customer Directory</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Search and review registered customers.
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

            {/* Filters */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {["All", "Active", "Inactive"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter);
                    setPage(1);
                  }}
                  className={`rounded-lg border px-4 py-2 text-xs font-medium transition ${
                    activeFilter === filter
                      ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                      : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-[#D4AF37]/40 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}

              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                  {[
                    "Customer",
                    "Contact Information",
                    "Location",
                    "Bookings",
                    "Total Spend",
                    "Joined Date",
                    "Status",
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
                          {customer.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="whitespace-nowrap text-sm font-medium text-white">
                            {customer.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {customer.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-5">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 whitespace-nowrap text-xs text-gray-300">
                          <Mail size={13} className="text-gray-500" />
                          {customer.email}
                        </p>

                        <p className="flex items-center gap-2 whitespace-nowrap text-xs text-gray-400">
                          <Phone size={13} className="text-gray-500" />
                          {customer.phone}
                        </p>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-300">
                        <MapPin size={15} className="text-[#D4AF37]" />
                        {customer.location}
                      </div>
                    </td>

                    {/* Bookings */}
                    <td className="px-5 py-5">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-gray-300">
                        <CalendarDays size={14} className="text-[#D4AF37]" />
                        {customer.bookings}
                      </span>
                    </td>

                    {/* Spend */}
                    <td className="whitespace-nowrap px-5 py-5">
                      <span className="text-sm font-semibold text-white">
                        S${customer.spent.toLocaleString("en-SG")}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-400">
                      {formatDate(customer.joined)}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                          customer.status === "Active"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-gray-500/20 bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            customer.status === "Active"
                              ? "bg-emerald-400"
                              : "bg-gray-400"
                          }`}
                        />
                        {customer.status}
                      </span>
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
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <Users
                        size={30}
                        className="mx-auto text-gray-600"
                      />

                      <h3 className="mt-4 text-base font-medium text-white">
                        No customers found
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Try another search term or change your filters.
                      </p>

                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-4 text-sm text-[#D4AF37] hover:underline"
                      >
                        Clear filters
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
              <span className="text-gray-300">
                {filteredCustomers.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}
                {"–"}
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

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
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
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-gray-600">
          Demo mode: customer information is sample data and is not connected
          to the database.
        </p>
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
            <div className="flex items-center justify-between border-b border-white/[0.07] p-5 sm:p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  Customer Profile
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

            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-4 border-b border-white/[0.07] pb-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-xl font-semibold text-[#D4AF37]">
                  {selectedCustomer.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">
                    {selectedCustomer.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {selectedCustomer.id}
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs ${
                      selectedCustomer.status === "Active"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-gray-500/20 bg-gray-500/10 text-gray-400"
                    }`}
                  >
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-[#D4AF37]" />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="mt-1 break-all text-sm text-gray-200">
                      {selectedCustomer.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 text-[#D4AF37]" />

                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="mt-1 text-sm text-gray-200">
                      {selectedCustomer.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-[#D4AF37]" />

                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="mt-1 text-sm text-gray-200">
                      {selectedCustomer.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 text-[#D4AF37]"
                  />

                  <div>
                    <p className="text-xs text-gray-500">Registration Date</p>
                    <p className="mt-1 text-sm text-gray-200">
                      {formatDate(selectedCustomer.joined)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-white/[0.07] bg-[#0B0B0B] p-4">
                    <p className="text-xs text-gray-500">Total Bookings</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {selectedCustomer.bookings}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-[#0B0B0B] p-4">
                    <p className="text-xs text-gray-500">Total Spend</p>
                    <p className="mt-2 text-2xl font-semibold text-[#D4AF37]">
                      S$
                      {selectedCustomer.spent.toLocaleString("en-SG")}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="mt-7 w-full rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#E6C65A]"
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
