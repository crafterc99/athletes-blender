import { Link } from "react-router-dom";
import Button from "../ui/Button";

const BENEFITS = [
  "Save 25% on your first order",
  "Save 15% on every renewal",
  "Free blender with first order",
  "Edit your box anytime",
  "Skip or pause anytime",
  "Cancel anytime",
];

export default function SubscriptionValue() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
            Subscribe & Save
          </h2>
          <ul className="space-y-4 mb-10">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-green flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <Link to="/build">
              <Button variant="green">Build Your Box</Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline">See How It Works</Button>
            </Link>
          </div>
        </div>
        <div className="bg-green-light rounded-2xl h-64 md:h-80 flex items-center justify-center">
          <span className="text-base text-green font-medium">
            Subscription Visual
          </span>
        </div>
      </div>
    </section>
  );
}
