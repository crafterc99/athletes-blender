import { useState } from "react";
import { Link } from "react-router-dom";

const FOOTER_LINKS = {
  Shop: [
    { to: "/build", label: "Build Your Box" },
    { to: "/blender", label: "The Blender" },
    { to: "/teams", label: "Team Orders" },
  ],
  Learn: [
    { to: "/how-it-works", label: "How It Works" },
    { to: "/faq", label: "FAQ" },
    { to: "/seek-truth", label: "Our Story" },
  ],
  Account: [
    { to: "/account", label: "My Account" },
    { to: "/build", label: "Subscribe" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Newsletter signup coming in Phase 2!");
    setEmail("");
  };

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-extrabold tracking-tight text-white">
              Get the inside scoop
            </h3>
            <p className="text-sm text-white/50 mt-1">
              New flavors, flash sales, and exclusive drops. No spam.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 md:w-64 bg-white/10 border border-white/20 rounded-l-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
            />
            <button
              type="submit"
              className="bg-brand hover:bg-brand-dark text-white text-sm font-bold px-6 py-3 rounded-r-xl transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">AB</span>
              </div>
              <span className="text-base font-extrabold tracking-tight">
                The Athlete&apos;s Blender
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              Fully customizable smoothie packs built for performance, delivered to your door.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {["Instagram", "TikTok", "Twitter"].map((platform) => (
                <span
                  key={platform}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 cursor-pointer text-xs font-bold"
                  title={platform}
                >
                  {platform[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-white/60">
                {title}
              </h4>
              <div className="space-y-3">
                {links.map((l) => (
                  <Link
                    key={l.to + l.label}
                    to={l.to}
                    className="block text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-6 text-xs text-white/30">
            <span>100% Money Back Guarantee</span>
            <span>Free Shipping on Subscriptions</span>
            <span>Cancel Anytime</span>
          </div>
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} The Athlete&apos;s Blender. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
