import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const NAV_LINKS = [
  { to: "/build", label: "Build Your Box" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/blender", label: "Blender" },
  { to: "/teams", label: "Teams" },
  { to: "/seek-truth", label: "Seek Truth" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Promo bar */}
      <div className="bg-green text-white text-center py-2 text-xs font-semibold uppercase tracking-wider">
        25% Off First Subscription + Free Blender + Free Shipping
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-tight">
          The Athlete&apos;s Blender
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={clsx(
                "text-sm font-medium transition-colors duration-150",
                pathname === link.to
                  ? "text-green"
                  : "text-gray-500 hover:text-black"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 cursor-pointer"
        >
          {open ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 sm:px-6 pb-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={clsx(
                "block py-2.5 text-sm font-medium transition-colors",
                pathname === link.to ? "text-green" : "text-gray-500"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
