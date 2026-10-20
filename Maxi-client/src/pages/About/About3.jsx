
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Headset,
  ShieldCheck,
  Sparkles,
  Users,
  CarFront,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

import whyChooseImage from "../../assets/maxicab-3.jpg";

const features = [
  {
    number: "01",
    icon: CarFront,
    title: "Travel Options",
    description:
      "Explore transport options for airport transfers, business travel, family outings and group journeys.",
  },
  {
    number: "02",
    icon: Clock3,
    title: "Convenient Booking",
    description:
      "Share your pickup, destination and travel requirements through our straightforward booking enquiry.",
  },
  {
    number: "03",
    icon: Users,
    title: "Group-Friendly Travel",
    description:
      "Find a suitable vehicle option for your passenger count and luggage requirements.",
  },
  {
    number: "04",
    icon: Headset,
    title: "Customer-Focused Support",
    description:
      "We aim to make communication clear and help you with your transport enquiry.",
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Thoughtful Service",
    description:
      "We focus on understanding your travel needs and making the arrangements as straightforward as possible.",
  },
  {
    number: "06",
    icon: Sparkles,
    title: "Comfort in Mind",
    description:
      "Choose transport options with your journey, group size and comfort preferences in mind.",
  },
];

export default function About3() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-[#0B0B0B] px-5 py-20 text-[#F8F4EE] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-32 h-80 w-80 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#D4AF37]/[0.05] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 25,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
          }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-20"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#D4AF37]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-sm">
              The Difference
            </span>

            <span className="h-px w-10 bg-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Why Choose
            <span className="mt-2 block text-[#D4AF37]">
              MaxiCabStar Prime?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            Every journey has different requirements. We focus on helping
            you explore suitable transport options with convenient booking
            enquiries and a customer-focused approach.
          </p>
        </motion.div>

        {/* Main image and introduction */}
        <div className="mb-16 grid items-center gap-10 lg:mb-20 lg:grid-cols-2 lg:gap-16">
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

            <div className="relative overflow-hidden border border-white/10">
              <img
                src={whyChooseImage}
                alt="Passenger transport vehicle"
                loading="lazy"
                className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[460px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="font-serif text-2xl leading-snug sm:text-3xl">
                  Your journey,
                  <span className="block text-[#D4AF37]">
                    your requirements.
                  </span>
                </p>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 h-20 w-20 border-b border-r border-[#D4AF37]/70 sm:-bottom-5 sm:-right-5" />
          </motion.div>

          {/* Introduction */}
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
            className="lg:pl-2"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              Designed Around Your Journey
            </span>

            <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              The Right Transport
              <span className="block text-[#D4AF37]">
                Starts with the Right Choice
              </span>
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              From airport pickups to family outings and group travel,
              selecting a suitable vehicle helps make planning easier.
              MaxiCabStar Prime aims to help you find transport options
              based on your itinerary and passenger requirements.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Options for different passenger group sizes",
                "Booking enquiries tailored to your trip",
                "Clear communication about your requirements",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#D4AF37]/15 text-[#D4AF37]">
                    <Check size={13} strokeWidth={2.5} />
                  </span>

                  <p className="text-sm leading-6 text-white/80 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/services"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 border-b border-[#D4AF37]/60 pb-2 text-sm font-semibold text-[#D4AF37] transition-colors hover:text-[#F0D77A]"
            >
              Explore Our Services
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.number}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 25,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
                className="group relative overflow-hidden border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:bg-white/[0.045] sm:p-8"
              >
                {/* Number */}
                <span className="absolute right-6 top-5 font-serif text-3xl text-white/[0.08] transition-colors group-hover:text-[#D4AF37]/20">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className="mb-7 flex h-12 w-12 items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:text-black">
                  <Icon size={22} strokeWidth={1.6} />
                </div>

                <h3 className="font-serif text-xl text-white sm:text-2xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {feature.description}
                </p>

                <div className="mt-6 h-px w-10 bg-[#D4AF37]/60 transition-all duration-300 group-hover:w-16" />
              </motion.article>
            );
          })}
        </div>

        {/* Booking CTA */}
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
          className="mt-16 flex flex-col items-start justify-between gap-6 border border-[#D4AF37]/25 bg-[#D4AF37]/[0.04] p-6 sm:mt-20 sm:flex-row sm:items-center sm:p-9 lg:p-10"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              Plan Your Next Trip
            </span>

            <h3 className="mt-3 font-serif text-2xl sm:text-3xl">
              Let's Find the Right Ride for You
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">
              Tell us about your journey and explore the available
              transport options for your requirements.
            </p>
          </div>

          <Link
            to="/booking"
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#F0D77A]"
          >
            Book Your Ride
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
