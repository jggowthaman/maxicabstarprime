import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  Phone,
  Mail,
  CarFront,
  Users,
  CreditCard,
  CheckCircle2,
  XCircle,
  FileText,
  Navigation,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import StatusBadge from "../admin-components/StatusBadge";

const sampleBookings = [
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

const statusOptions = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-SG", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/10 text-[#D4AF37]">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-gray-200">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function SectionCard({ title, subtitle, icon: Icon, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111]">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-5 sm:px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
          <Icon size={19} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

export default function BookingDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const routeBooking = location.state?.booking;

  const initialBooking =
    (routeBooking && String(routeBooking.id) === String(id)
      ? routeBooking
      : null) ||
    sampleBookings.find((booking) => String(booking.id) === String(id)) ||
    null;

  const [booking, setBooking] = useState(initialBooking);
  const [selectedStatus, setSelectedStatus] = useState(
    initialBooking?.status || "Pending"
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notice, setNotice] = useState("");

  const handleStatusUpdate = () => {
    if (!booking) return;

    setBooking((previous) => ({
      ...previous,
      status: selectedStatus,
    }));

    setNotice(`Booking status changed to ${selectedStatus}.`);
    setShowConfirmation(false);
  };

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111111] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
            <FileText size={26} />
          </div>

          <h1 className="mt-5 text-xl font-semibold">
            Booking Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            We couldn't find this booking. Return to the bookings page and
            select a booking from the list.
          </p>

          <button
            type="button"
            onClick={() => navigate("/admin/bookings")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#E6C65A]"
          >
            <ArrowLeft size={17} />
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1450px]">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="transition hover:text-[#D4AF37]"
          >
            Dashboard
          </button>

          <ChevronRight size={14} />

          <button
            type="button"
            onClick={() => navigate("/admin/bookings")}
            className="transition hover:text-[#D4AF37]"
          >
            Bookings
          </button>

          <ChevronRight size={14} />

          <span className="text-[#D4AF37]">{booking.id}</span>
        </div>

        {/* Page header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <button
              type="button"
              onClick={() => navigate("/admin/bookings")}
              className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D4AF37]"
            >
              <ArrowLeft size={17} />
              Back to Bookings
            </button>

            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[#D4AF37]">
              <span className="h-px w-7 bg-[#D4AF37]" />
              Reservation Details
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Booking <span className="text-[#D4AF37]">Details.</span>
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Review the reservation, customer, and journey information.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={booking.status} showIcon />

            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-medium text-gray-300">
              {booking.id}
            </span>
          </div>
        </div>

        {/* Success notice */}
        {notice && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 text-sm text-emerald-400">
            <CheckCircle2 size={19} className="shrink-0" />
            <div className="flex-1">{notice}</div>

            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
              className="text-emerald-400/70 hover:text-emerald-300"
            >
              <XCircle size={17} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_360px]">
          {/* Main column */}
          <div className="space-y-6">
            {/* Journey details */}
            <SectionCard
              title="Journey Information"
              subtitle="Pickup, destination, and travel schedule"
              icon={Navigation}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-white/[0.06] bg-[#0B0B0B] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <MapPin size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Pickup Location
                      </p>

                      <p className="mt-2 break-words text-base font-medium text-white">
                        {booking.pickup}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-[#0B0B0B] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                      <MapPin size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Destination
                      </p>

                      <p className="mt-2 break-words text-base font-medium text-white">
                        {booking.destination}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem
                  icon={CalendarDays}
                  label="Travel Date"
                  value={formatDate(booking.date)}
                />

                <DetailItem
                  icon={Clock3}
                  label="Pickup Time"
                  value={booking.time}
                />

                <DetailItem
                  icon={Users}
                  label="Passengers"
                  value={`${booking.passengers} passengers`}
                />
              </div>
            </SectionCard>

            {/* Customer details */}
            <SectionCard
              title="Customer Information"
              subtitle="Contact details associated with this reservation"
              icon={UserRound}
            >
              <div className="mb-6 flex flex-col gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-xl font-semibold text-[#D4AF37]">
                  {booking.customer
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {booking.customer}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Customer reservation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <DetailItem
                  icon={Mail}
                  label="Email Address"
                  value={booking.email}
                />

                <DetailItem
                  icon={Phone}
                  label="Phone Number"
                  value={booking.phone}
                />
              </div>
            </SectionCard>

            {/* Vehicle details */}
            <SectionCard
              title="Vehicle Information"
              subtitle="Vehicle and passenger requirements"
              icon={CarFront}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <DetailItem
                  icon={CarFront}
                  label="Selected Vehicle"
                  value={booking.vehicle}
                />

                <DetailItem
                  icon={Users}
                  label="Passenger Capacity Requested"
                  value={`${booking.passengers} passengers`}
                />
              </div>
            </SectionCard>

            {/* Booking reference */}
            <SectionCard
              title="Reservation Reference"
              subtitle="Identification and booking summary"
              icon={ShieldCheck}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <DetailItem
                  icon={FileText}
                  label="Booking Reference"
                  value={booking.id}
                />

                <DetailItem
                  icon={CalendarDays}
                  label="Scheduled Travel"
                  value={`${formatDate(booking.date)} · ${booking.time}`}
                />
              </div>
            </SectionCard>
          </div>

          {/* Right column */}
          <aside className="space-y-6">
            {/* Fare summary */}
            <section className="overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#111111]">
              <div className="border-b border-white/[0.07] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
                    <CreditCard size={19} />
                  </div>

                  <div>
                    <h2 className="font-semibold">Fare Summary</h2>
                    <p className="mt-1 text-xs text-gray-500">
                      Booking fare information
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Total Booking Fare
                </p>

                <h3 className="mt-3 text-4xl font-semibold tracking-tight text-[#D4AF37]">
                  S${Number(booking.amount || 0).toFixed(2)}
                </h3>

                <p className="mt-2 text-xs text-gray-500">
                  Currency: Singapore Dollar (SGD)
                </p>

                <div className="my-6 border-t border-dashed border-white/10" />

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-400">Vehicle</span>
                  <span className="text-right text-gray-200">
                    {booking.vehicle}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-400">Passengers</span>
                  <span className="text-gray-200">{booking.passengers}</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-400">Booking status</span>
                  <StatusBadge status={booking.status} />
                </div>
              </div>
            </section>

            {/* Status management */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">Manage Booking</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Change reservation status
                  </p>
                </div>
              </div>

              <label
                htmlFor="booking-status"
                className="mt-6 block text-xs font-medium text-gray-400"
              >
                Booking Status
              </label>

              <select
                id="booking-status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4AF37]/60"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowConfirmation(true)}
                disabled={selectedStatus === booking.status}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#E6C65A] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CheckCircle2 size={17} />
                Update Status
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-gray-500">
                Status changes are temporary in frontend demo mode.
              </p>
            </section>

            {/* Back button */}
            <button
              type="button"
              onClick={() => navigate("/admin/bookings")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            >
              <ArrowLeft size={17} />
              Return to Bookings
            </button>
          </aside>
        </div>
      </div>

      {/* Status confirmation dialog */}
      {showConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setShowConfirmation(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
              <ShieldCheck size={23} />
            </div>

            <h2 id="confirm-title" className="mt-5 text-xl font-semibold">
              Confirm Status Update
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Change booking{" "}
              <span className="font-medium text-white">{booking.id}</span>{" "}
              from{" "}
              <span className="font-medium text-white">{booking.status}</span>{" "}
              to{" "}
              <span className="font-medium text-[#D4AF37]">
                {selectedStatus}
              </span>
              ?
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleStatusUpdate}
                className="rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#E6C65A]"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
