
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plane,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Users,
  ArrowUpRight,
  CarFront,
} from "lucide-react";

const services = [
  {
    id: "airport",
    number: "01",
    icon: Plane,
    title: "Airport Transfers",
    description:
      "Plan convenient transfers to and from Singapore Changi Airport for arrivals, departures, families, and groups.",
    tag: "AIRPORT TRAVEL",
  },
  {
    id: "point-to-point",
    number: "02",
    icon: MapPin,
    title: "Point-to-Point",
    description:
      "Arrange a direct ride between your pickup location and destination anywhere within your service area.",
    tag: "DIRECT JOURNEYS",
  },
  {
    id: "corporate",
    number: "03",
    icon: BriefcaseBusiness,
    title: "Corporate Travel",
    description:
      "Organise transport for business meetings, company visits, events, and professional travel requirements.",
    tag: "BUSINESS TRAVEL",
  },
  {
    id: "hourly",
    number: "04",
    icon: Clock3,
    title: "Hourly Bookings",
    description:
      "Enquire about vehicle bookings by the hour for sightseeing, appointments, shopping, and flexible itineraries.",
    tag: "FLEXIBLE TRAVEL",
  },
  {
    id: "family",
    number: "05",
    icon: Users,
    title: "Family & Group Trips",
    description:
      "Find a suitable vehicle for family outings, group transfers, celebrations, and journeys with extra passengers.",
    tag: "FAMILY & GROUPS",
  },
  {
    id: "private",
    number: "06",
    icon: CarFront,
    title: "Private Transfers",
    description:
      "Request a private transfer tailored to your itinerary, travel schedule, and vehicle requirements.",
    tag: "PERSONALISED TRAVEL",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Home4() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="our-services"
      className="relative overflow-hidden bg-[#F8F4EE] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={
            shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#B58A4A]" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#94702E] sm:text-sm">
              What We Offer
            </span>
            <span className="h-px w-8 bg-[#B58A4A]" />
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
            Travel Solutions
            <span className="block text-[#B58A4A]">
              Made for You
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#706B64] sm:text-base sm:leading-8">
            From airport pickups to business travel and family outings,
            explore transport services designed around your journey in Singapore.
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.id}
                variants={shouldReduceMotion ? undefined : cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -6, transition: { duration: 0.25 } }
                }
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E6DED1] bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(17,17,17,0.08)] sm:p-8"
              >
                {/* Gold accent */}
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-300 group-hover:scale-x-100" />

                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#A77B25] transition-colors duration-300 group-hover:bg-[#D4AF37] group-hover:text-[#111111]">
                    <Icon size={27} strokeWidth={1.6} />
                  </div>

                  <span className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#D9D0C1] transition-colors group-hover:text-[#B58A4A]">
                    {service.number}
                  </span>
                </div>

                <p className="mb-3 text-[10px] font-semibold tracking-[0.18em] text-[#A77B25]">
                  {service.tag}
                </p>

                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#171717] sm:text-3xl">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-[#706B64]">
                  {service.description}
                </p>

                <div className="my-6 h-px bg-[#EEE8DE]" />

                <Link
                  to="/booking"
                  className="inline-flex min-h-11 items-center justify-between gap-3 text-sm font-semibold text-[#171717] transition-colors hover:text-[#A77B25]"
                >
                  Enquire About This Service
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/50 text-[#A77B25] transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#111111]">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom booking banner */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={
            shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#111111] px-6 py-8 sm:mt-16 sm:flex-row sm:px-9 sm:py-10 lg:px-12"
        >
          <div className="text-center sm:text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Plan Your Next Trip
            </p>

            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              The right journey starts here.
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
              Tell us your destination, group size, and travel requirements.
            </p>
          </div>

          <Link
            to="/booking"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-[#111111] transition-colors duration-300 hover:bg-[#E6C65B] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#111111]"
          >
            Book Your Ride
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
