import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen gpk-wallpaper">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="GPK Vault"
            className="w-full max-w-[400px] mx-auto drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
          />

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#111] leading-tight tracking-tight">
            Track. Hunt.
            <br />
            <span className="text-[#7ED957]">Complete</span> Your Collection.
          </h1>

          <p className="text-base sm:text-lg text-[#555] max-w-md mx-auto leading-relaxed">
            Know what you own, find what you need, and finally make your
            collection feel organized.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap pt-2">
            <Link href="/signup">
              <button className="gpk-btn-primary text-sm sm:text-base flex items-center gap-2">
                Start Tracking
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </Link>
            <Link href="/login">
              <button className="gpk-btn-secondary text-sm sm:text-base">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="relative bg-[#111] py-6 border-y-4 border-[#7ED957]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <FeatureStrip icon="&#9745;" label="Track Your Collection" />
            <FeatureStrip icon="&#128269;" label="Find Missing Cards" />
            <FeatureStrip icon="&#128200;" label="See Set Progress" />
            <FeatureStrip icon="&#9889;" label="Trade & Connect" />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111] text-center mb-8">
            Everything a <span className="text-[#FF4FA3]">GPK Collector</span> Needs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FeatureCard
              image="/Check.png"
              title="Checklist Everything"
              description="Browse every Original Series set with full card artwork. Mark cards as Have, Want, or For Trade."
              accent="#7ED957"
            />
            <FeatureCard
              image="/Trade.png"
              title="Find Trade Partners"
              description="Our matching engine automatically connects you with collectors who have what you need."
              accent="#4CC9F0"
            />
            <FeatureCard
              image="/Badge.png"
              title="Earn Badges"
              description="Complete sets, hit milestones, and earn unique digital collector badges."
              accent="#FFE600"
            />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative bg-[#111] py-8 border-y-4 border-[#FF4FA3]">
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-[#7ED957]">1,240+</p>
            <p className="text-xs text-[#999] uppercase tracking-wider font-bold">Cards Tracked</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-[#FFE600]">15</p>
            <p className="text-xs text-[#999] uppercase tracking-wider font-bold">Original Sets</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-[#4CC9F0]">Free</p>
            <p className="text-xs text-[#999] uppercase tracking-wider font-bold">Forever</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-12 sm:py-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="gpk-panel p-8 text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111]">
              Ready to complete
              <br />
              your collection?
            </h2>
            <Link href="/signup">
              <button className="gpk-btn-primary text-base">
                Start Tracking Free
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#111] py-6 border-t-4 border-[#7ED957]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <img src="/logo.png" alt="GPK Vault" className="h-8 mx-auto mb-3 opacity-60" />
          <p className="text-xs text-[#666]">
            GPK Vault is a fan project. Garbage Pail Kids is a trademark of The Topps Company, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureStrip({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-bold text-[#7ED957] uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

function FeatureCard({
  image,
  title,
  description,
  accent,
}: {
  image: string;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <div className="gpk-card-tile">
      <div
        className="h-[160px] flex items-end justify-center p-4"
        style={{ background: `linear-gradient(to bottom, ${accent}22, ${accent}44)` }}
      >
        <img
          src={image}
          alt={title}
          className="h-[130px] object-contain drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
        />
      </div>
      <div className="p-4">
        <h3 className="font-black text-base text-[#111] mb-1">{title}</h3>
        <p className="text-xs text-[#555] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
