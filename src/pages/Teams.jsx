import Button from "../components/ui/Button";

export default function Teams() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
          Fuel Your Team
        </h1>
        <p className="text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
          Bulk ordering for teams, gyms, and training facilities. Give your
          athletes the nutrition edge with custom smoothie packs built for
          performance.
        </p>
        <div className="bg-gray-50 rounded-[14px] p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            We&apos;re building team ordering features. Contact us to get early
            access for your organization.
          </p>
          <Button variant="primary" onClick={() => alert("Contact form coming in Phase 2!")}>
            Get Early Access
          </Button>
        </div>
      </div>
    </main>
  );
}
