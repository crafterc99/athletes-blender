import Button from "../components/ui/Button";

export default function Teams() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl mb-6">
          Fuel Your Team
        </h1>
        <p className="text-text-muted mb-8 max-w-lg mx-auto">
          Bulk ordering for teams, gyms, and training facilities. Give your
          athletes the nutrition edge with custom smoothie packs built for
          performance.
        </p>
        <div className="bg-surface rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="font-display text-2xl mb-4">Coming Soon</h2>
          <p className="text-sm text-text-muted mb-6">
            We&apos;re building team ordering features. Contact us to get early
            access for your organization.
          </p>
          <Button variant="cta" onClick={() => alert("Contact form coming in Phase 2!")}>
            Get Early Access
          </Button>
        </div>
      </div>
    </main>
  );
}
