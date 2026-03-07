import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const FAQS = [
  {
    q: "How does the subscription work?",
    a: "Choose your box size and recipes, then select a delivery frequency (weekly, every 2 weeks, or monthly). You'll save 25% on your first order and 15% on every renewal. Skip, pause, or cancel anytime.",
  },
  {
    q: "What comes in each smoothie pack?",
    a: "Each pack contains your pre-portioned ingredients: bases, add-ins, sorbet, and any supplements you selected. Just add to your blender with water or your preferred liquid and blend.",
  },
  {
    q: "Can I change my recipes after subscribing?",
    a: "Yes! You can edit your box, swap recipes, or change quantities before each shipment. Log into your account to make changes.",
  },
  {
    q: "How do supplements work?",
    a: "Supplements are optional add-ons at $0.50 per ingredient per recipe. Choose from categories like Energy Booster, Gut Health, Immunity Support, and more.",
  },
  {
    q: "Is the blender really free?",
    a: "Yes! Your first subscription order includes a free Athlete's Blender (retail value $49.99). It ships with your first box.",
  },
  {
    q: "What are the box sizes?",
    a: "Starter (10 smoothies), Pro (20 smoothies), and Elite (30 smoothies). Bigger boxes offer better per-smoothie pricing.",
  },
  {
    q: "Can I create multiple recipes?",
    a: "Up to 3 unique recipes per box. Distribute your smoothie count however you like across your recipes.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-dark py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Support
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-3 mb-6 tracking-tight">
            Frequently Asked
            <br />Questions
          </h1>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-2xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={clsx(
                "rounded-2xl border-2 bg-white overflow-hidden transition-all duration-200",
                openIndex === i ? "border-brand/20 shadow-[0_4px_20px_rgba(22,163,74,0.06)]" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
              >
                <span className="font-bold text-sm sm:text-base text-dark pr-4">{faq.q}</span>
                <div className={clsx(
                  "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200",
                  openIndex === i ? "bg-brand text-white rotate-180" : "bg-gray-100 text-gray-400"
                )}>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
