import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
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
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl mb-8 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-card-border bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-surface/50 transition-colors"
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDownIcon
                  className={clsx(
                    "w-5 h-5 text-text-muted transition-transform duration-150 shrink-0",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-sm text-text-muted">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
