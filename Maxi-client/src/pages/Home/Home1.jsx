
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

// Correct paths from src/pages/Home/Home1.jsx
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
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-start sm:flex sm:left-7 lg:left-12"
      aria-label="Singapore flag"
      role="img"
    >
      {/* Flagpole */}
      <div className="relative ml-1 h-28 w-[3px] rounded-full bg-gradient-to-b from-gray-200 to-gray-500 shadow-lg sm:h-36 lg:h-44">
        <div className="absolute -left-[3px] -top-1 h-2 w-2 rounded-full bg-[#D4AF37]" />
      </div>

      {/* Animated flag */}
      <motion.div
        className="relative -mt-28 ml-1 origin-left sm:-mt-36 lg:-mt-44"
        animate={
          {
            rotateY: [0, 12, -5, 10, 0],
            skewY: [0, -2, 1, -1, 0],
          }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "left center",
          perspective: 500,
        }}
      >
        <div className="relative h-12 w-[76px] overflow-hidden shadow-xl sm:h-14 sm:w-24 lg:h-16 lg:w-28">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-[#EF3340]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />

          <svg
            viewBox="0 0 44 25"
            className="absolute left-2 top-[3px] h-[20px] w-[34px] sm:left-3 sm:top-[4px] sm:h-6 sm:w-10"
            aria-hidden="true"
          >
            {/* Crescent */}
            <path
              d="M13 2 A9 9 0 1 0 13 19 A7 8 0 1 1 13 2"
              fill="white"
            />

            {/* Five stars */}
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

      <span className="mt-3 ml-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[10px]">
        Singapore
      </span>
    </motion.div>
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

  // Automatically change slides every 5.5 seconds
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

      {/* Contrast overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

      {/* Singapore flag */}
      <SingaporeFlag />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-24 sm:px-10 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -15 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl pl-0 sm:pl-24 lg:pl-28"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF37]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37] sm:text-xs sm:tracking-[0.32em]">
                {slide.eyebrow}
              </p>
            </div>

            <h1 className="font-serif text-5xl font-medium leading-[1.04] tracking-tight text-[#F8F4EE] sm:text-7xl lg:text-8xl">
              {slide.title}
              <span className="mt-2 block text-[#D4AF37]">
                {slide.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg">
              {slide.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4 sm:mt-10">
              <Link
                to="/booking"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-6 py-4 text-sm font-semibold text-[#0B0B0B] transition duration-300 hover:bg-[#F0D778] sm:px-8"
              >
                Book Your Ride
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-4 text-sm font-medium text-white transition duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] sm:px-8"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-8 right-5 z-20 flex items-center gap-3 sm:bottom-10 sm:right-10 lg:right-16">
        <span className="mr-2 text-xs tracking-[0.2em] text-white/75">
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-5 z-20 flex gap-2 sm:left-10 lg:left-16">
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-10 bg-[#D4AF37]"
                : "w-4 bg-white/50 hover:bg-white"
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
