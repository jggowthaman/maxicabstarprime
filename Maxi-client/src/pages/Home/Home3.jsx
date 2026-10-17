
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  Sparkles,
  Headset,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Comfort & Safety",
    description:
      "Enjoy a comfortable journey with travel arrangements designed around your needs.",
    points: ["Comfort-focused travel", "Passenger-first service"],
  },
  {
    number: "02",
    icon: Clock3,
    title: "Convenient Transfers",
    description:
      "Plan your airport transfers, family trips, and everyday journeys with ease.",
    points: ["Flexible travel enquiries", "Simple booking process"],
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Premium Experience",
    description:
      "Experience a refined travel service with attention to detail throughout your journey.",
    points: ["Personalised trip requests", "Quality-focused experience"],
  },
  {
    number: "04",
    icon: Headset,
    title: "Booking Assistance",
    description:
      "Get in touch with our team to discuss your route, group size, and travel requirements.",
    points: ["Direct booking enquiries", "Help planning your trip"],
  },
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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home3() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-[#F8F4EE] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-28 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={
            shouldReduceMotion
              ? undefined
              : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#B58A4A]" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#94702E] sm:text-sm">
              The MaxiCabStar Prime Difference
            </span>
            <span className="h-px w-8 bg-[#B58A4A]" />
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
            Travel Better.
            <span className="block text-[#B58A4A]">
              Arrive in Style.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#66615A] sm:text-base sm:leading-8">
            From airport transfers to family outings and group journeys,
            we make planning your next ride straightforward and convenient.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.number}
                variants={shouldReduceMotion ? undefined : cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -7, transition: { duration: 0.25 } }
                }
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white p-6 shadow-[0_8px_30px_rgba(17,17,17,0.03)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(17,17,17,0.09)] sm:p-7"
              >
                {/* Top accent */}
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-300 group-hover:scale-x-100" />

                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#A77B25] transition-colors duration-300 group-hover:bg-[#D4AF37] group-hover:text-[#111111]">
                    <Icon size={27} strokeWidth={1.6} />
                  </div>

                  <span className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#D9D0C1] transition-colors group-hover:text-[#B58A4A]">
                    {feature.number}
                  </span>
                </div>

                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#171717] sm:text-[27px]">
                  {feature.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-[#706B64]">
                  {feature.description}
                </p>

                <div className="my-6 h-px bg-[#EEE8DE]" />

                <ul className="space-y-3">
                  {feature.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-[#4E4942]"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#B58A4A]"
                        strokeWidth={1.8}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex justify-end">
                  <ArrowUpRight
                    size={20}
                    className="text-[#B58A4A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={
            shouldReduceMotion
              ? undefined
              : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-[#111111] px-6 py-7 sm:mt-16 sm:flex-row sm:px-9 sm:py-8"
        >
          <div>
            <p className="font-['Cormorant_Garamond'] text-2xl font-semibold text-white sm:text-3xl">
              Your journey starts with the right ride.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Tell us where you want to go and what you need.
            </p>
          </div>

          <a
            href="/booking"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#111111] transition-colors duration-300 hover:bg-[#E6C65B] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#111111]"
          >
            Plan Your Journey
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
