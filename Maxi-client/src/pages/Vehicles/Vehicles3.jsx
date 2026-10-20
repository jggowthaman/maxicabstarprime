
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Armchair,
  BriefcaseBusiness,
  Clock3,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import comfortImage from "../../assets/maxicab-2.jpg";

const benefits = [
  {
    icon: Armchair,
    title: "Comfortable Journeys",
    description:
      "Choose a vehicle category that suits your group size and travel requirements for your journey around Singapore.",
    number: "01",
  },
  {
    icon: BriefcaseBusiness,
    title: "Room for Your Plans",
    description:
      "Whether you are travelling for business, a family outing, or a group event, enquire about the vehicle that fits your needs.",
    number: "02",
  },
  {
    icon: Clock3,
    title: "Plan Your Journey",
    description:
      "Share your preferred pickup time and travel details with our team when making your booking enquiry.",
    number: "03",
  },
  {
    icon: MapPinned,
    title: "Travel Around Singapore",
    description:
      "Explore vehicle options for airport transfers, city journeys, private trips, and group transportation.",
    number: "04",
  },
  {
    icon: Users,
    title: "Options for Every Group",
    description:
      "From 4-seater cabs to a 45-seater coach, our fleet offers five vehicle categories for different group sizes.",
    number: "05",
  },
  {
    icon: ShieldCheck,
    title: "Clear Booking Enquiries",
    description:
      "Confirm availability, vehicle specifications, and your trip requirements with our team before your journey.",
    number: "06",
  },
];

export default function Vehicles3() {
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
        duration: reduceMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] px-4 py-20 text-[#F8F4EE] sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#D4AF37]/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] sm:text-sm">
            <Sparkles size={16} />
            Comfort & Convenience
          </span>

          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Every Journey,
            <span className="block text-[#D4AF37]">
              Thoughtfully Planned
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            The right vehicle can make planning your journey easier.
            Explore our range of transport options and choose the
            category that matches your group size and travel plans.
          </p>

          <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* Main feature layout */}
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image panel */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: "easeOut",
            }}
            className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[480px] lg:min-h-full"
          >
            <img
              src={comfortImage}
              alt="Vehicle for comfortable group transportation"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />

            <div className="absolute left-5 top-5 border border-[#D4AF37]/50 bg-black/50 px-4 py-3 backdrop-blur-sm sm:left-7 sm:top-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                MaxiCabStar Prime
              </p>
              <p className="mt-1 text-sm text-white/80">
                Your journey, your choice
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Travel Your Way
              </span>

              <h3 className="mt-3 max-w-lg font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                The Right Space for Your Journey
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                From individual travel to large group transportation,
                find a vehicle option suited to your plans.
              </p>

              <Link
                to="/booking"
                className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#D4AF37] transition-colors hover:text-[#F0D77A]"
              >
                Discuss Your Requirements
                <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>

          {/* Benefits grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.1,
                },
              },
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {benefits.map((benefit) => {
              const BenefitIcon = benefit.icon;

              return (
                <motion.article
                  key={benefit.number}
                  variants={fadeUp}
                  className="group rounded-xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.045] sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center border border-[#D4AF37]/30 bg-[#D4AF37]/[0.07] text-[#D4AF37] transition-colors duration-300 group-hover:bg-[#D4AF37] group-hover:text-black">
                      <BenefitIcon size={22} strokeWidth={1.6} />
                    </div>

                    <span className="font-serif text-xl text-white/20">
                      {benefit.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-xl text-white sm:text-2xl">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        {/* Fleet capacity strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-12 rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-r from-[#D4AF37]/[0.08] via-transparent to-[#D4AF37]/[0.04] p-6 sm:mt-16 sm:p-9"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                Five Vehicle Categories
              </p>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl">
                From 4-Seater Cabs to 45-Seater Coaches
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/60">
                Tell us your passenger requirements and preferred
                journey details so you can enquire about the
                appropriate vehicle.
              </p>
            </div>

            <Link
              to="/vehicles"
              className="inline-flex shrink-0 items-center justify-center gap-3 border border-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-[#D4AF37] transition-colors duration-300 hover:bg-[#D4AF37] hover:text-black"
            >
              Explore All Vehicles
              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
