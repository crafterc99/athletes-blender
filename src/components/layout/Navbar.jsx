import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../../store/authStore";
import clsx from "clsx";

const NAV_LINKS = [
  { to: "/build", label: "Build Your Box" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/blender", label: "Blender" },
  { to: "/teams", label: "Teams" },
  { to: "/seek-truth", label: "Seek Truth" },
  { to: "/faq", label: "FAQ" },
];

function UserDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initial = user.firstName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "A";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-brand-dark transition-colors"
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
          <Link
            to="/account"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/account/orders"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 font-medium"
          >
            Orders
          </Link>
          <Link
            to="/account/subscription"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 font-medium"
          >
            Subscription
          </Link>
          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium cursor-pointer"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-brand text-white text-center py-2 px-4">
        <p className="text-xs sm:text-sm font-semibold tracking-wide">
          Save 25% on your first subscription order + FREE blender
          <Link to="/build" className="underline underline-offset-2 ml-2 hover:text-white/80 transition-colors">
            Build Your Box &rarr;
          </Link>
        </p>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">AB</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-dark group-hover:text-brand transition-colors duration-200">
              The Athlete&apos;s Blender
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.to
                    ? "text-brand bg-brand-50"
                    : "text-gray-500 hover:text-dark hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <Link
                to="/account/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-dark hover:bg-gray-50 transition-all duration-200"
              >
                <UserCircleIcon className="w-5 h-5" />
                Log In
              </Link>
            )}
            <Link
              to="/build"
              className="bg-brand text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-brand-dark shadow-[0_2px_8px_rgba(22,163,74,0.25)] hover:shadow-[0_4px_12px_rgba(22,163,74,0.35)] transition-all duration-200 active:scale-[0.97]"
            >
              Build Your Box
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {open ? (
              <XMarkIcon className="w-6 h-6 text-dark" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-dark" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={clsx(
            "lg:hidden overflow-hidden transition-all duration-300 ease-out",
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 sm:px-6 pb-5 pt-2 space-y-1 border-t border-gray-100">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={clsx(
                  "block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.to
                    ? "text-brand bg-brand-50"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200"
                >
                  My Account
                </Link>
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/account/login"
                onClick={() => setOpen(false)}
                className="block px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200"
              >
                Log In
              </Link>
            )}
            <div className="pt-2">
              <Link
                to="/build"
                onClick={() => setOpen(false)}
                className="block w-full bg-brand text-white text-center text-sm font-bold px-5 py-3 rounded-xl hover:bg-brand-dark transition-all duration-200"
              >
                Build Your Box
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
