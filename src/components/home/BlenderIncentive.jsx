import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const FEATURES = [
  "High-performance 600W motor",
  "BPA-free Tritan bottle",
  "USB-C rechargeable",
  "Dishwasher safe",
];

export default function BlenderIncentive() {
  return (
    <section className="py-20 sm:py-28 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-brand-50 to-gray-100 rounded-3xl h-72 md:h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-brand/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  Product Image Coming Soon
                </span>
              </div>
            </div>
            {/* Price badge */}
            <div className="absolute -bottom-4 -right-2 sm:right-4 bg-brand text-white rounded-2xl px-5 py-3 shadow-[0_4px_16px_rgba(22,163,74,0.3)]">
              <div className="text-xs font-bold uppercase tracking-wide opacity-80">Retail</div>
              <div className="text-lg font-extrabold line-through opacity-60">$49.99</div>
              <div className="text-2xl font-extrabold">FREE</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Free With Subscription
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 tracking-tight text-dark">
              The Athlete&apos;s
              <br />Blender
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
              A premium personal blender designed for athletes. Powerful enough
              to crush ice, compact enough for your gym bag. Yours free when you
              subscribe.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-50 text-brand flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/build">
                <Button variant="primary" size="lg">Get Yours Free</Button>
              </Link>
              <Link to="/blender">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
