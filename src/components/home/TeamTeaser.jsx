import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function TeamTeaser() {
  return (
    <section className="py-20 px-4 bg-deep-navy">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
          Fuel Your Team
        </h2>
        <p className="text-white/60 text-sm mb-8">
          Bulk ordering and custom builds for teams, gyms, and training
          facilities. Give your athletes the nutrition edge.
        </p>
        <Link to="/teams">
          <Button variant="cta">Learn About Team Orders</Button>
        </Link>
      </div>
    </section>
  );
}
