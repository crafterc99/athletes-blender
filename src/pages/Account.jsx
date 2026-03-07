import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Account() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-dark py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            My Account
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Your Account
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 sm:p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brand-50 text-brand flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold mb-3 text-dark tracking-tight">
              Coming Soon
            </h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Account management is coming in Phase 2 with Shopify integration.
              For now, build your box and explore our menu!
            </p>
            <Link to="/build">
              <Button variant="primary" size="lg">Build Your Box</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
