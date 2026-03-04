import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function SeekTruth() {
  return (
    <section className="bg-black py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-tight">
          Seek Truth
        </h2>
        <blockquote className="text-lg sm:text-xl text-white/50 italic mb-10 leading-relaxed">
          &ldquo;We believe what you put in your body matters. No fillers, no
          shortcuts, no compromise. Every ingredient earns its place.&rdquo;
        </blockquote>
        <Link to="/seek-truth">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black">
            Our Story
          </Button>
        </Link>
      </div>
    </section>
  );
}
