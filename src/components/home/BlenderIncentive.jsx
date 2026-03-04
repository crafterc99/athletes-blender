import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function BlenderIncentive() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-surface rounded-2xl h-64 md:h-80 flex items-center justify-center">
          <span className="font-display text-xl text-text-muted uppercase">
            Blender Image
          </span>
        </div>
        <div>
          <h2 className="font-display text-3xl sm:text-4xl mb-4">
            The Athlete&apos;s Blender
          </h2>
          <p className="text-green-dark font-display text-lg uppercase mb-4">
            Free with your first subscription
          </p>
          <p className="text-text-muted text-sm mb-6 leading-relaxed">
            A premium personal blender designed for athletes. Powerful enough to
            crush ice, compact enough for your gym bag. Yours free when you
            subscribe.
          </p>
          <div className="flex gap-3">
            <Link to="/build">
              <Button variant="cta">Get Yours Free</Button>
            </Link>
            <Link to="/blender">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
