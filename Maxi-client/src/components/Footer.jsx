
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Star,
  ChevronRight,
  ArrowUp,
} from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Our Vehicles", path: "/vehicles" },
  { name: "Contact Us", path: "/contact" },
];

const serviceLinks = [
  "Airport Transfers",
  "Private Chauffeur",
  "Corporate Transport",
  "Group Travel",
];

const PHONE_NUMBER = "+6598669334";
const WHATSAPP_NUMBER = "65XXXXXXXX";
const EMAIL = "info@yourdomain.com";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const animation = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : fadeUp;

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#0B0B0B] text-[#F8F4EE]">
      {/* Decorative gold accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-28 h-80 w-80 rounded-full bg-[#D4AF37]/[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#D4AF37]/[0.05] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Premium booking CTA */}
        <motion.div
          variants={animation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 border-b border-white/10 py-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16"
        >
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Star size={14} fill="currentColor" />
              <span>Travel in exceptional comfort</span>
            </div>

            <h2 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Every journey deserves
              <span className="mt-1 block text-[#D4AF37]">
                something extraordinary.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              Discover premium private transport with comfort,
              convenience, and dependable service across Singapore.
            </p>
          </div>

          <Link
            to="/booking"
            className="group inline-flex w-fit shrink-0 items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 text-sm font-semibold text-[#0B0B0B] transition duration-300 hover:bg-[#F0D778] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            Reserve Your Ride
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Footer columns */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 gap-x-8 gap-y-12 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 lg:py-16"
        >
          {/* Brand column */}
          <motion.div variants={animation} className="min-w-0">
            <Link
              to="/"
              aria-label="MaxiCabStar Prime home"
              className="inline-flex max-w-full items-center"
            >
              <span className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                <span className="text-[#F8F4EE]">MaxiCab</span>
                <span className="text-[#D4AF37]">Star</span>
                <span className="mt-1 flex items-center justify-center gap-3 text-[11px] font-medium tracking-[0.5em] text-[#D4AF37]">
                  <span className="h-px flex-1 bg-[#D4AF37]/70" />
                  PRIME
                  <span className="h-px flex-1 bg-[#D4AF37]/70" />
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
              Premium private transport for airport transfers,
              business travel, family outings, and comfortable
              group journeys across Singapore.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello MaxiCabStar Prime, I would like to enquire about a ride."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/40 px-4 py-3 text-sm text-[#D4AF37] transition duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
            >
              <MessageCircle size={17} />
              WhatsApp Enquiry
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={animation}>
            <h3 className="mb-6 font-serif text-2xl font-semibold text-[#F8F4EE]">
              Explore
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2.5 text-sm text-white/55 transition-colors duration-300 hover:text-[#D4AF37]"
                  >
                    <ChevronRight
                      size={15}
                      className="shrink-0 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={animation}>
            <h3 className="mb-6 font-serif text-2xl font-semibold text-[#F8F4EE]">
              Our Services
            </h3>

            <ul className="space-y-4">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="group inline-flex items-center gap-2.5 text-sm text-white/55 transition-colors duration-300 hover:text-[#D4AF37]"
                  >
                    <ChevronRight
                      size={15}
                      className="shrink-0 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1"
                    />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact information */}
          <motion.div variants={animation} className="min-w-0">
            <h3 className="mb-6 font-serif text-2xl font-semibold text-[#F8F4EE]">
              Get in Touch
            </h3>

            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.07]">
                  <MapPin size={17} className="text-[#D4AF37]" />
                </span>
                <div className="min-w-0 pt-1">
                  <p className="text-sm font-medium text-[#F8F4EE]">
                    169, Mackenize Road
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/50">
                    Singapore 228727
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.07]">
                  <Phone size={17} className="text-[#D4AF37]" />
                </span>
                <div className="min-w-0 pt-1">
                  <p className="text-sm font-medium text-[#F8F4EE]">
                    Call Us
                  </p>
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                    className="mt-1 block break-words text-sm leading-6 text-white/50 transition-colors hover:text-[#D4AF37]"
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.07]">
                  <Mail size={17} className="text-[#D4AF37]" />
                </span>
                <div className="min-w-0 pt-1">
                  <p className="text-sm font-medium text-[#F8F4EE]">
                    Email Us
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-1 block break-all text-sm leading-6 text-white/50 transition-colors hover:text-[#D4AF37]"
                  >
                    {EMAIL}
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        {/* Bottom bar */}
<div className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
  <p className="text-xs leading-6 text-white/40 sm:text-sm">
    © {currentYear} MaxiCabStar Prime. All rights reserved.
  </p>

  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/50 sm:text-sm">
    <Link
      to="/privacy-policy"
      className="transition-colors duration-300 hover:text-[#D4AF37]"
    >
      Privacy Policy
    </Link>

    <Link
      to="/terms-and-conditions"
      className="transition-colors duration-300 hover:text-[#D4AF37]"
    >
      Terms &amp; Conditions
    </Link>

    <span>
      Crafted with care by{" "}
      <span className="font-semibold text-[#D4AF37]">
        Webniqo
      </span>
    </span>

    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#D4AF37] transition duration-300 hover:bg-[#D4AF37] hover:text-[#0B0B0B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] sm:ml-0"
    >
      <ArrowUp size={17} />
    </button>
  </div>
</div>
      </div>
    </footer>
  );
}
