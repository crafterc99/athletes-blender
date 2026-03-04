import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <h4 className="text-base font-bold mb-4">
              The Athlete&apos;s Blender
            </h4>
            <p className="text-sm text-white/50 leading-relaxed">
              Fully customizable smoothie packs delivered to your door.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4 text-white/60">
              Links
            </h4>
            <div className="space-y-2.5">
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
                  className="block text-sm text-white/50 hover:text-white transition-colors duration-[125ms]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4 text-white/60">
              Company
            </h4>
            <div className="space-y-2.5">
              <Link
                to="/seek-truth"
                className="block text-sm text-white/50 hover:text-white transition-colors duration-[125ms]"
              >
                Seek Truth
              </Link>
              <Link
                to="/account"
                className="block text-sm text-white/50 hover:text-white transition-colors duration-[125ms]"
              >
                Account
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-xs text-white/30 text-center">
          &copy; {new Date().getFullYear()} The Athlete&apos;s Blender. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
