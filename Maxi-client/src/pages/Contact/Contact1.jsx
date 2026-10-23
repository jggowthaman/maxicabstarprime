
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import contactHero from "../../assets/maxicab-7.jpg";

export default function Contact1() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#0B0B0B] text-[#F8F4EE] sm:min-h-[78vh]">
      {/* Background image */}
      <motion.img
        src={contactHero}
        alt="MaxiCabStar Prime transport services"
        initial={{ scale: reduceMotion ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.2,
          ease: "easeOut",
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {/* Gold accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-[#D4AF37]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
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
          <motion.div
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduceMotion ? 0 : 0.6 },
              },
            }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#D4AF37]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-sm">
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduceMotion ? 0 : 0.7 },
              },
            }}
            className="font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl"
          >
            Let&apos;s Plan Your
            <span className="mt-2 block text-[#D4AF37]">
              Next Journey
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduceMotion ? 0 : 0.6 },
              },
            }}
            className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:mt-8 sm:text-base sm:leading-8"
          >
            Have a question or need help choosing a vehicle? Contact
            MaxiCabStar Prime to discuss your transport requirements,
            travel plans, and booking enquiries in Singapore.
          </motion.p>

          {/* Contact highlights */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduceMotion ? 0 : 0.6 },
              },
            }}
            className="mt-8 flex flex-col gap-4 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-6"
          >
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#D4AF37]" />
              <span>Phone Enquiries</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#D4AF37]" />
              <span>Email Enquiries</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#D4AF37]" />
              <span>Singapore</span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduceMotion ? 0 : 0.6 },
              },
            }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contact-details"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#F0D77A]"
            >
              Contact Our Team
              <ArrowDown
                size={18}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>

            <Link
              to="/booking"
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/40 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Make a Booking Enquiry
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}