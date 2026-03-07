import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const FEATURES = [
  "High-performance 600W motor",
  "BPA-free Tritan bottle",
  "USB-C rechargeable",
  "Dishwasher safe",
  "Portable design — fits in your gym bag",
  "One-touch operation",
];

export default function Blender() {
  return (
    <main className="min-h-screen">
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-brand-50 to-gray-100 rounded-3xl h-80 lg:h-[32rem] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-brand/10 flex items-center justify-center">
                  <svg className="w-12 h-12 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  Product Image Coming Soon
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Premium Equipment
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4 tracking-tight text-dark">
              The Athlete&apos;s Blender
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-dark tabular-nums">$49.99</span>
              <span className="text-sm font-bold text-brand bg-brand-50 px-3 py-1 rounded-lg">
                FREE with first subscription
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-8">
              Designed for athletes who take nutrition seriously. Powerful
              motor crushes ice and frozen ingredients in seconds. Compact,
              portable, and built to last.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-50 text-brand flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">{f}</span>
                </div>
              ))}
            </div>

            <Link to="/build">
              <Button variant="primary" size="lg">
                Get Free with Subscription
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
