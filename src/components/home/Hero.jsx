import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="min-h-[90vh] bg-deep-navy flex items-center justify-center text-center px-4">
      <div className="max-w-2xl">
        <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-white leading-tight mb-6">
          Fuel Built<br />Around You.
        </h1>
        <p className="text-lg sm:text-xl text-white/70 mb-8">
          Fully customizable smoothie packs delivered to your door.
        </p>
        <Link to="/build">
          <Button variant="cta" className="text-base px-8 py-4">
            Build Your Box
          </Button>
        </Link>
      </div>
    </section>
  );
}
