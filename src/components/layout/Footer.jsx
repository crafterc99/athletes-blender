import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-white">
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-display text-lg uppercase tracking-wide mb-4">
              The Athlete&apos;s Blender
            </h4>
            <p className="text-sm text-white/60">
              Fully customizable smoothie packs delivered to your door.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-wide mb-4 text-white/80">
              Links
            </h4>
            <div className="space-y-2">
              {[
                { to: "/build", label: "Build Your Box" },
                { to: "/how-it-works", label: "How It Works" },
                { to: "/blender", label: "Blender" },
                { to: "/teams", label: "Teams" },
                { to: "/faq", label: "FAQ" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="block text-sm text-white/60 hover:text-green transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-wide mb-4 text-white/80">
              Company
            </h4>
            <div className="space-y-2">
              <Link
                to="/seek-truth"
                className="block text-sm text-white/60 hover:text-green transition-colors"
              >
                Seek Truth
              </Link>
              <Link
                to="/account"
                className="block text-sm text-white/60 hover:text-green transition-colors"
              >
                Account
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/40 text-center">
          &copy; {new Date().getFullYear()} The Athlete&apos;s Blender. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
