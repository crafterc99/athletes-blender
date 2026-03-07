import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TeamTeaser() {
  return (
    <section className="py-20 sm:py-28 px-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-[1320px] mx-auto"
      >
        <div className="relative bg-dark rounded-3xl overflow-hidden px-6 sm:px-12 py-14 sm:py-20 text-center">
          {/* Background accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/5 rounded-full blur-2xl" />

          <div className="relative max-w-xl mx-auto">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              For Teams & Organizations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
              Fuel Your Team
            </h2>
            <p className="text-white/40 mb-10 leading-relaxed">
              Bulk ordering and custom builds for teams, gyms, and training
              facilities. Give your athletes the nutrition edge they deserve.
            </p>
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 bg-white text-dark font-bold text-sm px-8 py-4 rounded-xl hover:bg-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 active:scale-[0.97]"
            >
              Learn About Team Orders
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
