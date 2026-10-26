
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B0B]"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[100px]" />

      {/* Gold Border Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute h-[280px] w-[280px] rounded-full border border-[#D4AF37]/20 sm:h-[360px] sm:w-[360px]"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[280px] w-[280px] rounded-full border border-transparent border-t-[#D4AF37] sm:h-[360px] sm:w-[360px]"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h1 className="text-3xl font-semibold tracking-[0.18em] text-[#D4AF37] sm:text-5xl sm:tracking-[0.25em]">
            MAXICABSTAR
          </h1>

          <p className="mt-3 text-xs tracking-[0.55em] text-[#F8F4EE] sm:text-sm">
            PRIME
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 h-px bg-[#D4AF37]"
        />

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-6 text-[10px] uppercase tracking-[0.35em] text-[#F8F4EE]/70 sm:text-xs"
        >
          Preparing Your Journey
        </motion.p>

        {/* Loading Bar */}
        <div className="mt-5 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 bg-[#D4AF37]"
          />
        </div>

        {/* Singapore Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-[9px] tracking-[0.3em] text-white/40"
        >
          PREMIUM TRANSPORT · SINGAPORE
        </motion.p>
      </div>
    </motion.div>
  );
}