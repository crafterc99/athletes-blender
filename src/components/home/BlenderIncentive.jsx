import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function BlenderIncentive() {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="bg-gray-100 rounded-2xl h-64 md:h-80 flex items-center justify-center">
          <span className="text-base text-gray-300 font-medium">
            Blender Image
          </span>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            The Athlete&apos;s Blender
          </h2>
          <p className="text-green text-sm font-bold mb-4">
            Free with your first subscription
          </p>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            A premium personal blender designed for athletes. Powerful enough to
            crush ice, compact enough for your gym bag. Yours free when you
            subscribe.
          </p>
          <div className="flex gap-3">
            <Link to="/build">
              <Button variant="green">Get Yours Free</Button>
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
