import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function SeekTruth() {
  return (
    <section className="bg-deep-navy py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">
          Seek Truth
        </h2>
        <blockquote className="text-lg sm:text-xl text-white/70 italic mb-8 leading-relaxed">
          &ldquo;We believe what you put in your body matters. No fillers, no
          shortcuts, no compromise. Every ingredient earns its place.&rdquo;
        </blockquote>
        <Link to="/seek-truth">
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            Our Story
          </Button>
        </Link>
      </div>
    </section>
  );
}
