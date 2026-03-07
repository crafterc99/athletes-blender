import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SeekTruth() {
  return (
    <section className="relative py-20 sm:py-28 px-4 bg-dark overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/5 rounded-full blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <span className="text-brand text-xs font-bold uppercase tracking-widest">
          Our Philosophy
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-8 tracking-tight">
          Seek Truth
        </h2>
        <blockquote className="text-lg sm:text-xl text-white/50 italic mb-10 leading-relaxed max-w-2xl mx-auto">
          &ldquo;We believe what you put in your body matters. No fillers, no
          shortcuts, no compromise. Every ingredient earns its place.&rdquo;
        </blockquote>
        <Link
          to="/seek-truth"
          className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-white hover:text-dark transition-all duration-200 active:scale-[0.97]"
        >
          Our Story
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
