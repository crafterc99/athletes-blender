import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const PERKS = [
  "Custom smoothie packs for every athlete",
  "Bulk pricing with team discounts",
  "Dedicated account manager",
  "Flexible delivery schedules",
];

export default function Teams() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-dark py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            For Teams & Organizations
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-3 mb-6 tracking-tight">
            Fuel Your Team
          </h1>
          <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
            Bulk ordering for teams, gyms, and training facilities. Give your
            athletes the nutrition edge with custom smoothie packs built for
            performance.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 sm:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brand-50 text-brand flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-dark tracking-tight">
              Coming Soon
            </h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed max-w-md mx-auto">
              We&apos;re building team ordering features. Contact us to get early
              access for your organization.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left max-w-md mx-auto">
              {PERKS.map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-50 text-brand flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">{p}</span>
                </div>
              ))}
            </div>

            <Button variant="primary" size="lg" onClick={() => alert("Contact form coming in Phase 2!")}>
              Get Early Access
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
