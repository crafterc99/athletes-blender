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
    <section className="bg-gray-50 py-24 px-4">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <div key={step.num} className="text-center">
              <div className="text-4xl font-bold text-gray-200 mb-4">
                {step.num}
              </div>
              <h3 className="text-lg font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
