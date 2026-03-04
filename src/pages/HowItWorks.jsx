import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function HowItWorks() {
  return (
    <main className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl mb-6">
            How It Works
          </h1>
          <p className="text-text-muted mb-12 max-w-lg mx-auto">
            Building your custom smoothie box is simple. Choose your size,
            create your recipes, and we handle the rest.
          </p>

          <div className="space-y-12 text-left">
            {[
              {
                step: "1",
                title: "Choose Your Box Size",
                desc: "Pick from 10, 20, or 30 smoothies per delivery. Bigger boxes = bigger savings.",
              },
              {
                step: "2",
                title: "Build Your Recipes",
                desc: "Select your base, add-ins, sorbet, and supplements. Create up to 3 unique recipes per box.",
              },
              {
                step: "3",
                title: "Set Quantities",
                desc: "Decide how many of each recipe you want in your box. Mix and match to fill it up.",
              },
              {
                step: "4",
                title: "Choose Your Plan",
                desc: "Subscribe for recurring deliveries and save up to 25%, or order one-time at full price.",
              },
              {
                step: "5",
                title: "We Ship It Fresh",
                desc: "Pre-portioned packs arrive on your schedule. Just blend and go.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="font-mono text-3xl text-green font-bold shrink-0 w-10">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display text-xl uppercase mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/build">
              <Button variant="cta" className="text-base px-8 py-4">
                Build Your Box
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
