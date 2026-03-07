import { motion } from "framer-motion";

export default function SeekTruth() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-dark py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Our Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-3 mb-6 tracking-tight">
            Seek Truth
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-8 text-gray-600 leading-relaxed">
            <p className="text-lg sm:text-xl font-medium text-dark leading-relaxed">
              We believe what you put in your body matters. No fillers, no
              shortcuts, no compromise. Every ingredient earns its place.
            </p>
            <p>
              The Athlete&apos;s Blender was born from a simple frustration: why
              is it so hard to find clean, customizable nutrition that actually
              tastes good? We got tired of reading ingredient lists full of
              things we couldn&apos;t pronounce, so we decided to build
              something better.
            </p>
            <p>
              Our mission is transparency. We show you exactly what goes into
              every pack. You choose your bases, your add-ins, your
              supplements. Nothing hidden, nothing added without your
              knowledge.
            </p>

            <div className="bg-brand-50 rounded-2xl p-6 sm:p-8 border border-brand/10">
              <p className="text-lg font-bold text-dark italic">
                &ldquo;This is nutrition built around truth. Built around you.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
