
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Luggage,
  Mail,
  MapPin,
  MessageCircle,
  Plane,
  Route,
  ShieldCheck,
  Users
} from "lucide-react";

// IMPORTANT:
// Enter the actual company WhatsApp number with country code.
// Singapore format: 65XXXXXXXX
// Use digits only. Do not include +, spaces, or hyphens.
const WHATSAPP_NUMBER = "9944817224";

const vehicleOptions = [
  "4 Seater",
  "Luxury MPV",
  "7 Seater Maxi Cab",
  "13 Seater VIP Combo",
  "23 Seater Minibus",
  "49 Seater Bus",
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
  "mt-2 w-full min-w-0 rounded-xl border border-[#DED5C5] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-[#999184] focus:border-[#B58A4A] focus:ring-2 focus:ring-[#D4AF37]/20";

const labelClass =
  "flex items-center gap-2 text-sm font-semibold text-[#27241F]";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  // Automatically select the vehicle passed in the URL.
  useEffect(() => {
    const vehicleFromUrl = searchParams.get("vehicle");

    if (vehicleFromUrl) {
      setForm((current) => ({
        ...current,
        vehicle: vehicleFromUrl,
      }));
    }
  }, [searchParams]);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSubmitted(false);

    // Validate the WhatsApp number.
    // This catches placeholders, letters, spaces, and invalid lengths.
    if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
      setError(
        "The company WhatsApp number is not configured correctly. Please update WHATSAPP_NUMBER at the top of Booking.jsx."
      );
      return;
    }

    if (
      !form.vehicle ||
      !form.pickup.trim() ||
      !form.destination.trim() ||
      !form.travelDate ||
      !form.travelTime ||
      !form.name.trim() ||
      !form.phone.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (
      form.pickup.trim().toLowerCase() ===
      form.destination.trim().toLowerCase()
    ) {
      setError("Pickup and destination must be different.");
      return;
    }

    if (form.travelDate < localToday) {
      setError("Please select today or a future travel date.");
      return;
    }

    const selectedDateTime = new Date(
      `${form.travelDate}T${form.travelTime}`
    );

    if (
      form.travelDate === localToday &&
      selectedDateTime.getTime() < Date.now()
    ) {
      setError("Please select a future pickup time.");
      return;
    }

    const tripLabel =
      tripOptions.find((item) => item.value === form.tripType)?.label ??
      form.tripType;

    const message = [
      "Hello MaxiCabStar Prime!",
      "I would like to enquire about a booking.",
      "",
      `Vehicle: ${form.vehicle}`,
      `Trip type: ${tripLabel}`,
      `Pickup location: ${form.pickup.trim()}`,
      `Destination: ${form.destination.trim()}`,
      `Travel date: ${form.travelDate}`,
      `Pickup time: ${form.travelTime}`,
      `Passengers: ${form.passengers}`,
      `Luggage: ${form.luggage} bag(s)`,
      `Name: ${form.name.trim()}`,
      `Contact number: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : "",
      form.flightNumber.trim()
        ? `Flight number: ${form.flightNumber.trim()}`
        : "",
      form.notes.trim()
        ? `Additional requirements: ${form.notes.trim()}`
        : "",
      "",
      "Please confirm vehicle availability and provide a quotation.",
    ]
      .filter(Boolean)
      .join("\n");

    // Open WhatsApp directly.
    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message);

    window.location.href = whatsappUrl;
  };

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.6, ease: "easeOut" },
      };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F4EE]">
      {/* Booking page hero */}
      <section className="relative overflow-hidden bg-[#0B0B0B] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#D4AF37]/15"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#D4AF37]/10"
        />

        <motion.div {...reveal} className="relative mx-auto max-w-7xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-[#D4AF37]"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              MaxiCabStar Prime · Singapore
            </p>

            <h1 className="font-['Cormorant_Garamond'] text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
              Book Your
              <span className="block text-[#D4AF37]">
                Perfect Ride.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Select your vehicle and tell us about your journey. Send
              your booking enquiry directly to our team through WhatsApp.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/75 sm:text-sm">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-[#D4AF37]" />
                Simple booking enquiry
              </span>

              <span className="flex items-center gap-2">
                <CarFront size={18} className="text-[#D4AF37]" />
                Multiple vehicle options
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Booking form */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <motion.div
          {...reveal}
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#E5DACA] bg-white shadow-[0_20px_70px_rgba(45,35,15,0.08)]"
        >
          <div className="border-b border-[#E9E0D0] px-5 py-6 sm:px-9 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A77D19]">
              Booking Details
            </p>

            <h2 className="mt-2 font-['Cormorant_Garamond'] text-3xl font-semibold text-[#171717] sm:text-4xl">
              Tell Us About Your Journey
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#777064]">
              Complete the required fields to prepare your booking enquiry.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-8 lg:p-9">
            {/* Vehicle and trip type */}
            <div>
              <h3 className="mb-4 font-['Cormorant_Garamond'] text-2xl font-semibold text-[#171717]">
                01. Choose Your Ride
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="vehicle" className={labelClass}>
                    <CarFront size={17} className="text-[#A77D19]" />
                    Vehicle Type *
                  </label>

                  <select
                    id="vehicle"
                    name="vehicle"
                    value={form.vehicle}
                    onChange={updateField}
                    className={inputClass}
                    required
                  >
                    <option value="">Select a vehicle</option>

                    {vehicleOptions.map((vehicle) => (
                      <option key={vehicle} value={vehicle}>
                        {vehicle}
                      </option>
                    ))}

                    {form.vehicle &&
                      !vehicleOptions.includes(form.vehicle) && (
                        <option value={form.vehicle}>
                          {form.vehicle}
                        </option>
                      )}
                  </select>
                </div>

                <div>
                  <label htmlFor="tripType" className={labelClass}>
                    <Route size={17} className="text-[#A77D19]" />
                    Trip Type *
                  </label>

                  <select
                    id="tripType"
                    name="tripType"
                    value={form.tripType}
                    onChange={updateField}
                    className={inputClass}
                    required
                  >
                    {tripOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Journey details */}
            <div className="border-t border-[#E9E0D0] pt-7">
              <h3 className="mb-4 font-['Cormorant_Garamond'] text-2xl font-semibold text-[#171717]">
                02. Journey Details
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="pickup" className={labelClass}>
                    <MapPin size={17} className="text-[#A77D19]" />
                    Pickup Location *
                  </label>

                  <input
                    id="pickup"
                    name="pickup"
                    type="text"
                    placeholder="e.g. Changi Airport Terminal 3"
                    value={form.pickup}
                    onChange={updateField}
                    className={inputClass}
                    autoComplete="street-address"
                    maxLength={180}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="destination" className={labelClass}>
                    <MapPin size={17} className="text-[#A77D19]" />
                    Destination *
                  </label>

                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    placeholder="e.g. Marina Bay Sands"
                    value={form.destination}
                    onChange={updateField}
                    className={inputClass}
                    maxLength={180}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="travelDate" className={labelClass}>
                    <CalendarDays size={17} className="text-[#A77D19]" />
                    Travel Date *
                  </label>

                  <input
                    id="travelDate"
                    name="travelDate"
                    type="date"
                    min={localToday}
                    value={form.travelDate}
                    onChange={updateField}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="travelTime" className={labelClass}>
                    <Clock3 size={17} className="text-[#A77D19]" />
                    Pickup Time *
                  </label>

                  <input
                    id="travelTime"
                    name="travelTime"
                    type="time"
                    value={form.travelTime}
                    onChange={updateField}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="passengers" className={labelClass}>
                    <Users size={17} className="text-[#A77D19]" />
                    Passengers *
                  </label>

                  <select
                    id="passengers"
                    name="passengers"
                    value={form.passengers}
                    onChange={updateField}
                    className={inputClass}
                    required
                  >
                    {Array.from({ length: 49 }, (_, index) => index + 1).map(
                      (count) => (
                        <option key={count} value={String(count)}>
                          {count} {count === 1 ? "Passenger" : "Passengers"}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label htmlFor="luggage" className={labelClass}>
                    <Luggage size={17} className="text-[#A77D19]" />
                    Number of Bags
                  </label>

                  <select
                    id="luggage"
                    name="luggage"
                    value={form.luggage}
                    onChange={updateField}
                    className={inputClass}
                  >
                    {Array.from({ length: 21 }, (_, index) => index).map(
                      (count) => (
                        <option key={count} value={String(count)}>
                          {count} {count === 1 ? "Bag" : "Bags"}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="flightNumber" className={labelClass}>
                    <Plane size={17} className="text-[#A77D19]" />
                    Flight Number (optional)
                  </label>

                  <input
                    id="flightNumber"
                    name="flightNumber"
                    type="text"
                    placeholder="e.g. SQ321"
                    value={form.flightNumber}
                    onChange={updateField}
                    className={inputClass}
                    maxLength={30}
                  />
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="border-t border-[#E9E0D0] pt-7">
              <h3 className="mb-2 font-['Cormorant_Garamond'] text-2xl font-semibold text-[#171717]">
                03. Your Contact Details
              </h3>

              <p className="mb-5 text-sm text-[#777064]">
                Provide your contact information so the team can reply.
              </p>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={updateField}
                    className={inputClass}
                    maxLength={100}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Contact Number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={updateField}
                    className={inputClass}
                    maxLength={30}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className={labelClass}>
                    <Mail size={17} className="text-[#A77D19]" />
                    Email Address (optional)
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateField}
                    className={inputClass}
                    maxLength={150}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="notes" className={labelClass}>
                    Additional Requirements (optional)
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    placeholder="Extra stops, child seats, or other requests..."
                    value={form.notes}
                    onChange={updateField}
                    className={`${inputClass} resize-y`}
                    maxLength={1000}
                  />
                </div>
              </div>
            </div>

            {/* Validation messages */}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {error}
              </p>
            )}

            {submitted && (
              <p
                role="status"
                className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-800"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                WhatsApp opened. Review your booking message and press Send
                in WhatsApp to submit your enquiry.
              </p>
            )}

            {/* Submit */}
            <div className="border-t border-[#E9E0D0] pt-7">
              <button
                type="submit"
                className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-6 py-4 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#D4AF37]/15 transition hover:-translate-y-0.5 hover:bg-[#E8C95D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A77D19] sm:w-auto sm:min-w-[280px]"
              >
                <MessageCircle size={19} />
                Send Booking Enquiry
                <ArrowUpRight size={18} />
              </button>

              <p className="mt-4 flex items-start gap-2 text-xs leading-6 text-[#777064]">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-[#A77D19]"
                />
                This form opens WhatsApp with your enquiry. Your ride is
                not confirmed until the company confirms availability and
                pricing.
              </p>
            </div>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
