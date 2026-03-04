import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Account() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl mb-6">
          Your Account
        </h1>
        <div className="bg-surface rounded-2xl p-8">
          <p className="text-text-muted text-sm mb-6">
            Account management is coming in Phase 2 with Shopify integration.
            For now, build your box and explore our menu!
          </p>
          <Link to="/build">
            <Button variant="cta">Build Your Box</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
