
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import slide1 from "../../assets/maxicab-1.jpg";
import slide2 from "../../assets/maxicab-2.jpg";
import slide3 from "../../assets/maxicab-3.jpg";
import slide4 from "../../assets/maxicab-4.jpg";

const slides = [
  {
    image: slide1,
    eyebrow: "PREMIUM PRIVATE TRANSPORT",
    title: "Travel Beyond",
    highlight: "Ordinary.",
    description:
      "Experience comfortable, reliable and refined journeys across Singapore with MaxiCabStar Prime.",
  },
  {
    image: slide2,
    eyebrow: "COMFORT IN EVERY JOURNEY",
    title: "Your Journey,",
    highlight: "Our Priority.",
    description:
      "From airport transfers to business travel, enjoy a journey designed around your comfort.",
  },
  {
    image: slide3,
    eyebrow: "RELIABLE RIDES ACROSS SINGAPORE",
    title: "Arrive in",
    highlight: "Exceptional Style.",
    description:
      "Enjoy convenient private transport for individuals, families and groups.",
  },
  {
    image: slide4,
    eyebrow: "YOUR DESTINATION, OUR COMMITMENT",
    title: "Every Mile,",
    highlight: "Made Better.",
    description:
      "Discover a more relaxed way to travel with service focused on convenience and peace of mind.",
  },
];

function SingaporeFlag() {
  const stars = [
    [23, 4],
    [28, 8],
    [26, 14],
    [20, 14],
    [18, 8],
  ];

  return (
    <>
      {/* Desktop flag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 sm:block lg:left-10"
        role="img"
        aria-label="Singapore national flag"
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="relative overflow-hidden rounded-sm shadow-[0_8px_25px_rgba(0,0,0,0.4)] ring-1 ring-white/20"
            animate={{
              rotateY: [0, 7, -3, 5, 0],
              skewY: [0, -1, 0.5, -0.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "left center" }}
          >
            <div className="relative h-14 w-24 sm:h-[68px] sm:w-28 lg:h-20 lg:w-36">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-[#EF3340]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />

              <svg
                viewBox="0 0 44 25"
                className="absolute left-2 top-1 h-6 w-10 sm:left-3 sm:top-1.5 sm:h-7 sm:w-12 lg:left-4 lg:top-2 lg:h-8 lg:w-14"
                aria-hidden="true"
              >
                <path
                  d="M13 2 A9 9 0 1 0 13 19 A7 8 0 1 1 13 2"
                  fill="white"
                />

                {stars.map(([cx, cy], index) => (
                  <path
                    key={index}
                    d={`M${cx} ${cy - 1.8} L${cx + 0.55} ${cy - 0.55} L${cx + 1.9} ${cy - 0.55} L${cx + 0.8} ${cy + 0.3} L${cx + 1.2} ${cy + 1.7} L${cx} ${cy + 0.9} L${cx - 1.2} ${cy + 1.7} L${cx - 0.8} ${cy + 0.3} L${cx - 1.9} ${cy - 0.55} L${cx - 0.55} ${cy - 0.55} Z`}
                    fill="white"
                  />
                ))}
              </svg>
            </div>
          </motion.div>

          <div className="my-3 h-px w-12 bg-[#D4AF37] sm:w-14" />

          <span className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-xs lg:text-sm">
            Singapore
          </span>

          <span className="mt-1 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-white/75 sm:text-[10px]">
            City of Excellence
          </span>
        </div>
      </motion.div>

      {/* Compact flag for mobile */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="absolute right-4 top-5 z-20 sm:hidden"
        role="img"
        aria-label="Singapore national flag"
      >
        <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-black/50 px-3 py-2 shadow-lg backdrop-blur-md">
          <div className="relative h-5 w-8 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/20">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-[#EF3340]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />

            <svg
              viewBox="0 0 44 25"
              className="absolute left-0.5 top-0 h-3 w-4"
              aria-hidden="true"
            >
              <path
                d="M13 2 A9 9 0 1 0 13 19 A7 8 0 1 1 13 2"
                fill="white"
              />
              {stars.map(([cx, cy], index) => (
                <path
                  key={index}
                  d={`M${cx} ${cy - 1.8} L${cx + 0.55} ${cy - 0.55} L${cx + 1.9} ${cy - 0.55} L${cx + 0.8} ${cy + 0.3} L${cx + 1.2} ${cy + 1.7} L${cx} ${cy + 0.9} L${cx - 1.2} ${cy + 1.7} L${cx - 0.8} ${cy + 0.3} L${cx - 1.9} ${cy - 0.55} L${cx - 0.55} ${cy - 0.55} Z`}
                  fill="white"
                />
              ))}
            </svg>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4AF37]">
            Singapore
          </span>
        </div>
      </motion.div>
    </>
  );
}

export default function Home1() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const slide = slides[activeIndex];

  return (
    <section className="relative flex h-[calc(100svh-74px)] min-h-[620px] max-h-[950px] items-center overflow-hidden bg-[#0B0B0B] sm:min-h-[700px]">
      {/* Background carousel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.image}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.1 }}
        >
          <motion.img
            src={slide.image}
            alt={`MaxiCabStar Prime - ${slide.eyebrow.toLowerCase()}`}
            className="h-full w-full object-cover object-center"
            initial={reduceMotion ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlays for readable text */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

      {/* Singapore flag and label */}
      <SingaporeFlag />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-24 sm:px-10 sm:pb-16 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -15 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl pl-0 sm:pl-28 lg:pl-36"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 shrink-0 bg-[#D4AF37]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] sm:text-xs sm:tracking-[0.28em]">
                {slide.eyebrow}
              </p>
            </div>

            <h1 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-[#F8F4EE] min-[380px]:text-5xl sm:text-7xl lg:text-8xl">
              {slide.title}
              <span className="mt-2 block text-[#D4AF37]">
                {slide.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
              <Link
                to="/booking"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3.5 text-xs font-bold text-[#0B0B0B] transition duration-300 hover:bg-[#F0D778] min-[380px]:px-6 sm:gap-3 sm:px-8 sm:py-4 sm:text-sm"
              >
                Book Your Ride
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-3.5 text-xs font-medium text-white transition duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] min-[380px]:px-6 sm:px-8 sm:py-4 sm:text-sm"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-7 right-4 z-20 flex items-center gap-2 sm:bottom-10 sm:right-10 sm:gap-3 lg:right-16">
        <span className="mr-1 text-[11px] tracking-[0.15em] text-white/75 sm:mr-2 sm:text-xs sm:tracking-[0.2em]">
          <span className="text-[#D4AF37]">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(slides.length).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black sm:h-11 sm:w-11"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black sm:h-11 sm:w-11"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-9 left-5 z-20 flex gap-2 sm:bottom-12 sm:left-10 lg:left-16">
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-[#D4AF37] sm:w-10"
                : "w-3 bg-white/50 hover:bg-white sm:w-4"
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/55 lg:flex">
        <span className="h-8 w-px bg-[#D4AF37]/70" />
        Discover More
      </div>
    </section>
  );
}