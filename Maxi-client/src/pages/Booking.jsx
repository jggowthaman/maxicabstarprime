import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Clock,
  Luggage,
  Mail,
  MapPin,
  MessageCircle,
  Plane,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";

import api from "../api/axios";
import SEO from "../components/SEO";

const WHATSAPP_NUMBER = "6598669334";

const vehicleOptions = [
  "4 Seater",
  "6 Seater",
  "13 Seater",
  "23 Seater",
  "49 Seater",
  "Other / Not Sure",
];

const tripOptions = [
  { value: "airport", label: "Airport Transfer" },
  { value: "point-to-point", label: "Point-to-Point" },
  { value: "corporate", label: "Corporate Travel" },
  { value: "hourly", label: "Hourly Charter" },
];

const initialForm = {
  vehicle: "",
  tripType: "airport",
  pickup: "",
  destination: "",
  travelDate: "",
  travelTime: "",
  passengers: "1",
  luggage: "1",
  name: "",
  phone: "",
  email: "",
  flightNumber: "",
  notes: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[#DED5C5] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none focus:border-[#B58A4A] focus:ring-2 focus:ring-[#D4AF37]/20";

const labelClass =
  "flex items-center gap-2 text-sm font-semibold text-[#27241F]";

export default function Booking() {
  const [searchParams] = useSearchParams();

  const vehicleFromUrl = searchParams.get("vehicle") || "";

  const [form, setForm] = useState({
    ...initialForm,
    vehicle: vehicleFromUrl,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const today = new Date();

  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  useEffect(() => {
    if (vehicleFromUrl) {
      setForm((prev) => ({
        ...prev,
        vehicle: vehicleFromUrl,
      }));
    }
  }, [vehicleFromUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    if (!form.vehicle) {
      setError("Please select a vehicle.");
      return;
    }

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.pickup.trim() ||
      !form.destination.trim() ||
      !form.travelDate ||
      !form.travelTime
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.travelDate < localToday) {
      setError("Please select a future date.");
      return;
    }

    if (
      form.pickup.trim().toLowerCase() ===
      form.destination.trim().toLowerCase()
    ) {
      setError("Pickup and destination cannot be the same.");
      return;
    }

    const tripLabel =
      tripOptions.find((item) => item.value === form.tripType)?.label ||
      form.tripType;

    const bookingData = {
      vehicle: form.vehicle,
      tripType: tripLabel,
      pickup: form.pickup.trim(),
      destination: form.destination.trim(),
      travelDate: form.travelDate,
      travelTime: form.travelTime,
      passengers: Number(form.passengers),
      luggage: Number(form.luggage),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      flightNumber: form.flightNumber.trim(),
      notes: form.notes.trim(),
    };

    const whatsappMessage = `
Hello MaxiCabStar Prime! I would like to enquire about a booking.

Vehicle: ${bookingData.vehicle}
Trip Type: ${bookingData.tripType}
Pickup: ${bookingData.pickup}
Destination: ${bookingData.destination}
Date: ${bookingData.travelDate}
Time: ${bookingData.travelTime}
Passengers: ${bookingData.passengers}
Luggage: ${bookingData.luggage}
Name: ${bookingData.name}
Phone: ${bookingData.phone}
Email: ${bookingData.email || "N/A"}
Flight Number: ${bookingData.flightNumber || "N/A"}
Notes: ${bookingData.notes || "N/A"}
`;

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(whatsappMessage);

    // Open tab immediately to avoid browser popup blocking
    const whatsappWindow = window.open("about:blank", "_blank");

    try {
      setLoading(true);

      // Save booking to backend database first
      const response = await api.post("/bookings", bookingData);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Booking could not be saved."
        );
      }

      // Reset form after successful database save
      setForm({
        ...initialForm,
        vehicle: vehicleFromUrl,
      });

      setSuccess("Booking saved successfully! Opening WhatsApp...");

      // Open WhatsApp after successful save
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        window.location.href = whatsappUrl;
      }
    } catch (err) {
      console.error("Booking API error:", err);

      if (whatsappWindow) {
        whatsappWindow.close();
      }

      setError(
        err.response?.data?.message ||
          err.message ||
          "Booking could not be saved. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SEO */}
      <SEO
        title="Book a Maxi Cab Singapore | MaxiCabStar Prime"
        description="Book your Singapore maxi cab with MaxiCabStar Prime. Request airport transfers, point-to-point rides, corporate travel, and hourly charter services."
        path="/booking"
      />

      <main className="min-h-screen bg-[#F8F4EE]">
        {/* Hero */}
        <section className="bg-[#0B0B0B] px-5 py-16 text-white sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Link
              to="/"
              className="mb-7 inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#D4AF37]"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>

            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
              MaxiCabStar Prime · Singapore
            </p>

            <h1 className="font-['Cormorant_Garamond'] text-4xl font-semibold sm:text-6xl">
              Book Your <span className="text-[#D4AF37]">Perfect Ride</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Complete your booking enquiry. Your details will be saved to our
              booking system and sent to our team through WhatsApp.
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#E5DACA] bg-white shadow-xl"
          >
            <div className="border-b border-[#E9E0D0] p-6 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A77D19]">
                Booking Details
              </p>

              <h2 className="mt-2 font-['Cormorant_Garamond'] text-3xl font-semibold text-[#171717] sm:text-4xl">
                Tell Us About Your Journey
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-9">
              {/* Vehicle */}
              <section>
                <h3 className="mb-5 font-['Cormorant_Garamond'] text-2xl font-semibold">
                  01. Choose Your Ride
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="vehicle">
                      <CarFront size={17} className="text-[#A77D19]" />
                      Vehicle *
                    </label>

                    <select
                      id="vehicle"
                      name="vehicle"
                      value={form.vehicle}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="">Select vehicle</option>

                      {vehicleOptions.map((vehicle) => (
                        <option key={vehicle} value={vehicle}>
                          {vehicle}
                        </option>
                      ))}

                      {!vehicleOptions.includes(form.vehicle) &&
                        form.vehicle && (
                          <option value={form.vehicle}>
                            {form.vehicle}
                          </option>
                        )}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="tripType">
                      <Route size={17} className="text-[#A77D19]" />
                      Trip Type *
                    </label>

                    <select
                      id="tripType"
                      name="tripType"
                      value={form.tripType}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      {tripOptions.map((trip) => (
                        <option key={trip.value} value={trip.value}>
                          {trip.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Journey Details */}
              <section className="border-t border-[#E9E0D0] pt-7">
                <h3 className="mb-5 font-['Cormorant_Garamond'] text-2xl font-semibold">
                  02. Journey Details
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="pickup">
                      <MapPin size={17} className="text-[#A77D19]" />
                      Pickup Location *
                    </label>

                    <input
                      id="pickup"
                      name="pickup"
                      value={form.pickup}
                      onChange={handleChange}
                      placeholder="Pickup address"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="destination">
                      <MapPin size={17} className="text-[#A77D19]" />
                      Destination *
                    </label>

                    <input
                      id="destination"
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      placeholder="Destination address"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="travelDate">
                      <CalendarDays size={17} className="text-[#A77D19]" />
                      Travel Date *
                    </label>

                    <input
                      id="travelDate"
                      name="travelDate"
                      type="date"
                      min={localToday}
                      value={form.travelDate}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="travelTime">
                      <Clock size={17} className="text-[#A77D19]" />
                      Travel Time *
                    </label>

                    <input
                      id="travelTime"
                      name="travelTime"
                      type="time"
                      value={form.travelTime}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="passengers">
                      <Users size={17} className="text-[#A77D19]" />
                      Passengers
                    </label>

                    <select
                      id="passengers"
                      name="passengers"
                      value={form.passengers}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {Array.from({ length: 49 }, (_, i) => i + 1).map(
                        (n) => (
                          <option key={n} value={n}>
                            {n} Passenger{n > 1 ? "s" : ""}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="luggage">
                      <Luggage size={17} className="text-[#A77D19]" />
                      Luggage
                    </label>

                    <select
                      id="luggage"
                      name="luggage"
                      value={form.luggage}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {Array.from({ length: 21 }, (_, i) => i).map((n) => (
                        <option key={n} value={n}>
                          {n} Bag{n !== 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="flightNumber">
                      <Plane size={17} className="text-[#A77D19]" />
                      Flight Number (optional)
                    </label>

                    <input
                      id="flightNumber"
                      name="flightNumber"
                      value={form.flightNumber}
                      onChange={handleChange}
                      placeholder="e.g. SQ321"
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              {/* Contact Details */}
              <section className="border-t border-[#E9E0D0] pt-7">
                <h3 className="mb-5 font-['Cormorant_Garamond'] text-2xl font-semibold">
                  03. Contact Details
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="name">
                      Full Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="phone">
                      Phone Number *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="email">
                      <Mail size={17} className="text-[#A77D19]" />
                      Email (optional)
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="notes">
                      Additional Requirements
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any additional requests..."
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </div>
              </section>

              {/* Messages */}
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
                  {success}
                </div>
              )}

              {/* Submit */}
              <div className="border-t border-[#E9E0D0] pt-7">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-6 py-4 text-sm font-bold text-black transition hover:bg-[#E8C95D] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[280px]"
                >
                  <MessageCircle size={19} />

                  {loading ? "Saving Booking..." : "Submit Booking"}

                  {!loading && <ArrowUpRight size={18} />}
                </button>

                <p className="mt-4 flex gap-2 text-xs leading-6 text-[#777064]">
                  <ShieldCheck
                    size={16}
                    className="mt-1 shrink-0 text-[#A77D19]"
                  />

                  Your booking enquiry is saved before WhatsApp opens.
                  Booking confirmation is subject to availability.
                </p>
              </div>
            </form>
          </motion.div>
        </section>
      </main>
    </>
  );
}