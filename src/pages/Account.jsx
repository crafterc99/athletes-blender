import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Account() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
          Your Account
        </h1>
        <div className="bg-gray-50 rounded-[14px] p-8">
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Account management is coming in Phase 2 with Shopify integration.
            For now, build your box and explore our menu!
          </p>
          <Link to="/build">
            <Button variant="primary">Build Your Box</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
