
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  ShieldCheck,
  Clock3,
  Users,
  CarFront,
  ArrowUpRight,
  MessageCircle,
  Plane,
  BriefcaseBusiness,
  Route,
  CheckCircle2,
} from "lucide-react";

import api from "../../api/axios";

// WhatsApp number in international format, without spaces.
const WHATSAPP_NUMBER = "+919944817224";

const initialForm = {
  tripType: "airport",
  pickup: "",
  destination: "",
  travelDate: "",
  travelTime: "",
  passengers: "1",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

const inputClass =
  "mt-2 w-full min-w-0 rounded-xl border border-[#DED5C5] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-[#999184] focus:border-[#B58A4A] focus:ring-2 focus:ring-[#D4AF37]/20";

const labelClass =
  "flex items-center gap-2 text-sm font-semibold text-[#27241F]";

const tripOptions = [
  { value: "airport", label: "Airport Transfer", icon: Plane },
  { value: "point-to-point", label: "Point to Point", icon: Route },
  {
    value: "corporate",
    label: "Corporate Travel",
    icon: BriefcaseBusiness,
  },
  { value: "hourly", label: "Hourly Charter", icon: Clock3 },
];

export default function Home2() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date in local timezone.
  const today = new Date();

  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setSuccess("");

    if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("X")) {
      setError("Please configure the company's WhatsApp number.");
      return;
    }

    // Required field validation.
    if (
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

    // Pickup and destination must be different.
    if (
      form.pickup.trim().toLowerCase() ===
      form.destination.trim().toLowerCase()
    ) {
      setError("Pickup and destination must be different.");
      return;
    }

    // Date validation.
    if (form.travelDate < localToday) {
      setError("Please select today or a future travel date.");
      return;
    }

    // Time validation for today.
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

    // Validate phone number length.
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError("Please enter a valid contact number.");
      return;
    }

    const tripLabel =
      tripOptions.find((option) => option.value === form.tripType)?.label ??
      form.tripType;

    // Your current bookings table has no dedicated customer name,
    // phone, email, or trip type columns.
    // Store these temporarily inside special_requests.
    const bookingNotes = [
      `Trip type: ${tripLabel}`,
      `Customer name: ${form.name.trim()}`,
      `Customer phone: ${form.phone.trim()}`,
      form.email.trim()
        ? `Customer email: ${form.email.trim()}`
        : "",
      form.notes.trim()
        ? `Additional requirements: ${form.notes.trim()}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Open a blank tab during the user interaction to reduce
    // the chance that the browser blocks WhatsApp.
    const whatsappWindow = window.open("about:blank", "_blank");

    setIsSubmitting(true);

    try {
      // 1. Save the booking in MySQL through the backend.
      const response = await api.post("/bookings", {
        customer_id: null,
        pickup: form.pickup.trim(),
        destination: form.destination.trim(),
        travelDate: form.travelDate,
        travelTime: form.travelTime,
        vehicle: null,
        passengers: Number(form.passengers),
        luggage: "",
        notes: bookingNotes,
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Unable to save your booking."
        );
      }

      const bookingId = response.data.bookingId;

      // 2. Create WhatsApp message after successful database save.
      const whatsappMessage = [
        "Hello MaxiCabStar Prime, I would like to enquire about a ride.",
        "",
        `Booking ID: ${bookingId}`,
        `Trip type: ${tripLabel}`,
        `Pickup: ${form.pickup.trim()}`,
        `Destination: ${form.destination.trim()}`,
        `Travel date: ${form.travelDate}`,
        `Travel time: ${form.travelTime}`,
        `Passengers: ${form.passengers}`,
        `Name: ${form.name.trim()}`,
        `Contact number: ${form.phone.trim()}`,
        form.email.trim()
          ? `Email: ${form.email.trim()}`
          : "",
        form.notes.trim()
          ? `Additional requirements: ${form.notes.trim()}`
          : "",
        "",
        "Please confirm availability and provide a quotation.",
      ]
        .filter(Boolean)
        .join("\n");

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(
        /\D/g,
        ""
      )}?text=${encodeURIComponent(whatsappMessage)}`;

      // 3. Navigate the opened tab to WhatsApp.
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        window.location.href = whatsappUrl;
      }

      setSuccess(
        `Booking enquiry saved successfully! Booking ID: ${bookingId}`
      );

      // Clear the form after successful database save.
      setForm(initialForm);
    } catch (err) {
      console.error("Booking submission error:", err);

      // Close the blank tab if saving failed.
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.close();
      }

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to save booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.65, ease: "easeOut" },
      };

  return (
    <section
      id="booking-form"
      className="relative overflow-hidden bg-[#F8F4EE] py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#B58A4A]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <motion.div
          {...reveal}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#B58A4A]" />

            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#96702C]">
              Your Journey Begins Here
            </span>

            <span className="h-px w-9 bg-[#B58A4A]" />
          </div>

          <h2 className="font-serif text-4xl font-medium leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
            Reserve Your
            <span className="block text-[#A77D19]">
              Premium Ride.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#696256] sm:text-base sm:leading-8">
            Share your trip details below. Our team can review your
            request and confirm availability and pricing with you.
          </p>
        </motion.div>

        {/* Booking form card */}
        <motion.div
          {...reveal}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 0.7,
                  delay: 0.1,
                  ease: "easeOut",
                }
          }
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#D9CEBA] bg-white shadow-[0_25px_80px_rgba(45,35,15,0.10)]"
        >
          {/* Card header */}
          <div className="relative overflow-hidden bg-[#0B0B0B] px-6 py-7 text-[#F8F4EE] sm:px-9 sm:py-8">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-20 h-48 w-48 rounded-full border border-[#D4AF37]/20"
            />

            <div
              aria-hidden="true"
              className="absolute -right-2 -top-12 h-36 w-36 rounded-full border border-[#D4AF37]/15"
            />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  MaxiCabStar Prime
                </p>

                <h3 className="mt-2 font-serif text-2xl sm:text-3xl">
                  Plan Your Journey
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  Complete the form to send your booking enquiry.
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2.5 text-xs font-medium text-[#E6CA79]">
                <CheckCircle2 size={16} />
                Easy Booking Enquiry
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-8 lg:p-10"
          >
            {/* Trip type */}
            <fieldset>
              <legend className="mb-4 text-sm font-semibold text-[#27241F]">
                What type of ride do you need?
              </legend>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {tripOptions.map((option) => {
                  const Icon = option.icon;
                  const selected = form.tripType === option.value;

                  return (
                    <label
                      key={option.value}
                      className={`flex min-h-[94px] cursor-pointer items-center gap-3 rounded-xl border p-3 transition duration-200 sm:p-4 ${
                        selected
                          ? "border-[#B58A4A] bg-[#D4AF37]/10 ring-1 ring-[#D4AF37]/30"
                          : "border-[#E6DFD3] bg-white hover:border-[#C7AE78]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tripType"
                        value={option.value}
                        checked={selected}
                        onChange={updateField}
                        className="sr-only"
                      />

                      <Icon
                        size={21}
                        className={`shrink-0 ${
                          selected
                            ? "text-[#99701A]"
                            : "text-[#777064]"
                        }`}
                      />

                      <span
                        className={`text-xs font-semibold leading-5 sm:text-sm ${
                          selected
                            ? "text-[#4B3914]"
                            : "text-[#514C43]"
                        }`}
                      >
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Pickup and destination */}
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="pickup" className={labelClass}>
                  <MapPin size={17} className="text-[#A77D19]" />
                  Pickup Location *
                </label>

                <input
                  id="pickup"
                  name="pickup"
                  type="text"
                  autoComplete="street-address"
                  placeholder="e.g. Changi Airport Terminal 3"
                  value={form.pickup}
                  onChange={updateField}
                  className={inputClass}
                  required
                  maxLength={180}
                />
              </div>

              <div>
                <label htmlFor="destination" className={labelClass}>
                  <MapPin size={17} className="text-[#A77D19]" />
                  Drop-off Location *
                </label>

                <input
                  id="destination"
                  name="destination"
                  type="text"
                  placeholder="e.g. Marina Bay Sands"
                  value={form.destination}
                  onChange={updateField}
                  className={inputClass}
                  required
                  maxLength={180}
                />
              </div>
            </div>

            {/* Date, time, passengers */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  Passengers
                </label>

                <select
                  id="passengers"
                  name="passengers"
                  value={form.passengers}
                  onChange={updateField}
                  className={inputClass}
                >
                  {Array.from(
                    { length: 13 },
                    (_, index) => index + 1
                  ).map((count) => (
                    <option key={count} value={String(count)}>
                      {count} {count === 1 ? "Passenger" : "Passengers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact details */}
            <div className="mt-8 border-t border-[#E9E0D0] pt-7">
              <h4 className="font-serif text-2xl font-semibold text-[#171717]">
                Your Contact Details
              </h4>

              <p className="mt-2 text-sm leading-6 text-[#777064]">
                So the team can get back to you about your enquiry.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
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
                    required
                    maxLength={100}
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
                    required
                    maxLength={30}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className={labelClass}>
                    Email Address{" "}
                    <span className="font-normal text-[#8B8478]">
                      (optional)
                    </span>
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
                    Additional Requirements{" "}
                    <span className="font-normal text-[#8B8478]">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Flight number, luggage details or special requests..."
                    value={form.notes}
                    onChange={updateField}
                    className={`${inputClass} resize-y`}
                    maxLength={1000}
                  />
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {error}
              </p>
            )}

            {/* Success message */}
            {success && (
              <p
                role="status"
                className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700"
              >
                {success}
              </p>
            )}

            {/* Submit button */}
            <div className="mt-7 border-t border-[#E9E0D0] pt-7">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-6 py-4 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#D4AF37]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#E8C95D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A77D19] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[260px]"
              >
                <MessageCircle size={19} />

                {isSubmitting
                  ? "Saving Booking..."
                  : "Send Booking Enquiry"}

                {!isSubmitting && (
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                )}
              </button>

              <p className="mt-4 flex items-start gap-2 text-xs leading-6 text-[#777064]">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-[#A77D19]"
                />

                Your booking enquiry will be saved before WhatsApp opens.
                Your ride is not confirmed until the company responds.
              </p>
            </div>
          </form>
        </motion.div>

        {/* Bottom note */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#777064] sm:text-sm">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#A77D19]" />
            Simple enquiry process
          </span>

          <span className="flex items-center gap-2">
            <CarFront size={17} className="text-[#A77D19]" />
            Travel arrangements subject to confirmation
          </span>
        </div>
      </div>
    </section>
  );
}
