import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const STEPS = [
  {
    step: "1",
    title: "Choose Your Box Size",
    desc: "Pick from 10, 20, or 30 smoothies per delivery. Bigger boxes = bigger savings.",
  },
  {
    step: "2",
    title: "Build Your Recipes",
    desc: "Select your base, add-ins, sorbet, and supplements. Create up to 3 unique recipes per box.",
  },
  {
    step: "3",
    title: "Set Quantities",
    desc: "Decide how many of each recipe you want in your box. Mix and match to fill it up.",
  },
  {
    step: "4",
    title: "Choose Your Plan",
    desc: "Subscribe for recurring deliveries and save up to 25%, or order one-time at full price.",
  },
  {
    step: "5",
    title: "We Ship It Fresh",
    desc: "Pre-portioned packs arrive on your schedule. Just blend and go.",
  },
];

export default function HowItWorks() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-dark py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Getting Started
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-3 mb-6 tracking-tight">
            How It Works
          </h1>
          <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
            Building your custom smoothie box is simple. Choose your size,
            create your recipes, and we handle the rest.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex gap-5 sm:gap-8 items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center text-lg font-extrabold shrink-0 shadow-[0_2px_8px_rgba(22,163,74,0.25)]">
                {item.step}
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-extrabold mb-1 text-dark tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/build">
            <Button variant="primary" size="lg">
              Build Your Box
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
