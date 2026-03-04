import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="min-h-[85vh] bg-black flex items-center justify-center text-center px-4">
      <div className="max-w-2xl">
        <h1 className="text-5xl sm:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
          Fuel Built<br />Around You.
        </h1>
        <p className="text-lg sm:text-xl text-white/50 mb-10 leading-relaxed">
          Fully customizable smoothie packs delivered to your door.
        </p>
        <Link to="/build">
          <Button variant="green" className="text-base px-10 py-4">
            Build Your Box
          </Button>
        </Link>
      </div>
    </section>
  );
}
