import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function TeamTeaser() {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
          Fuel Your Team
        </h2>
        <p className="text-white/40 text-sm mb-10 leading-relaxed">
          Bulk ordering and custom builds for teams, gyms, and training
          facilities. Give your athletes the nutrition edge.
        </p>
        <Link to="/teams">
          <Button variant="green">
            Learn About Team Orders
          </Button>
        </Link>
      </div>
    </section>
  );
}
