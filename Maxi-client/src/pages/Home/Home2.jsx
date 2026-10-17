
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  BriefcaseBusiness,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CarFront,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import vehicle1 from "../../assets/13 seater.jpg";
import vehicle2 from "../../assets/49 seater.jpg";
import vehicle3 from "../../assets/4 seater.jpg";
import vehicle5 from "../../assets/23 seater.jpg";
import vehicle4 from "../../assets/6 seater 2.jpeg";
import vehicle6 from "../../assets/6 seater.jpg";

const vehicles = [
  {
    id: 1,
    name: "13 Seater VIP Combo",
    image: vehicle1,
    seats: 13,
    passengers: 13,
    luggage: "6 bags",
    description:
      "A spacious choice for families, airport transfers, and group travel.",
  },
  {
    id: 2,
    name: "49 Seater Bus",
    image: vehicle2,
    seats: 49,
    passengers: 49,
    luggage: "Group luggage",
    description:
      "Designed for larger groups, corporate events, tours, and group transfers.",
  },
  {
    id: 3,
    name: "4 Seater",
    image: vehicle3,
    seats: 4,
    passengers: 4,
    luggage: "3 bags",
    description:
      "A practical option for smaller groups, private trips, and everyday transfers.",
  },
  {
    id: 4,
    name: "Luxury MPV",
    image: vehicle4,
    seats: 6,
    passengers: 6,
    luggage: "4 bags",
    description:
      "A comfortable option for premium private travel and family journeys.",
  },
    {
    id: 5,
    name: "Luxury MPV",
    image: vehicle5,
    seats: 23,
    passengers: 23,
    luggage: "10 bags",
    description:
      "A comfortable option for premium private travel and family journeys.",
  },
    {
    id: 6,
    name: "Luxury MPV 6 Seater",
    image: vehicle6,
    seats: 6,
    passengers: 6,
    luggage: "15 bags",
    description:
      "A comfortable option for premium private travel and family journeys.",
  },
];

