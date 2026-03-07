import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Build It Your Way",
    desc: "Pick your base, add-ins, sorbet, and supplements. Create up to 3 unique recipes per box.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "We Pack & Ship",
    desc: "Pre-portioned packs go out on your schedule. Fresh ingredients, zero prep needed.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Blend & Go",
    desc: "Toss it in your blender. Fuel your training, recovery, or morning routine in seconds.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Simple as 1-2-3
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 tracking-tight text-dark">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative text-center group"
            >
              {/* Icon circle */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brand-50 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>

              {/* Step number */}
              <span className="text-xs font-bold text-brand uppercase tracking-widest mb-2 block">
                Step {step.num}
              </span>

              <h3 className="text-xl font-extrabold mb-3 text-dark tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                {step.desc}
              </p>

              {/* Connector line (desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-8 left-[60%] w-[calc(100%-20%)] h-px bg-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
