const STEPS = [
  {
    num: "01",
    title: "Build It Your Way",
    desc: "Pick your base, add-ins, sorbet, and supplements. Up to 3 recipes per box.",
  },
  {
    num: "02",
    title: "We Pack + Ship",
    desc: "Pre-portioned packs go out on your schedule. Fresh. No prep.",
  },
  {
    num: "03",
    title: "Blend + Go",
    desc: "Toss it in. Fuel your training, recovery, or morning.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-surface py-20 px-4">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.num} className="text-center">
              <div className="font-mono text-4xl text-green font-bold mb-4">
                {step.num}
              </div>
              <h3 className="font-display text-xl uppercase mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
