import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Clock,
  Car,
  Users,
  Luggage,
  ShieldCheck,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import api from "../../api/axios";

const gold = "#D4AF37";

export default function BookingDetails() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [status, setStatus] = useState("Pending");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/bookings/${id}`);

      const data = response.data.booking || response.data;

      setBooking(data);
      setStatus(data.status || "Pending");
    } catch (err) {
      console.error("Booking details error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load booking details."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    try {
      setUpdating(true);

      await api.patch(`/bookings/${id}/status`, { status });

      setBooking((prev) => ({ ...prev, status }));

      alert("Booking status updated successfully.");
    } catch (err) {
      console.error("Status update error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to update booking status."
      );
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not provided";

    // Avoid timezone date shifting for MySQL DATE values
    const dateString =
      typeof date === "string" ? date.substring(0, 10) : date;

    const parsed = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) return dateString;

    return parsed.toLocaleDateString("en-SG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "Not provided";

    const [hours, minutes] = String(time).split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-SG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
      <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-3">
        <Icon size={18} style={{ color: gold }} />
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 break-words font-medium text-white">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#0b0b0b] text-white">
        <LoaderCircle className="animate-spin" style={{ color: gold }} />
        <span className="ml-3">Loading booking...</span>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] p-6 text-white">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <AlertCircle className="mb-3 text-red-400" />
          <p>{error || "Booking not found."}</p>

          <Link
            to="/admin/bookings"
            className="mt-5 inline-flex items-center gap-2 text-[#D4AF37]"
          >
            <ArrowLeft size={18} />
            Back to bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin/bookings"
            className="mb-5 inline-flex items-center gap-2 text-gray-400 transition hover:text-[#D4AF37]"
          >
            <ArrowLeft size={18} />
            Return to Bookings
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                MaxiCabStar Prime
              </p>

              <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Booking Details
              </h1>

              <p className="mt-2 text-gray-400">
                Reservation reference: MCB-{booking.id}
              </p>
            </div>

            <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#D4AF37]">
              {booking.status || "Pending"}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Main */}
          <div className="space-y-6">
            {/* Customer information */}
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
              <div className="border-b border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <UserRound style={{ color: gold }} />

                  <div>
                    <h2 className="font-semibold">Customer Information</h2>
                    <p className="text-sm text-gray-500">
                      Contact details associated with this reservation
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-xl font-bold text-[#D4AF37]">
                    {(booking.customer_name || "C")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {booking.customer_name ||
                        booking.full_name ||
                        "Customer information unavailable"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Customer ID: {booking.customer_id || "Not linked"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                  <InfoItem
                    icon={Mail}
                    label="Email Address"
                    value={booking.customer_email || booking.email}
                  />

                  <InfoItem
                    icon={Phone}
                    label="Phone Number"
                    value={booking.customer_phone || booking.phone}
                  />
                </div>
              </div>
            </section>

            {/* Journey */}
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
              <div className="border-b border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <MapPin style={{ color: gold }} />

                  <div>
                    <h2 className="font-semibold">Journey Information</h2>
                    <p className="text-sm text-gray-500">
                      Pickup and drop-off details
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 p-6 sm:grid-cols-2">
                <InfoItem
                  icon={MapPin}
                  label="Pickup Location"
                  value={booking.pickup_location || booking.pickup}
                />

                <InfoItem
                  icon={MapPin}
                  label="Drop-off Location"
                  value={booking.dropoff_location || booking.destination}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Travel Date"
                  value={formatDate(
                    booking.pickup_date || booking.travelDate
                  )}
                />

                <InfoItem
                  icon={Clock}
                  label="Travel Time"
                  value={formatTime(
                    booking.pickup_time || booking.travelTime
                  )}
                />
              </div>
            </section>

            {/* Vehicle */}
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
              <div className="border-b border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <Car style={{ color: gold }} />

                  <div>
                    <h2 className="font-semibold">Vehicle Information</h2>
                    <p className="text-sm text-gray-500">
                      Vehicle and passenger requirements
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 p-6 sm:grid-cols-2">
                <InfoItem
                  icon={Car}
                  label="Selected Vehicle"
                  value={booking.vehicle_type || booking.vehicle}
                />

                <InfoItem
                  icon={Users}
                  label="Passengers"
                  value={booking.passengers}
                />

                <InfoItem
                  icon={Luggage}
                  label="Luggage"
                  value={booking.luggage}
                />
              </div>
            </section>

            {/* Requests */}
            <section className="rounded-2xl border border-white/10 bg-[#111111] p-6">
              <h2 className="mb-3 font-semibold">Special Requests</h2>

              <p className="whitespace-pre-wrap text-gray-300">
                {booking.special_requests ||
                  booking.notes ||
                  "No special requests"}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-6">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck style={{ color: gold }} />

                <div>
                  <h2 className="font-semibold">Manage Booking</h2>
                  <p className="text-sm text-gray-500">
                    Change reservation status
                  </p>
                </div>
              </div>

              <label className="mb-2 block text-sm text-gray-400">
                Booking Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none"
              >
                {["Pending", "Confirmed", "Completed", "Cancelled"].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>

              <button
                onClick={updateStatus}
                disabled={updating}
                className="mt-4 w-full rounded-xl bg-[#D4AF37] px-4 py-3 font-semibold text-black transition hover:bg-[#e5c34e] disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update Status"}
              </button>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#111111] p-6">
              <h2 className="mb-4 font-semibold">Reservation Reference</h2>

              <p className="text-sm text-gray-400">Booking ID</p>

              <p className="mt-1 text-xl font-bold text-[#D4AF37]">
                MCB-{booking.id}
              </p>

              <p className="mt-4 text-sm text-gray-400">Created At</p>

              <p className="mt-1 text-sm text-white">
                {booking.created_at
                  ? new Date(booking.created_at).toLocaleString("en-SG")
                  : "Not available"}
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}