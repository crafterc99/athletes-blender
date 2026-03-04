import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Blender() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="bg-gray-50 rounded-2xl h-80 md:h-[28rem] flex items-center justify-center">
          <span className="text-base text-gray-300 font-medium">
            Blender Product Image
          </span>
        </div>
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            The Athlete&apos;s Blender
          </h1>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-bold tabular-nums">$49.99</span>
            <span className="text-sm font-bold text-green">
              Free with first subscription
            </span>
          </div>
          <p className="text-gray-500 leading-relaxed mb-6 text-sm">
            Designed for athletes who take nutrition seriously. Powerful
            motor crushes ice and frozen ingredients in seconds. Compact,
            portable, and built to last.
          </p>
          <ul className="space-y-2 text-sm text-gray-500 mb-8">
            <li>High-performance 600W motor</li>
            <li>BPA-free Tritan bottle</li>
            <li>USB-C rechargeable</li>
            <li>Dishwasher safe</li>
          </ul>
          <Link to="/build">
            <Button variant="green">Get Free with Subscription</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
