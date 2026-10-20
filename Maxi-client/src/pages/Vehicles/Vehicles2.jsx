
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  CheckCircle2,
  BusFront,
  CarFront,
  Sparkles,
} from "lucide-react";

import vehicle1 from "../../assets/13 seater.jpg";
import vehicle2 from "../../assets/6 seater 2.jpeg";
import vehicle3 from "../../assets/23 seater.jpg";
import vehicle4 from "../../assets/49 seater.jpg";
import vehicle5 from "../../assets/4 seater.jpg";

const vehicles = [
  {
    id: 1,
    name: "4-Seater Cab",
    subtitle: "Comfortable Private Travel",
    quantity: 5,
    image: vehicle5,
    icon: CarFront,
    description:
      "A convenient option for individuals, couples, and small groups travelling around Singapore.",
    features: [
      "Suitable for smaller groups",
      "Private point-to-point transfers",
      "Convenient city travel",
    ],
    tag: "Small Groups",
    seats: "4 Seater",
  },
  {
    id: 2,
    name: "6-Seater Vehicle",
    subtitle: "Comfortable Small-Group Travel",
    quantity: 2,
    image: vehicle2,
    icon: CarFront,
    description:
      "A practical choice for families and small groups looking for comfortable transportation around Singapore.",
    features: [
      "Suitable for small groups",
      "Private transfer options",
      "Airport and city travel",
    ],
    tag: "Family Travel",
    seats: "6 Seater",
  },
  {
    id: 3,
    name: "13-Seater Maxi Cab",
    subtitle: "Spacious Group Transfers",
    quantity: 6,
    image: vehicle1,
    icon: Users,
    description:
      "A versatile option for families, friends, and group journeys that need additional passenger capacity.",
    features: [
      "Ideal for group travel",
      "Point-to-point transfers",
      "Airport transfer enquiries",
    ],
    tag: "Popular Choice",
    seats: "13 Seater",
  },
  {
    id: 4,
    name: "23-Seater Minibus",
    subtitle: "Travel Together with Ease",
    quantity: 1,
    image: vehicle3,
    icon: BusFront,
    description:
      "An option for larger groups, organised outings, and group transportation across Singapore.",
    features: [
      "Designed for larger groups",
      "Group and event transfers",
      "Convenient group travel",
    ],
    tag: "Large Groups",
    seats: "23 Seater",
  },
  {
    id: 5,
    name: "45-Seater Coach",
    subtitle: "Group and Event Transportation",
    quantity: 1,
    image: vehicle4,
    icon: BusFront,
    description:
      "A coach option for large parties, corporate outings, events, and organised group journeys.",
    features: [
      "Suitable for large parties",
      "Corporate and event travel",
      "Group transportation",
    ],
    tag: "Large-Scale Travel",
    seats: "45 Seater",
  },
];

const fleetSummary = [
  { count: "05", label: "4-Seater Cabs" },
  { count: "02", label: "6-Seater Vehicles" },
  { count: "06", label: "13-Seater Vehicles" },
  { count: "01", label: "23-Seater Minibus" },
  { count: "01", label: "45-Seater Coach" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Vehicles2() {
  return (
    <section
      id="vehicle-collection"
      className="relative overflow-hidden bg-[#0B0B0B] px-4 py-20 text-[#F8F4EE] sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#D4AF37]/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-sm">
            <Sparkles size={16} />
            Our Vehicle Collection
          </span>

          <h2 className="mt-5 font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
            The Right Ride for
            <span className="block text-[#D4AF37]">
              Every Journey
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#F8F4EE]/65 sm:text-base sm:leading-8">
            From comfortable 4-seater cabs to spacious coaches,
            explore our fleet and find a vehicle option that suits
            your travel requirements around Singapore.
          </p>

          <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* Fleet summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 grid grid-cols-2 gap-3 sm:mb-16 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4"
        >
          {fleetSummary.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#D4AF37]/20 bg-white/[0.025] px-3 py-5 text-center sm:px-5 sm:py-6"
            >
              <p className="font-serif text-3xl text-[#D4AF37] sm:text-4xl">
                {item.count}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#F8F4EE]/65 sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Total fleet count */}
        <div className="mb-10 flex items-center justify-between gap-4 border-y border-white/10 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
              Our Fleet
            </p>
            <p className="mt-1 text-sm text-white/60">
              Five vehicle categories
            </p>
          </div>

          <p className="font-serif text-2xl text-white sm:text-3xl">
            15 Vehicles
          </p>
        </div>

        {/* Vehicle cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8"
        >
          {vehicles.map((vehicle) => {
            const VehicleIcon = vehicle.icon;

            return (
              <motion.article
                key={vehicle.id}
                variants={cardVariants}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition-colors duration-300 hover:border-[#D4AF37]/50"
              >
                {/* Vehicle image */}
                <div className="relative h-60 overflow-hidden sm:h-64">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10" />

                  <span className="absolute left-4 top-4 rounded-full border border-[#D4AF37]/40 bg-black/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37] backdrop-blur-sm sm:text-xs">
                    {vehicle.tag}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="mb-1 text-xs text-white/70">
                        Fleet quantity
                      </p>

                      <p className="font-serif text-2xl text-white sm:text-3xl">
                        {String(vehicle.quantity).padStart(2, "0")}{" "}
                        <span className="font-sans text-sm text-white/70">
                          {vehicle.quantity === 1
                            ? "vehicle"
                            : "vehicles"}
                        </span>
                      </p>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black/60 text-[#D4AF37] backdrop-blur-sm">
                      <VehicleIcon size={23} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Vehicle details */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-md bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-semibold text-[#D4AF37]">
                      {vehicle.seats}
                    </span>

                    <span className="text-xs text-[#F8F4EE]/45">
                      MaxiCabStar Prime
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-medium sm:text-3xl">
                    {vehicle.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-[#D4AF37]">
                    {vehicle.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-[#F8F4EE]/60">
                    {vehicle.description}
                  </p>

                  <div className="my-6 h-px bg-white/10" />

                  <ul className="space-y-3">
                    {vehicle.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-[#F8F4EE]/75"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-[#D4AF37]"
                        />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/booking?vehicle=${encodeURIComponent(
                      vehicle.name
                    )}`}
                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg border border-[#D4AF37] bg-[#D4AF37] px-4 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-transparent hover:text-[#D4AF37]"
                  >
                    Enquire About This Vehicle

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#D4AF37]/10 to-transparent px-5 py-9 text-center sm:mt-16 sm:px-10 sm:py-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            Need Help Choosing?
          </p>

          <h3 className="mt-4 font-serif text-3xl sm:text-4xl">
            Let Us Help Plan Your Journey
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#F8F4EE]/65 sm:text-base">
            Tell us your group size and travel requirements, and
            enquire about the most suitable vehicle for your trip.
          </p>

          <Link
            to="/booking"
            className="mt-7 inline-flex items-center justify-center gap-3 rounded-lg bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F0D77A]"
          >
            Request a Booking
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
