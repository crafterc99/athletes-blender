import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const STATS = [
  { value: "25%", label: "Off First Order" },
  { value: "3", label: "Custom Recipes" },
  { value: "Free", label: "Blender Included" },
];

export default function Hero() {
  return (
    <section className="relative bg-dark overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-brand/20" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-brand/5 rounded-full blur-2xl" />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-brand/20 text-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Custom Smoothie Packs
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight"
          >
            Fuel Built
            <br />
            <span className="text-brand">Around You.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/50 mb-10 leading-relaxed max-w-xl"
          >
            Fully customizable smoothie packs, built with real ingredients
            and delivered to your door. No fillers. No shortcuts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/build"
              className="bg-brand text-white font-bold text-base px-8 py-4 rounded-xl shadow-[0_4px_16px_rgba(22,163,74,0.4)] hover:bg-brand-dark hover:shadow-[0_6px_24px_rgba(22,163,74,0.5)] transition-all duration-200 active:scale-[0.97]"
            >
              Build Your Box
            </Link>
            <Link
              to="/how-it-works"
              className="border-2 border-white/20 text-white font-bold text-base px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              See How It Works
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-brand mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/40 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
