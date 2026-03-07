import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const BENEFITS = [
  { text: "Save 25% on your first order", highlight: true },
  { text: "Save 15% on every renewal", highlight: false },
  { text: "Free blender with first order", highlight: true },
  { text: "Edit your box anytime", highlight: false },
  { text: "Skip or pause anytime", highlight: false },
  { text: "Cancel anytime — no strings", highlight: false },
];

export default function SubscriptionValue() {
  return (
    <section className="py-20 sm:py-28 px-4 bg-brand-50">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Subscribe & Save
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-8 tracking-tight text-dark">
              More gains,
              <br />less spend.
            </h2>

            <ul className="space-y-4 mb-10">
              {BENEFITS.map((b) => (
                <li key={b.text} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className={b.highlight ? "text-sm font-bold text-dark" : "text-sm text-gray-600"}>
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link to="/build">
                <Button variant="primary" size="lg">Build Your Box</Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </motion.div>

          {/* Right — pricing comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { name: "Starter", count: 10, oneTime: "$34.99", sub: "$29.99", per: "$3.00/ea" },
              { name: "Pro", count: 20, oneTime: "$59.99", sub: "$49.99", per: "$2.50/ea", popular: true },
              { name: "Elite", count: 30, oneTime: "$84.99", sub: "$69.99", per: "$2.33/ea", best: true },
            ].map((box) => (
              <div
                key={box.name}
                className={`relative rounded-2xl p-5 sm:p-6 border-2 transition-all duration-200 ${
                  box.popular
                    ? "border-brand bg-white shadow-[0_4px_24px_rgba(22,163,74,0.12)]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {box.popular && (
                  <span className="absolute -top-3 left-5 bg-brand text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                )}
                {box.best && (
                  <span className="absolute -top-3 left-5 bg-dark text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Best Value
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-dark">{box.name}</h3>
                    <p className="text-sm text-gray-500">{box.count} smoothies</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 line-through">{box.oneTime}</div>
                    <div className="text-2xl font-extrabold text-brand">{box.sub}</div>
                    <div className="text-xs text-gray-500">{box.per}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
