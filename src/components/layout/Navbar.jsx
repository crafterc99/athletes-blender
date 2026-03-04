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
    <nav className="sticky top-0 z-50 bg-white border-b border-[rgba(0,0,0,0.06)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
                "text-sm font-medium transition-colors duration-[125ms]",
                pathname === link.to
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
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
                pathname === link.to ? "text-black" : "text-gray-400"
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
