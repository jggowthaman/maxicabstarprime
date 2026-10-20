
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  MapPinned,
  ArrowUpRight,
  CarFront,
} from "lucide-react";

export default function Contact3() {
  // DEMO LOCATION: Singapore.
  // Replace this with the client's confirmed business address.
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Singapore&t=&z=11&ie=UTF8&iwloc=&output=embed";

  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Singapore";

  return (
    <section
      id="location-service-area"
      className="relative overflow-hidden bg-[#0B0B0B] px-4 py-16 text-[#F8F4EE] sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#D4AF37]/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37] sm:text-sm">
            Find Us
          </span>

          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Our Location &
            <span className="block text-[#D4AF37]">
              Service Area
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            Planning a journey in Singapore? Explore the map and contact us
            about your pickup location, destination, and transport needs.
          </p>
        </motion.div>

        {/* Map and information */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          {/* Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                  <MapPinned size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    Explore Singapore
                  </h3>
                  <p className="mt-1 text-xs text-white/45">
                    Demonstration map location
                  </p>
                </div>
              </div>

              <MapPin
                size={20}
                className="shrink-0 text-[#D4AF37]"
              />
            </div>

            <div className="relative h-[320px] w-full sm:h-[400px] lg:h-[470px]">
              <iframe
                title="Demonstration Google Map of Singapore"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs leading-6 text-white/45">
                Demo map only. The confirmed business location has not yet
                been added.
              </p>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/40 px-4 py-3 text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
              >
                <Navigation size={16} />
                Open Google Maps
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>

          {/* Service area details */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Where We Travel
            </span>

            <h3 className="mt-4 font-serif text-2xl leading-snug sm:text-3xl">
              Your Journey Starts in Singapore
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/55">
              Tell us where you need to be picked up and where you are
              travelling. Our team can help you enquire about the right
              vehicle for your journey.
            </p>

            {/* Service information */}
            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.07] text-[#D4AF37]">
                  <MapPin size={20} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Location
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-white/50">
                    Singapore
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.07] text-[#D4AF37]">
                  <CarFront size={21} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Vehicle Options
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-white/50">
                    4-seater cabs, 6-seater vehicles, 13-seater maxi cabs,
                    23-seater minibuses, and 45-seater coaches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.07] text-[#D4AF37]">
                  <Navigation size={20} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Pickup & Destination
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-white/50">
                    Share your pickup point, destination, date, and passenger
                    requirements when making an enquiry.
                  </p>
                </div>
              </div>
            </div>

            {/* Booking CTA */}
            <div className="mt-auto pt-8">
              <a
                href="/booking"
                className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#D4AF37] px-5 py-4 text-sm font-bold text-black transition duration-300 hover:bg-[#F0D778]"
              >
                Enquire About Your Journey
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <p className="mt-4 text-center text-xs leading-6 text-white/35">
                Please confirm the route and vehicle availability with the
                business before travelling.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
