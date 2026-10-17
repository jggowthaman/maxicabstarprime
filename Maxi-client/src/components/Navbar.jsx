
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

import logo from "../assets/logo-light.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Our Vehicles", path: "/vehicles" },
  { name: "Contact", path: "/contact" },
];

const PHONE_NUMBER = "+65XXXXXXXX";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    window.addEventListener("resize", closeMenuOnResize);

    return () => {
      window.removeEventListener("resize", closeMenuOnResize);
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `group relative whitespace-nowrap py-2 text-sm font-medium transition-colors duration-300 ${
      scrolled
        ? "text-[#171717] hover:text-[#B58A20]"
        : "text-white hover:text-[#D4AF37]"
    }`;

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : -16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.25,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.055,
      },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -10,
      transition: { duration: reduceMotion ? 0 : 0.18 },
    },
  };

  const mobileLinkVariants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : -12,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.25 },
    },
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.98)"
            : "rgba(0,0,0,0)",
          boxShadow: scrolled
            ? "0 6px 30px rgba(0,0,0,0.08)"
            : "0 0px 0px rgba(0,0,0,0)",
          borderColor: scrolled
            ? "rgba(212,175,55,0.15)"
            : "rgba(255,255,255,0)",
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: "easeInOut",
        }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <nav
          aria-label="Main navigation"
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${
            scrolled ? "h-[74px]" : "h-[88px]"
          }`}
        >
          {/* SINGLE LOGO */}
          <Link
            to="/"
            aria-label="MaxiCabStar Prime home"
            onClick={() => setMenuOpen(false)}
            className="relative z-[60] flex shrink-0 items-center"
          >
            <motion.img
              src={logo}
              alt="MaxiCabStar Prime"
              initial={false}
              animate={{
                scale: scrolled ? 0.96 : 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
              }}
              className="h-auto w-[150px] object-contain sm:w-[185px] lg:w-[210px]"
            />
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: -10 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : index * 0.07,
                }}
              >
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={linkClass}
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[2px] bg-[#D4AF37]"
                        initial={false}
                        animate={{
                          width: isActive ? "100%" : "0%",
                        }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.25,
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}

            {/* PHONE */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className={`group flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                scrolled
                  ? "text-[#171717] hover:text-[#B58A20]"
                  : "text-white hover:text-[#D4AF37]"
              }`}
            >
              <Phone
                size={16}
                className="text-[#D4AF37] transition-transform duration-300 group-hover:rotate-12"
              />
              Call Us
            </a>

            {/* BOOK NOW */}
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition duration-300 hover:-translate-y-0.5 hover:bg-[#F0D778] hover:shadow-lg hover:shadow-[#D4AF37]/15"
            >
              Book Now
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            type="button"
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className={`relative z-[60] flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
              scrolled || menuOpen
                ? "text-[#171717] hover:bg-black/5"
                : "text-white hover:bg-white/10"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{
                  opacity: 0,
                  rotate: reduceMotion ? 0 : -45,
                }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{
                  opacity: 0,
                  rotate: reduceMotion ? 0 : 45,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.16,
                }}
                className="flex"
              >
                {menuOpen ? <X size={25} /> : <Menu size={25} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden"
            />

            <motion.div
              id="mobile-navigation"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-x-0 top-0 z-40 max-h-[100dvh] overflow-y-auto rounded-b-3xl border-b border-[#D4AF37]/20 bg-[#F8F4EE] px-6 pb-8 pt-28 text-[#171717] shadow-2xl lg:hidden"
            >
              <div className="mx-auto max-w-md">
                <motion.p
                  variants={mobileLinkVariants}
                  className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#9C7620]"
                >
                  MaxiCabStar Prime
                </motion.p>

                <div>
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.path}
                      variants={mobileLinkVariants}
                    >
                      <NavLink
                        to={link.path}
                        end={link.path === "/"}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between border-b border-black/10 py-4 text-lg font-medium transition-colors duration-300 ${
                            isActive
                              ? "text-[#9C7620]"
                              : "text-[#171717] hover:text-[#9C7620]"
                          }`
                        }
                      >
                        {link.name}
                        <ChevronRight
                          size={19}
                          className="text-[#B58A20] transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  variants={mobileLinkVariants}
                  href={`tel:${PHONE_NUMBER}`}
                  className="mt-6 flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 py-3.5 text-sm font-semibold transition-colors hover:bg-[#D4AF37]/10"
                >
                  <Phone size={17} className="text-[#9C7620]" />
                  Call Us
                </motion.a>

                <motion.div variants={mobileLinkVariants}>
                  <Link
                    to="/booking"
                    onClick={() => setMenuOpen(false)}
                    className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] py-4 text-sm font-bold text-[#0B0B0B] transition duration-300 hover:bg-[#F0D778]"
                  >
                    Book Your Ride
                    <ArrowUpRight size={18} />
                  </Link>
                </motion.div>

                <motion.p
                  variants={mobileLinkVariants}
                  className="mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-black/45"
                >
                  Premium Private Transport
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
