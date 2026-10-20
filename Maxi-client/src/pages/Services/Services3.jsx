
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Luggage,
  MapPin,
  Plane,
} from "lucide-react";
import { Link } from "react-router-dom";

import airportImage from "../../assets/maxicab-2.jpg";

const benefits = [
  "Airport pickup and drop-off enquiries",
  "Transport options for different group sizes",
  "Space requirements for passengers and luggage",
  "Booking arrangements based on your itinerary",
];

export default function Services3() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="airport-transfers"
      className="relative overflow-hidden bg-[#111111] px-5 py-20 text-[#F8F4EE] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section label */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
          }}
          className="mb-12 text-center lg:mb-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#D4AF37]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-sm">
              Travel Made Convenient
            </span>

            <span className="h-px w-10 bg-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Airport Transfers
            <span className="mt-2 block text-[#D4AF37]">
              In Singapore
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            Plan your journey to or from Singapore Changi Airport with
            transport options suited to your pickup location, passenger
            count, luggage and travel schedule.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -30,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
            }}
            className="relative"
          >
            <div className="absolute -left-3 -top-3 h-20 w-20 border-l border-t border-[#D4AF37]/70 sm:-left-5 sm:-top-5" />

            <div className="group relative overflow-hidden border border-white/10">
              <img
                src={airportImage}
                alt="Passenger transport for an airport journey"
                loading="lazy"
                className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[430px] lg:h-[490px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Image information */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center border border-[#D4AF37]/50 bg-black/40 text-[#D4AF37]">
                    <Plane size={21} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                      Airport Travel
                    </p>

                    <p className="mt-1 font-serif text-xl text-white sm:text-2xl">
                      Start Your Journey Right
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 h-20 w-20 border-b border-r border-[#D4AF37]/70 sm:-bottom-5 sm:-right-5" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : 30,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.1,
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              Convenient Airport Journeys
            </span>

            <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              From Arrival to
              <span className="block text-[#D4AF37]">
                Your Destination
              </span>
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              Whether you are arriving in Singapore, heading to the
              airport for departure or arranging transport for a group,
              planning ahead helps make your journey more straightforward.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              Share your flight details, pickup point, destination,
              passenger count and luggage requirements when enquiring
              so the appropriate transport arrangements can be discussed.
            </p>

            {/* Benefits */}
            <div className="mt-7 space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#D4AF37]"
                  />

                  <p className="text-sm leading-6 text-white/75 sm:text-base">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick details */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="border border-white/10 bg-white/[0.025] p-4">
                <MapPin
                  size={20}
                  className="mb-3 text-[#D4AF37]"
                />

                <p className="text-sm font-medium text-white">
                  Pickup & Drop-off
                </p>

                <p className="mt-1 text-xs leading-5 text-white/45">
                  Share your travel locations
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.025] p-4">
                <Luggage
                  size={20}
                  className="mb-3 text-[#D4AF37]"
                />

                <p className="text-sm font-medium text-white">
                  Luggage Needs
                </p>

                <p className="mt-1 text-xs leading-5 text-white/45">
                  Tell us what you need to carry
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/booking?service=Airport%20Transfers"
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#F0D77A]"
            >
              Enquire About Airport Transfers

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-white/40">
              <Clock3 size={14} className="shrink-0" />
              Advance arrangements and availability should be confirmed
              when booking.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
