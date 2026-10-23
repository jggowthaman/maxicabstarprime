
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BusFront,
  CarFront,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import vehicleHero from "../../assets/maxicab-6.jpg";

const fleetSummary = [
  { quantity: "05", label: "4-Seater Cabs" },
  { quantity: "02", label: "6-Seater Vehicles" },
  { quantity: "06", label: "13-Seater Vehicles" },
  { quantity: "01", label: "23-Seater Minibus" },
  { quantity: "01", label: "45-Seater Coach" },
];

export default function Vehicles1() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
      },
    },
  };

  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-[#0B0B0B] text-[#F8F4EE] sm:min-h-[82vh] lg:min-h-[88vh]">
      {/* Background image */}
      <motion.img
        src={vehicleHero}
        alt="MaxiCabStar Prime passenger transport"
        initial={{ scale: reduceMotion ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.2,
          ease: "easeOut",
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Image overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/25" />

      {/* Gold accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-[#D4AF37]" />

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Introduction */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.14,
                },
              },
            }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[#D4AF37]" />

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-sm">
                Our Fleet
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl leading-[1.12] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Find the Right Ride
              <span className="mt-2 block text-[#D4AF37]">
                for Your Journey
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg"
            >
              Explore the MaxiCabStar Prime fleet in Singapore, with
              options ranging from 4-seater cabs for smaller groups to
              a 45-seater coach for larger journeys. Whether you need
              an airport transfer, family outing, business trip, or
              group journey, find a vehicle suited to your travel needs.
            </motion.p>

            {/* Fleet highlights */}
            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-4 text-sm text-white/80"
            >
              <div className="flex items-center gap-2">
                <CarFront size={19} className="text-[#D4AF37]" />
                <span>4-Seater Cabs</span>
              </div>

              <div className="flex items-center gap-2">
                <BusFront size={19} className="text-[#D4AF37]" />
                <span>Group Transfers</span>
              </div>

              <div className="flex items-center gap-2">
                <Users size={19} className="text-[#D4AF37]" />
                <span>5 Vehicle Categories</span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-4 sm:mt-10 sm:flex-row"
            >
              <a
                href="#vehicle-collection"
                className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#F0D77A]"
              >
                Explore Our Fleet

                <ArrowDown
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>

              <Link
                to="/booking"
                className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/40 px-7 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Book Your Ride
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Fleet summary panel */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 25,
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.3,
            }}
            className="w-full max-w-lg lg:ml-auto"
          >
            <div className="border border-white/15 bg-black/55 p-5 backdrop-blur-md sm:p-7">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                    The Fleet
                  </span>

                  <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                    Choose Your Capacity
                  </h2>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37]">
                  <BusFront size={25} strokeWidth={1.5} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                {fleetSummary.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.label}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 15,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                      delay: reduceMotion ? 0 : 0.45 + index * 0.1,
                    }}
                    className="border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-[#D4AF37]/50 sm:p-5"
                  >
                    <span className="font-serif text-3xl text-[#D4AF37] sm:text-4xl">
                      {vehicle.quantity}
                    </span>

                    <p className="mt-2 text-xs leading-5 text-white/65 sm:text-sm">
                      {vehicle.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-white/60">
                  Total fleet
                </span>

                <span className="font-serif text-2xl text-white">
                  15 Vehicles
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-white/40">
                Vehicle availability and specifications should be
                confirmed when making a booking enquiry.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#vehicle-collection"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.8,
          }}
          className="mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#D4AF37] sm:mt-16"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25">
            <ArrowDown size={16} />
          </span>

          Discover the Fleet
        </motion.a>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 hidden h-24 w-24 border-b border-r border-[#D4AF37]/50 sm:block lg:h-32 lg:w-32" />
    </section>
  );
}
