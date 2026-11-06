
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const phoneNumber = "6598669334";

  const message = encodeURIComponent(
    "Hello MaxiCabStar Prime! I would like to enquire about your cab service."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MaxiCabStar Prime on WhatsApp"
      className="
        fixed bottom-5 right-5 z-[9999]
        flex h-14 w-14 items-center justify-center
        rounded-full bg-[#25D366] text-white
        shadow-[0_4px_20px_rgba(37,211,102,0.35)]
        transition-all duration-300
        hover:scale-110 hover:bg-[#20BA5A]
        active:scale-95
        sm:bottom-7 sm:right-7 sm:h-16 sm:w-16
      "
    >
      <FaWhatsapp size={32} />

      {/* Notification dot */}
      <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-white bg-red-500" />
    </a>
  );
}
