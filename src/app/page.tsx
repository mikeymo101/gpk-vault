import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 gpk-wallpaper">
      {/* The Card */}
      <div className="w-full max-w-md rounded-3xl border-[7px] border-pink-400/70 bg-gradient-to-b from-amber-50/95 to-amber-100/95 shadow-2xl overflow-hidden backdrop-blur-sm">

        {/* Pink inner border effect */}
        <div className="m-1 rounded-2xl overflow-hidden border border-pink-300/40">

          {/* Green GPK Banner */}
          <div className="bg-gradient-to-b from-green-600 via-green-500 to-green-600 px-6 pt-6 pb-5 text-center relative">
            <h1 className="text-5xl font-black italic text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              GPK Vault
            </h1>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-green-100/70 mt-1">
              Garbage Pail Kids Collection Tracker
            </p>
          </div>

          {/* Card body */}
          <div className="px-5 py-5 space-y-4 bg-gradient-to-b from-amber-50/80 to-amber-100/60">

            {/* Tagline */}
            <div className="text-center">
              <h2 className="text-base font-black text-amber-950" style={{ fontFamily: "Georgia, serif" }}>
                Collector&apos;s Portal
              </h2>
              <p className="text-xs text-amber-800/70 mt-1 leading-relaxed">
                Track your collection. Find trades. Complete your sets.
                <br />
                The ultimate tool for GPK collectors.
              </p>
            </div>

            {/* Feature badges row */}
            <div className="flex justify-center gap-2.5">
              <FeatureBadge label="1,240+" sublabel="Cards" />
              <FeatureBadge label="15" sublabel="OS Sets" />
              <FeatureBadge label="Trade" sublabel="Matching" />
              <FeatureBadge label="Free" sublabel="Forever" />
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 justify-center">
              <Link href="/signup">
                <button className="px-5 py-2 rounded-lg bg-gradient-to-b from-green-500 to-green-700 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:from-green-400 hover:to-green-600 transition-all active:translate-y-px border border-green-800/40">
                  Start Collecting
                </button>
              </Link>
              <Link href="/login">
                <button className="px-5 py-2 rounded-lg bg-gradient-to-b from-amber-200 to-amber-300 text-amber-900 font-bold text-xs uppercase tracking-wider shadow-lg hover:from-amber-100 hover:to-amber-200 transition-all active:translate-y-px border border-amber-400/60">
                  Sign In
                </button>
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 px-4">
              <div className="h-px flex-1 bg-pink-300/30" />
              <div className="w-1 h-1 rounded-full bg-pink-300/40" />
              <div className="h-px flex-1 bg-pink-300/30" />
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-3 gap-2">
              <FeatureCard
                title="Checklist"
                description="Browse every Original Series with full card artwork."
              />
              <FeatureCard
                title="Find Trade Partners"
                description="Our matching engine finds you trades with one click."
              />
              <FeatureCard
                title="Earn Badges"
                description="Complete sets, hit milestones, and collect badges."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-green-700/90 px-4 py-2 text-center">
            <p className="text-[8px] text-green-200/50">
              GPK Vault is a fan project. Garbage Pail Kids is a trademark of The Topps Company, Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureBadge({
  label,
  sublabel,
}: {
  label: string;
  sublabel: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-full bg-gradient-to-b from-stone-300/50 to-stone-400/50 border-[2.5px] border-stone-400/40 flex items-center justify-center shadow-inner">
        <div className="text-center leading-none">
          <p className="text-[10px] font-black text-stone-700">{label}</p>
          <p className="text-[7px] font-semibold text-stone-500 mt-0.5">{sublabel}</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-gradient-to-b from-pink-50/80 to-white/60 border border-pink-200/40 p-2.5 text-center shadow-sm">
      <h3 className="font-bold text-[10px] text-amber-950 leading-tight">{title}</h3>
      <p className="text-[8px] text-amber-800/50 mt-1 leading-snug">{description}</p>
    </div>
  );
}
