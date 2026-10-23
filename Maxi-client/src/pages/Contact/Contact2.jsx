
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ArrowUpRight,
  MapPinned,
} from "lucide-react";

const BUSINESS_EMAIL = "info@yourdomain.com";
const BUSINESS_PHONE = "+65 9866 9334";


const MAP_EMBED_URL =
  "https://maps.google.com/maps?width=600&height=400&hl=en&q=1%C2%B018%2727.2%22N%20103%C2%B050%2748.3%22E&t=&z=14&ie=UTF8&iwloc=B&output=embed";

const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=1%C2%B018%2727.2%22N%20103%C2%B050%2748.3%22E";

export default function Contact2() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const contactDetails = [
    {
      icon: Phone,
      title: "Call Us",
      value: BUSINESS_PHONE,
      description: "Speak with our team about your journey.",
      href: "tel:+65XXXXXXXX",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: BUSINESS_EMAIL,
      description: "Send us your travel enquiries.",
      href: `mailto:${BUSINESS_EMAIL}`,
    },
    {
      icon: MapPin,
      title: "Service Area",
      value: "Singapore",
      description: "Transport enquiries across Singapore.",
      href: null,
    },
    {
      icon: Clock,
      title: "Plan Your Journey",
      value: "Booking Enquiries",
      description: "Tell us about your trip requirements.",
      href: "/booking",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("");

    const { name, email, phone, subject, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("Please complete your name, email, and message.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    const emailSubject = encodeURIComponent(
      subject.trim() || "Website Enquiry"
    );

    const emailBody = encodeURIComponent(
      `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || "Not provided"}\n\n` +
        `Message:\n${message}`
    );

    window.location.href =
      `mailto:${BUSINESS_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
  };

  const inputClasses =
    "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-[#F8F4EE] outline-none transition duration-300 placeholder:text-white/35 focus:border-[#D4AF37]/70 focus:bg-white/[0.06]";

  return (
    <section
      id="contact-details"
      className="relative overflow-hidden bg-[#0B0B0B] px-4 py-16 text-[#F8F4EE] sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#D4AF37]/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37] sm:text-sm">
            Get In Touch
          </span>

          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            We'd Love to Hear
            <span className="block text-[#D4AF37]">From You</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            Have a question about our maxi cab services or planning your next
            journey? Contact our team and share your travel requirements.
          </p>
        </motion.div>

        {/* Contact information and enquiry form */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8 lg:p-9"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Contact Information
            </span>

            <h3 className="mt-4 font-serif text-2xl sm:text-3xl">
              Let's Talk About Your Trip
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/55">
              Whether you need an airport pickup, private transfer, or
              group transportation, share your requirements with us.
            </p>

            <div className="mt-8 space-y-5">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                const content = (
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.08] text-[#D4AF37] transition duration-300 group-hover:bg-[#D4AF37] group-hover:text-black">
                      <Icon size={21} strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 break-words text-sm font-medium text-[#D4AF37]">
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs leading-6 text-white/45 sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    {item.href && (
                      <ArrowUpRight
                        size={17}
                        className="mt-1 shrink-0 text-white/30 transition group-hover:text-[#D4AF37]"
                      />
                    )}
                  </div>
                );

                return (
                  <div
                    key={item.title}
                    className="border-b border-white/[0.07] pb-5 last:border-0 last:pb-0"
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group">{content}</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* WhatsApp */}
            <div className="mt-8 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] p-5">
              <div className="flex items-start gap-3">
                <MessageCircle
                  size={23}
                  className="mt-0.5 shrink-0 text-[#D4AF37]"
                />

                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Prefer WhatsApp?
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-white/55 sm:text-sm">
                    Contact us through WhatsApp to discuss your travel
                    requirements.
                  </p>

                  {/* Replace with the actual WhatsApp number */}
                  <a
                    href="https://wa.me/65XXXXXXXX"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition hover:text-white"
                  >
                    Chat With Us
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8 lg:p-9"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Send An Enquiry
            </span>

            <h3 className="mt-4 font-serif text-2xl sm:text-3xl">
              How Can We Help You?
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/55">
              Complete the form below and tell us what you need.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm text-white/75"
                  >
                    Full Name <span className="text-[#D4AF37]">*</span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm text-white/75"
                  >
                    Email Address <span className="text-[#D4AF37]">*</span>
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm text-white/75"
                  >
                    Phone Number
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+65 ..."
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm text-white/75"
                  >
                    Subject
                  </label>

                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm text-white/75"
                >
                  Your Message <span className="text-[#D4AF37]">*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your travel requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[140px] resize-y`}
                  required
                />
              </div>

              {status && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300"
                >
                  {status}
                </p>
              )}

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#D4AF37] px-6 py-4 text-sm font-bold text-black transition duration-300 hover:bg-[#F0D778] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] sm:w-auto"
              >
                Send Enquiry
                <Send
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <p className="text-xs leading-6 text-white/35">
                Required fields are marked with *. Submitting opens the
                visitor's default email application; this form does not
                directly send or store enquiries on a server.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Location & Service Area */}
        <motion.div
          id="location-service-area"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] sm:mt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Location information */}
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                <MapPinned size={17} />
                Location & Service Area
              </span>

              <h3 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
                Serving You Across
                <span className="block text-[#D4AF37]">Singapore</span>
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
                Planning an airport transfer, a city journey, or group travel?
                Get in touch with MaxiCabStar Prime to discuss your pickup,
                destination, and transportation needs.
              </p>

              <div className="mt-7 flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                  <MapPin size={21} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Service Coverage
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-white/50">
                    Singapore — contact us to discuss your specific route.
                  </p>
                </div>
              </div>

              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-fit items-center justify-center gap-3 rounded-lg border border-[#D4AF37]/50 px-5 py-3 text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
              >
                Explore Map
                <ArrowUpRight size={17} />
              </a>

              <p className="mt-4 text-xs leading-5 text-white/35">
                Demo map: Singapore. Update the map link to the actual
                business location if a fixed office or pickup point exists.
              </p>
            </div>

            {/* Embedded Google Map */}
            <div className="relative min-h-[300px] overflow-hidden bg-[#171717] sm:min-h-[380px] lg:min-h-[450px]">
              <iframe
                title="Demo Google Map showing Singapore"
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  position: "absolute",
                  inset: 0,
                  minHeight: "300px",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