export default function Home2() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const visibleVehicles = [-1, 0, 1].map((offset) => {
    const index =
      (activeIndex + offset + vehicles.length) % vehicles.length;
    return { vehicle: vehicles[index], offset };
  });

  const changeSlide = (direction) => {
    setActiveIndex(
      (current) =>
        (current + direction + vehicles.length) % vehicles.length
    );
  };

  return (
    <section
      id="choose-ride"
      className="overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#B58A4A]">
            Our Fleet
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#111111] sm:text-5xl lg:text-6xl">
            Choose Your Ride
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#777777] sm:text-base">
            We have the right vehicle for every journey.
          </p>
        </div>

        {/* Vehicle carousel */}
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-5">
            {visibleVehicles.map(({ vehicle, offset }) => {
              const isActive = offset === 0;

              return (
                <motion.article
                  key={vehicle.id}
                  layout
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 15 }
                  }
                  animate={{
                    opacity: isActive ? 1 : 0.88,
                    y: 0,
                    scale: isActive ? 1 : 0.94,
                  }}
                  transition={{ duration: 0.35 }}
                  className={`flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-shadow duration-300 ${
                    isActive
                      ? "relative z-10 border-[#EAEAEA] shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
                      : "border-[#F0F0F0] shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
                  }`}
                >
                  {/* Vehicle photo */}
                  <div
                    className={`relative overflow-hidden bg-[#F2F2F2] ${
                      isActive ? "h-56 sm:h-64" : "h-48 sm:h-52"
                    }`}
                  >
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Details */}
                  <div
                    className={`flex flex-1 flex-col text-center ${
                      isActive ? "p-6 sm:p-7" : "p-5"
                    }`}
                  >
                    <h3
                      className={`font-['Cormorant_Garamond'] font-bold text-[#171717] ${
                        isActive ? "text-2xl sm:text-3xl" : "text-xl"
                      }`}
                    >
                      {vehicle.name}
                    </h3>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#777777]">
                      <span className="inline-flex items-center gap-1.5">
                        <CarFront size={16} />
                        {vehicle.seats} Seater
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Users size={16} />
                        {vehicle.passengers} Passengers
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-medium text-green-600">
                      <span className="mr-1">↻</span>
                      Available on enquiry
                    </p>

                    <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#777777]">
                      <BriefcaseBusiness size={14} />
                      Luggage: {vehicle.luggage}
                    </div>

                    <div
                      className={`mt-5 grid grid-cols-2 gap-2 ${
                        isActive ? "sm:gap-3" : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="min-h-11 rounded-full border border-[#DDDDDD] px-3 text-sm font-semibold text-[#4B4B4B] transition hover:border-[#B58A4A] hover:text-[#A77B25]"
                      >
                        Show More
                      </button>

                     
<Link
  to={`/booking?vehicle=${encodeURIComponent(vehicle.name)}`}
  className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-bold text-[#111111] transition hover:bg-[#E8BC48] ${
    isActive ? "bg-[#D4AF37]" : "bg-[#FFE09A]"
  }`}
>
  Book Now
  <ArrowUpRight size={16} />
</Link>

                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Carousel controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              aria-label="Previous vehicles"
              onClick={() => changeSlide(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] text-[#333333] transition hover:border-[#D4AF37] hover:bg-[#FFF8E8] md:hidden"
            >
              <ChevronLeft size={19} />
            </button>

            <div className="flex items-center justify-center gap-2">
              {vehicles.map((vehicle, index) => (
                <button
                  key={vehicle.id}
                  type="button"
                  aria-label={`Show vehicle ${index + 1}`}
                  aria-pressed={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-8 bg-[#D4AF37]"
                      : "w-2.5 bg-[#D5D5D5] hover:bg-[#B58A4A]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next vehicles"
              onClick={() => changeSlide(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] text-[#333333] transition hover:border-[#D4AF37] hover:bg-[#FFF8E8] md:hidden"
            >
              <ChevronRight size={19} />
            </button>
          </div>

          {/* Desktop arrows */}
          <button
            type="button"
            aria-label="Previous vehicles"
            onClick={() => changeSlide(-1)}
            className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white shadow-md transition hover:border-[#D4AF37] md:flex lg:-left-12"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            aria-label="Next vehicles"
            onClick={() => changeSlide(1)}
            className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white shadow-md transition hover:border-[#D4AF37] md:flex lg:-right-12"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Show More modal */}
      {selectedVehicle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedVehicle(null)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vehicle-modal-title"
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close vehicle details"
              onClick={() => setSelectedVehicle(null)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow"
            >
              <X size={19} />
            </button>

            <img
              src={selectedVehicle.image}
              alt={selectedVehicle.name}
              className="h-52 w-full object-cover"
            />

            <div className="p-6">
              <h3
                id="vehicle-modal-title"
                className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#111111]"
              >
                {selectedVehicle.name}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#666666]">
                {selectedVehicle.description}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#F8F4EE] p-4">
                  <Users size={19} className="mb-2 text-[#B58A4A]" />
                  <p className="text-xs text-[#777777]">Passengers</p>
                  <p className="mt-1 font-semibold text-[#171717]">
                    {selectedVehicle.passengers}
                  </p>
                </div>

                <div className="rounded-xl bg-[#F8F4EE] p-4">
                  <BriefcaseBusiness
                    size={19}
                    className="mb-2 text-[#B58A4A]"
                  />
                  <p className="text-xs text-[#777777]">Luggage</p>
                  <p className="mt-1 font-semibold text-[#171717]">
                    {selectedVehicle.luggage}
                  </p>
                </div>
              </div>

              <Link
                to={`/booking?vehicle=${encodeURIComponent(
                  selectedVehicle.name
                )}`}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#111111] transition hover:bg-[#E8BC48]"
              >
                Book This Vehicle
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
