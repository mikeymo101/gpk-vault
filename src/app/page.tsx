import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 gpk-wallpaper">
      {/* The Card */}
      <div className="w-full max-w-lg rounded-2xl border-[6px] border-pink-300/80 bg-gradient-to-b from-amber-50 via-amber-50 to-amber-100 shadow-2xl overflow-hidden dark:from-amber-950/50 dark:via-amber-950/40 dark:to-amber-900/50 dark:border-pink-900/60">
        {/* Top banner */}
        <div className="bg-gradient-to-b from-green-700 via-green-600 to-green-700 px-6 pt-5 pb-4 text-center relative">
          {/* Decorative corner dots */}
          <div className="absolute top-2 left-3 w-2 h-2 rounded-full bg-yellow-400/30" />
          <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-yellow-400/30" />

          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-white drop-shadow-lg">
            GPK Vault
          </h1>
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-green-200/80 mt-1">
            Garbage Pail Kids Collection Tracker
          </p>
        </div>

        {/* Card body */}
        <div className="px-5 sm:px-6 py-5 space-y-5">
          {/* Tagline */}
          <div className="text-center">
            <h2 className="text-lg font-black text-amber-950 dark:text-amber-100 tracking-tight">
              Collector&apos;s Portal
            </h2>
            <p className="text-sm text-amber-800/70 dark:text-amber-200/70 mt-1 leading-relaxed">
              Track your collection. Find trades. Complete your sets.
              <br />
              The ultimate tool for GPK collectors.
            </p>
          </div>

          {/* Feature badges */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <FeatureBadge icon="&#9776;" label="1,240+" sublabel="Cards" />
            <FeatureBadge icon="&#9733;" label="15" sublabel="OS Sets" />
            <FeatureBadge icon="&#8644;" label="Trade" sublabel="Matching" />
            <FeatureBadge icon="&#9829;" label="Free" sublabel="Forever" />
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 justify-center">
            <Link href="/signup">
              <button className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-green-500 to-green-700 text-white font-black text-sm uppercase tracking-wide shadow-md hover:from-green-400 hover:to-green-600 transition-all active:translate-y-px border-2 border-green-800/30">
                Start Collecting
              </button>
            </Link>
            <Link href="/login">
              <button className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-amber-100 to-amber-200 text-amber-900 font-bold text-sm uppercase tracking-wide shadow-md hover:from-amber-50 hover:to-amber-150 transition-all active:translate-y-px border-2 border-amber-400/50 dark:from-amber-800 dark:to-amber-900 dark:text-amber-100 dark:border-amber-700/50">
                Sign In
              </button>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
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

        {/* Bottom bar */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 px-4 py-2 text-center">
          <p className="text-[9px] text-green-200/60">
            GPK Vault is a fan project. Garbage Pail Kids is a trademark of The
            Topps Company, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureBadge({
  icon,
  label,
  sublabel,
}: {
  icon: string;
  label: string;
  sublabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-slate-400/20 to-slate-500/30 border-2 border-slate-400/30 flex items-center justify-center shadow-inner dark:from-slate-600/30 dark:to-slate-700/40 dark:border-slate-600/40">
        <span className="text-lg sm:text-xl text-amber-800/70 dark:text-amber-200/70">
          {icon}
        </span>
      </div>
      <div className="text-center">
        <p className="text-xs font-black text-amber-900 dark:text-amber-100 leading-none">
          {label}
        </p>
        <p className="text-[9px] text-amber-700/60 dark:text-amber-300/60 leading-tight">
          {sublabel}
        </p>
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
    <div className="rounded-lg bg-gradient-to-b from-white/80 to-amber-50/80 border border-amber-300/30 p-3 text-center shadow-sm dark:from-amber-900/30 dark:to-amber-950/30 dark:border-amber-700/20">
      <h3 className="font-bold text-xs text-amber-950 dark:text-amber-100 leading-tight">
        {title}
      </h3>
      <p className="text-[10px] text-amber-800/60 dark:text-amber-200/60 mt-1.5 leading-snug">
        {description}
      </p>
    </div>
  );
}
