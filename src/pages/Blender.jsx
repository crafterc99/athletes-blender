import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Blender() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-surface rounded-2xl h-80 md:h-[28rem] flex items-center justify-center">
          <span className="font-display text-xl text-text-muted uppercase">
            Blender Product Image
          </span>
        </div>
        <div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4">
            The Athlete&apos;s Blender
          </h1>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-mono text-2xl">$49.99</span>
            <span className="text-green-dark font-display uppercase text-sm">
              Free with first subscription
            </span>
          </div>
          <p className="text-text-muted leading-relaxed mb-6">
            Designed for athletes who take nutrition seriously. Powerful
            motor crushes ice and frozen ingredients in seconds. Compact,
            portable, and built to last. Take it to the gym, the office, or
            anywhere your training takes you.
          </p>
          <ul className="space-y-2 text-sm mb-8">
            <li>High-performance 600W motor</li>
            <li>BPA-free Tritan bottle</li>
            <li>USB-C rechargeable</li>
            <li>Dishwasher safe</li>
          </ul>
          <div className="flex gap-3">
            <Link to="/build">
              <Button variant="cta">Get Free with Subscription</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
