
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import aboutImage from "../../assets/maxicab-2.jpg";

const highlights = [
  "Transport solutions for individuals, families and groups",
  "Convenient booking for different travel requirements",
  "A customer-focused approach to every journey",
];

const values = [
  {
    icon: ShieldCheck,
    title: "Dependable Service",
    description:
      "We aim to make every journey smooth through clear communication and thoughtful arrangements.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "We focus on understanding your travel requirements and helping you find a suitable transport option.",
  },
  {
    icon: Sparkles,
    title: "Comfortable Journeys",
    description:
      "From airport transfers to family outings, explore transport options suited to your journey.",
  },
];

export default function About2() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="who-we-are"
      className="relative overflow-hidden bg-[#0B0B0B] px-5 py-20 text-[#F8F4EE] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/[0.07] blur-[100px]"
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
            y: shouldReduceMotion ? 0 : 30,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
          }}
          className="mx-auto mb-16 max-w-3xl text-center sm:mb-20"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#D4AF37]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-sm">
              Who We Are
            </span>

            <span className="h-px w-10 bg-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Every Journey Begins
            <span className="mt-2 block text-[#D4AF37]">
              With Trust and Comfort
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            At MaxiCabStar Prime, we believe transportation should be more
            than simply getting from one place to another. It should be a
            convenient and comfortable experience designed around your
            travel needs.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : -35,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.75,
            }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -left-3 -top-3 h-24 w-24 border-l border-t border-[#D4AF37]/70 sm:-left-5 sm:-top-5" />

            <div className="relative overflow-hidden border border-white/10">
              <img
                src={aboutImage}
                alt="Passenger transport vehicle for journeys in Singapore"
                loading="lazy"
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[490px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="mb-3 flex items-center gap-2 text-[#D4AF37]">
                  <Compass size={18} />

                  <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                    Our Approach
                  </span>
                </div>

                <p className="max-w-sm font-serif text-2xl leading-snug text-white sm:text-3xl">
                  Your destination matters. So does the journey.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 h-24 w-24 border-b border-r border-[#D4AF37]/70 sm:-bottom-5 sm:-right-5" />
          </motion.div>

          {/* Company introduction */}
          <motion.div
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 35,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.75,
              delay: shouldReduceMotion ? 0 : 0.12,
            }}
            className="pt-2 lg:pl-2"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              Discover MaxiCabStar Prime
            </span>

            <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Transport Designed Around
              <span className="block text-[#D4AF37]">
                Your Travel Needs
              </span>
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              We offer transport options for individuals, families,
              business travellers and groups in Singapore. Whether you
              need an airport transfer, a family outing or group
              transportation, our goal is to help make planning your
              journey straightforward.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              We value clear communication, convenient booking enquiries
              and a customer-focused approach. We want you to feel
              informed when choosing a transport option for your trip.
            </p>

            {/* Highlights */}
            <div className="mt-7 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#D4AF37]"
                  />

                  <p className="text-sm leading-6 text-white/80 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#F0D77A]"
              >
                Book Your Ride

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <Link
                to="/services"
                className="inline-flex min-h-12 items-center justify-center border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Core values */}
        <div className="mt-20 grid gap-5 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 24,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.12,
                }}
                className="group border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:bg-white/[0.045] sm:p-8"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] transition-colors duration-300 group-hover:bg-[#D4AF37] group-hover:text-black">
                  <Icon size={23} strokeWidth={1.6} />
                </div>

                <h4 className="font-serif text-xl text-white sm:text-2xl">
                  {value.title}
                </h4>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
