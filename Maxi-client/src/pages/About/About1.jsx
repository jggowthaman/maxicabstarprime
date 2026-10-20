
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import aboutHero from "../../assets/maxicab-1.jpg";

export default function About1() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 30,
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
    <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-[#0B0B0B] text-[#F8F4EE] sm:min-h-[80vh] lg:min-h-[85vh]">
      {/* Background image */}
      <motion.img
        src={aboutHero}
        alt="MaxiCabStar Prime passenger transport"
        initial={{
          scale: reduceMotion ? 1 : 1.08,
        }}
        animate={{ scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.2,
          ease: "easeOut",
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

      {/* Gold accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-[#D4AF37]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.15,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#D4AF37]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-sm">
              Discover MaxiCabStar Prime
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl leading-[1.12] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            About
            <span className="block text-[#D4AF37]">
              MaxiCabStar Prime
            </span>
          </motion.h1>

          {/* Introduction */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg"
          >
            Every journey has a destination, and every great experience
            begins with the right journey. Discover our approach to
            convenient transportation in Singapore, with travel options
            for airport transfers, family outings, business trips and
            group journeys.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-4 sm:mt-10 sm:flex-row"
          >
            <Link
              to="/booking"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#F0D77A]"
            >
              Book Your Journey
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <Link
              to="/services"
              className="inline-flex min-h-12 items-center justify-center border border-white/40 px-7 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Explore Our Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#who-we-are"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduceMotion ? 0 : 0.8,
            duration: reduceMotion ? 0 : 0.6,
          }}
          className="mt-14 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#D4AF37] sm:mt-16"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25">
            <ArrowDown size={16} />
          </span>
          Discover Our Story
        </motion.a>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 hidden h-24 w-24 border-b border-r border-[#D4AF37]/50 sm:block lg:h-32 lg:w-32" />
    </section>
  );
}
