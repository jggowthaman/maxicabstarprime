import { motion } from "framer-motion";
import { FileText, ShieldCheck, Clock, CarFront } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const sections = [
  {
    title: "1. Introduction",
    content: `These Terms and Conditions govern the use of the MaxiCabStar Prime website and transportation services in Singapore. By accessing our website or making a booking, you agree to these terms.

If you do not agree with these terms, please do not use our website or services.`,
  },
  {
    title: "2. Booking and Reservations",
    content: `All bookings are subject to availability and confirmation by MaxiCabStar Prime.

When making a booking, customers must provide accurate information, including their name, contact details, pickup location, destination, date, time, passenger count, and luggage requirements.

A booking request submitted through our website does not automatically guarantee a confirmed reservation. Confirmation may be provided through phone, email, or WhatsApp.`,
  },
  {
    title: "3. Pricing and Payments",
    content: `Prices will be communicated to customers during the booking or confirmation process.

Additional charges may apply for waiting time, additional stops, changes to the itinerary, parking, tolls, or other services where applicable. Any applicable additional charges should be communicated to the customer.

Customers are responsible for paying the agreed service charges according to the payment instructions provided during booking.`,
  },
  {
    title: "4. Cancellation and Booking Changes",
    content: `Customers should contact MaxiCabStar Prime as early as possible to cancel or modify a reservation.

Cancellation fees, refund eligibility, and modification charges may depend on the booking type and the cancellation terms communicated at the time of reservation.

Changes to pickup time, destination, passenger count, or vehicle type are subject to availability and confirmation.`,
  },
  {
    title: "5. Pickup and Waiting Time",
    content: `Customers are responsible for being ready at the agreed pickup location and time.

Please provide accurate pickup details and a reachable contact number. Additional waiting charges may apply if communicated in advance or agreed during booking.

For airport pickups, customers should provide accurate flight information where requested.`,
  },
  {
    title: "6. Passenger Responsibilities",
    content: `Passengers are expected to behave respectfully and follow applicable laws and safety instructions.

Customers must:
- Provide accurate booking and passenger information.
- Avoid damaging or excessively soiling the vehicle.
- Follow driver safety instructions.
- Ensure children are appropriately supervised.
- Avoid carrying prohibited or dangerous items.
- Respect the driver and other passengers.

Additional charges may apply for damage or excessive cleaning where permitted by applicable law and communicated to the customer.`,
  },
  {
    title: "7. Luggage and Passenger Capacity",
    content: `Customers must select a vehicle suitable for the number of passengers and luggage.

Passenger and luggage capacity limits must not be exceeded. MaxiCabStar Prime may recommend a different vehicle if the selected vehicle is unsuitable for the booking requirements.

Customers should inform us in advance about oversized luggage, special equipment, or additional requirements.`,
  },
  {
    title: "8. Delays and Unforeseen Circumstances",
    content: `We make reasonable efforts to provide transportation services on time. However, delays may occur due to traffic, weather, road closures, accidents, airport conditions, or other circumstances beyond our reasonable control.

We will make reasonable efforts to communicate significant delays or service changes.

MaxiCabStar Prime is not responsible for losses resulting from delays beyond our reasonable control, subject to applicable law.`,
  },
  {
    title: "9. Vehicle and Driver Availability",
    content: `The vehicle requested during booking is subject to availability.

If necessary, MaxiCabStar Prime may provide a suitable alternative vehicle or driver while maintaining the agreed service requirements, where reasonably possible.

All transportation services are subject to applicable Singapore laws and regulations.`,
  },
  {
    title: "10. Website Usage",
    content: `Users agree not to misuse our website, submit false booking information, attempt unauthorized access, or interfere with website operations.

We reserve the right to restrict access to the website where misuse, fraudulent activity, or security concerns are identified.`,
  },
  {
    title: "11. Privacy and Personal Information",
    content: `Personal information submitted through our website or booking channels will be handled according to our Privacy Policy.

Please review our Privacy Policy to understand how personal information is collected, used, and protected.`,
    link: true,
  },
  {
    title: "12. Limitation of Liability",
    content: `To the extent permitted by applicable law, MaxiCabStar Prime shall not be responsible for indirect or consequential losses arising from the use of our website or transportation services.

Nothing in these terms excludes or limits liability where such exclusion or limitation is prohibited under applicable law.`,
  },
  {
    title: "13. Third-Party Services",
    content: `Our website may contain links to third-party platforms such as WhatsApp or other external services.

We are not responsible for the availability, content, or policies of third-party services. Your use of those services is subject to their own terms and privacy policies.`,
  },
  {
    title: "14. Changes to These Terms",
    content: `MaxiCabStar Prime may update these Terms and Conditions from time to time.

Updated terms will be published on this page. Continued use of our website or services after changes are published constitutes acceptance of the updated terms, to the extent permitted by applicable law.`,
  },
  {
    title: "15. Governing Law",
    content: `These Terms and Conditions are intended to be governed by the laws of Singapore, subject to applicable legal requirements.`,
  },
];

export default function TermsAndConditions() {
  return (
    <>
      {/* SEO */}
      <SEO
        title="Terms & Conditions | MaxiCabStar Prime Singapore"
        description="Read MaxiCabStar Prime's Singapore maxicab booking terms and conditions covering reservations, cancellations, payments, passenger responsibilities, and transportation services."
        path="/terms-and-conditions"
      />

      <main className="min-h-screen bg-[#0B0B0B] text-[#F8F4EE]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#D4AF37]/20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <FileText className="h-8 w-8 text-[#D4AF37]" />

                <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#D4AF37]">
                  Service Agreement
                </span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Terms &{" "}
                <span className="text-[#D4AF37]">Conditions</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                Please review the terms governing bookings and transportation
                services provided by MaxiCabStar Prime.
              </p>

              <p className="mt-5 text-sm text-white/40">
                Last Updated: November 6, 2026
              </p>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 py-12 sm:grid-cols-3 sm:px-8">
          {[
            {
              icon: CarFront,
              title: "Transportation",
              description: "Booking and vehicle service conditions.",
            },
            {
              icon: Clock,
              title: "Booking Policy",
              description: "Reservation, cancellation, and timing terms.",
            },
            {
              icon: ShieldCheck,
              title: "Customer Safety",
              description: "Passenger responsibilities and service rules.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <Icon className="mb-4 h-7 w-7 text-[#D4AF37]" />

                <h3 className="mb-2 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-white/50">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        {/* Terms */}
        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
          <div className="space-y-10">
            {sections.map((section) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="border-b border-white/10 pb-8"
              >
                <h2 className="mb-4 text-xl font-semibold text-[#D4AF37] sm:text-2xl">
                  {section.title}
                </h2>

                <p className="whitespace-pre-line text-sm leading-8 text-white/65 sm:text-base">
                  {section.content}
                </p>

                {section.link && (
                  <Link
                    to="/privacy-policy"
                    className="mt-4 inline-block text-sm text-[#D4AF37] hover:text-white"
                  >
                    Read our Privacy Policy →
                  </Link>
                )}
              </motion.article>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-6 sm:p-8">
            <h2 className="mb-3 text-xl font-semibold">
              Questions About These Terms?
            </h2>

            <p className="text-sm leading-7 text-white/60">
              Please contact MaxiCabStar Prime through our website or
              customer service channels for clarification regarding
              bookings and transportation services.
            </p>

            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:text-white"
            >
              Contact Us →
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-10 text-center">
            <Link
              to="/"
              className="text-sm text-[#D4AF37] transition hover:text-white"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}