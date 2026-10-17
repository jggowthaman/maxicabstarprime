
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Airport Transfer",
    location: "Singapore",
    title: "Comfortable Journey",
    review:
      "Looking for a comfortable airport transfer? Our service is designed to make planning your journey simple and convenient.",
  },
  {
    id: 2,
    name: "Family Travel",
    location: "Singapore",
    title: "Space for Your Group",
    review:
      "Planning a family outing or group journey? Choose a suitable vehicle based on your passenger and luggage requirements.",
  },
  {
    id: 3,
    name: "Business Travel",
    location: "Singapore",
    title: "Travel with Convenience",
    review:
      "Arrange transport for meetings, corporate visits, and business journeys with a booking enquiry tailored to your plans.",
  },
  {
    id: 4,
    name: "Private Transfers",
    location: "Singapore",
    title: "A Ride for Your Plans",
    review:
      "From point-to-point transfers to hourly travel enquiries, share your requirements and find a suitable ride.",
  },
  {
    id: 5,
    name: "Group Transport",
    location: "Singapore",
    title: "Plan Your Group Journey",
    review:
      "Explore vehicle options for group outings and events, with passenger capacity and luggage needs in mind.",
  },
];

export default function Home5() {
  const reduceMotion = useReducedMotion();

  // Duplicate cards to create a seamless horizontal loop.
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-[#0B0B0B] py-16 sm:py-20 lg:py-24"
    >
      {/* Heading */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-3xl px-5 text-center sm:mb-14"
      >
        <div className="mb-5 inline-flex items-center gap-3">
          <span className="h-px w-8 bg-[#D4AF37]" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            Customer Experience
          </span>
          <span className="h-px w-8 bg-[#D4AF37]" />
        </div>

        <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
          Every Journey
          <span className="block text-[#D4AF37]">
            Deserves More.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
          Discover the travel experiences MaxiCabStar Prime aims to provide
          for airport transfers, family trips, and group journeys.
        </p>
      </motion.div>

      {/* Infinite marquee */}
      <div
        className="group relative"
        aria-label="Customer experience highlights"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#0B0B0B] to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#0B0B0B] to-transparent sm:w-20" />

        <div
          className={`flex w-max gap-5 px-3 sm:gap-6 sm:px-5 ${
            reduceMotion ? "" : "animate-testimonial-marquee"
          } group-hover:[animation-play-state:paused]`}
          style={
            reduceMotion
              ? { overflowX: "auto", maxWidth: "100%" }
              : undefined
          }
        >
          {marqueeItems.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="flex w-[290px] shrink-0 flex-col rounded-2xl border border-white/10 bg-[#151515] p-6 transition-colors duration-300 hover:border-[#D4AF37]/50 sm:w-[350px] sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Quote size={21} />
                </div>

                <div
                  className="flex items-center gap-1 text-[#D4AF37]"
                  aria-label="Decorative stars"
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      fill="currentColor"
                      strokeWidth={1.2}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                {item.name}
              </p>

              <h3 className="mt-2 font-['Cormorant_Garamond'] text-2xl font-semibold text-white sm:text-3xl">
                {item.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-white/65">
                {item.review}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-xs text-white/45">
                  {item.location}
                </span>

                <span className="text-xs font-medium text-[#D4AF37]">
                  Travel highlight
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Booking CTA */}
      <div className="mx-auto mt-12 px-5 text-center sm:mt-16">
        <p className="mb-5 text-sm text-white/60">
          Ready to plan your next journey in Singapore?
        </p>

        <Link
          to="/booking"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#111111] transition hover:bg-[#E8C95D]"
        >
          Book Your Ride
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
