import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Database, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const sections = [
  {
    title: "1. Introduction",
    content: `MaxiCabStar Prime ("we", "our", or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or use our transportation services in Singapore.`,
  },
  {
    title: "2. Information We Collect",
    content: `We may collect the following information when you use our website or make a booking:`,
    bullets: [
      "Full name",
      "Email address",
      "Phone number",
      "Pickup and drop-off locations",
      "Booking date and time",
      "Vehicle type and passenger information",
      "Special requests or additional booking details",
      "Information submitted through our contact forms",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information collected for the following purposes:`,
    bullets: [
      "To process and manage transportation bookings",
      "To contact you regarding your reservation",
      "To provide customer support",
      "To respond to enquiries and requests",
      "To improve our website and services",
      "To maintain website security and prevent misuse",
      "To comply with applicable legal obligations",
    ],
  },
  {
    title: "4. Booking Information",
    content: `When you submit a booking through our website, your information may be stored in our database and used to manage your reservation. We may contact you through phone, email, or WhatsApp regarding your booking.

Please ensure that the information you provide is accurate and up to date.`,
  },
  {
    title: "5. WhatsApp Communication",
    content: `Our website may provide WhatsApp links or booking communication through WhatsApp. If you contact us through WhatsApp, your communication will also be subject to WhatsApp's own Privacy Policy and terms of service.

We do not control how WhatsApp processes information on its platform.`,
  },
  {
    title: "6. Cookies and Website Analytics",
    content: `Our website may use cookies or similar technologies to improve functionality, understand website usage, and enhance user experience.

Cookies may help us understand how visitors interact with our website. You can manage or disable cookies through your browser settings. Disabling cookies may affect certain website functionality.

If analytics or advertising services are enabled, their providers may collect information according to their own privacy policies.`,
  },
  {
    title: "7. Sharing of Information",
    content: `We do not sell your personal information.

We may share relevant information with trusted service providers when necessary to operate our website, process bookings, communicate with customers, or comply with legal requirements.

Information may also be disclosed when required by applicable law or to protect our legal rights and the safety of our customers.`,
  },
  {
    title: "8. Data Security",
    content: `We take reasonable measures to protect personal information against unauthorized access, disclosure, alteration, or destruction.

However, no internet transmission or electronic storage system can be guaranteed to be completely secure.`,
  },
  {
    title: "9. Data Retention",
    content: `We retain personal information only for as long as necessary to fulfil booking, operational, legal, and business requirements.

When information is no longer required, we will take reasonable steps to delete or securely dispose of it, subject to applicable legal obligations.`,
  },
  {
    title: "10. Your Privacy Rights",
    content: `Depending on applicable laws, you may have the right to request access to, correction of, or deletion of your personal information.

You may contact us using the details below to submit a privacy-related request. We may need to verify your identity before processing your request.`,
  },
  {
    title: "11. Third-Party Websites",
    content: `Our website may contain links to third-party websites or services, including WhatsApp and other external platforms.

We are not responsible for the privacy practices or content of third-party websites. We encourage you to review their privacy policies before providing personal information.`,
  },
  {
    title: "12. Children's Privacy",
    content: `Our website and transportation services are not intended to collect personal information directly from children without appropriate authorization.

If you believe a child has provided personal information to us improperly, please contact us so that we can review the matter.`,
  },
  {
    title: "13. Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our services, business practices, or legal requirements.

Any updated policy will be published on this page with a revised date.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      {/* SEO */}
      <SEO
        title="Privacy Policy | MaxiCabStar Prime Singapore"
        description="Read the MaxiCabStar Prime Privacy Policy to understand how we collect, use, store, and protect personal information for Singapore maxicab bookings and enquiries."
        path="/privacy-policy"
      />

      <main className="min-h-screen bg-[#0B0B0B] text-[#F8F4EE]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#D4AF37]/20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-[#D4AF37]" />

                <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#D4AF37]">
                  Your Privacy Matters
                </span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Privacy{" "}
                <span className="text-[#D4AF37]">Policy</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                Your trust is important to us. Learn how MaxiCabStar Prime
                collects, uses, and protects your personal information.
              </p>

              <p className="mt-5 text-sm text-white/40">
                Last Updated: November 6, 2026
              </p>
            </motion.div>
          </div>
        </section>

        {/* Privacy highlights */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 py-12 sm:grid-cols-3 sm:px-8">
          {[
            {
              icon: Lock,
              title: "Data Protection",
              description: "We take reasonable measures to protect your data.",
            },
            {
              icon: Eye,
              title: "Transparency",
              description: "We explain how your information is used.",
            },
            {
              icon: Database,
              title: "Responsible Usage",
              description: "Your information is used for legitimate purposes.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <Icon className="mb-4 h-7 w-7 text-[#D4AF37]" />

                <h3 className="mb-2 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-white/50">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        {/* Policy content */}
        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
          <div className="space-y-10">
            {sections.map((section) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="border-b border-white/10 pb-8"
              >
                <h2 className="mb-4 text-xl font-semibold text-[#D4AF37] sm:text-2xl">
                  {section.title}
                </h2>

                <p className="whitespace-pre-line text-sm leading-8 text-white/65 sm:text-base">
                  {section.content}
                </p>

                {section.bullets && (
                  <ul className="mt-4 space-y-3">
                    {section.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-7 text-white/60 sm:text-base"
                      >
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-6 w-6 shrink-0 text-[#D4AF37]" />

              <div>
                <h2 className="mb-3 text-xl font-semibold">
                  Contact Us
                </h2>

                <p className="mb-5 text-sm leading-7 text-white/60">
                  If you have questions about this Privacy Policy or how
                  your personal information is handled, please contact us.
                </p>

                <p className="text-sm text-white/70">
                  <span className="text-[#D4AF37]">Email:</span>{" "}
                  <a
                    href="mailto:maxicabstarprime@gmail.com"
                    className="transition hover:text-[#D4AF37]"
                  >
                    maxicabstarprime@gmail.com
                  </a>
                </p>

                <p className="mt-2 text-sm text-white/70">
                  <span className="text-[#D4AF37]">Website:</span>{" "}
                  <a
                    href="https://maxicabstarprime.com"
                    className="transition hover:text-[#D4AF37]"
                  >
                    Maxicabstarprime.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Back to home */}
          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[#D4AF37] transition hover:text-white"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}