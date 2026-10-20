
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Plane,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Users,
  CarFront,
  Route,
} from "lucide-react";
import { Link } from "react-router-dom";

import airportImage from "../../assets/maxicab-1.jpg";
import pointToPointImage from "../../assets/maxicab-2.jpg";
import corporateImage from "../../assets/maxicab-3.jpg";
import groupImage from "../../assets/maxicab-4.jpg";

const services = [
  {
    number: "01",
    title: "Airport Transfers",
    description:
      "Plan convenient transportation to or from Singapore Changi Airport for your arrival, departure or connecting travel arrangements.",
    icon: Plane,
    image: airportImage,
    tag: "Airport Travel",
  },
  {
    number: "02",
    title: "Point-to-Point Transfers",
    description:
      "Arrange transport between homes, hotels, business locations, attractions and other destinations around Singapore.",
    icon: MapPin,
    image: pointToPointImage,
    tag: "Everyday Travel",
  },
  {
    number: "03",
    title: "Corporate Travel",
    description:
      "Explore transport arrangements for business meetings, corporate visits, client pickups and professional travel requirements.",
    icon: BriefcaseBusiness,
    image: corporateImage,
    tag: "Business Travel",
  },
  {
    number: "04",
    title: "Hourly Bookings",
    description:
      "Enquire about transport arrangements for itineraries that involve multiple stops or require a vehicle for a planned period.",
    icon: Clock3,
    image: airportImage,
    tag: "Flexible Plans",
  },
  {
    number: "05",
    title: "Family & Group Travel",
    description:
      "Find suitable vehicle options for family outings, sightseeing, celebrations and group journeys based on passenger needs.",
    icon: Users,
    image: groupImage,
    tag: "Group Journeys",
  },
  {
    number: "06",
    title: "Private Transfers",
    description:
      "Make transport arrangements for personal trips, hotel transfers, special occasions and other individual travel needs.",
    icon: CarFront,
    image: pointToPointImage,
    tag: "Personal Travel",
  },
];

export default function Services2() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="our-services"
      className="relative overflow-hidden bg-[#0B0B0B] px-5 py-20 text-[#F8F4EE] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-[#D4AF37]/[0.05] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 25,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
          }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#D4AF37]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-sm">
              What We Offer
            </span>

            <span className="h-px w-10 bg-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Transport Services
            <span className="mt-2 block text-[#D4AF37]">
              For Every Journey
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            From airport transfers to family outings and business trips,
            explore transport options for different travel requirements.
            Choose a service to get started with your booking enquiry.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.number}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 30,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : (index % 3) * 0.1,
                }}
                className="group flex h-full flex-col overflow-hidden border border-white/10 bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden sm:h-60">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Service number */}
                  <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/40 font-serif text-sm text-white backdrop-blur-sm">
                    {service.number}
                  </span>

                  {/* Category */}
                  <span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F0D77A]">
                    {service.tag}
                  </span>

                  {/* Icon */}
                  <div className="absolute bottom-4 right-5 flex h-12 w-12 items-center justify-center border border-[#D4AF37]/60 bg-black/70 text-[#D4AF37] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#D4AF37] group-hover:text-black">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-serif text-xl leading-snug text-white sm:text-2xl">
                    {service.title}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-7 text-white/55">
                    {service.description}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <Link
                      to={`/booking?service=${encodeURIComponent(service.title)}`}
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition-colors hover:text-[#F0D77A]"
                    >
                      Enquire Now

                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom information strip */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
          }}
          className="mt-12 flex flex-col gap-6 border border-[#D4AF37]/25 bg-[#D4AF37]/[0.04] p-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37]">
              <Route size={23} strokeWidth={1.5} />
            </div>

            <div>
              <h3 className="font-serif text-xl sm:text-2xl">
                Have a Specific Journey in Mind?
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/55">
                Share your itinerary and travel requirements with us.
              </p>
            </div>
          </div>

          <Link
            to="/booking"
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#F0D77A]"
          >
            Plan Your Journey

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
