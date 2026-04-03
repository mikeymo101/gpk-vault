import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 gpk-wallpaper">
      {/* Main Card */}
      <div className="w-full max-w-[420px] rounded-[20px] border-[6px] border-[#d4a0b0] shadow-2xl overflow-hidden bg-[#e8dcc8]">
        <div className="relative">

          {/* Settings gear icon */}
          <div className="absolute top-2 right-3 z-20 flex gap-0.5">
            <div className="w-6 h-6 rounded-full bg-[#8a7a6a]/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b5d4d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
              </svg>
            </div>
          </div>

          {/* Logo Banner */}
          <div className="mx-auto mt-3 px-4 text-center">
            <img
              src="/logo.png"
              alt="GPK Vault — Garbage Pail Kids Collection Tracker"
              className="w-full max-w-[340px] mx-auto drop-shadow-lg"
            />
          </div>

          {/* Card Body */}
          <div className="px-5 pt-4 pb-3 space-y-4">

            {/* Collector's Portal */}
            <div className="text-center">
              <h2
                className="text-[17px] font-bold text-[#3a3025]"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Collector&apos;s Portal
              </h2>
              <p className="text-[11px] text-[#6b5d4d] mt-1 leading-relaxed">
                Track your collection. Find trades. Complete your
                <br />
                sets. The ultimate tool for GPK collectors.
              </p>
            </div>

            {/* Feature Badges */}
            <div className="flex justify-center gap-3">
              <Badge icon={<CardStackIcon />} label="1,240+" sublabel="Cards" />
              <Badge icon={<StackIcon />} label="15" sublabel="OS Sets" />
              <Badge icon={<TagIcon />} label="Trade" sublabel="Matching" />
              <Badge icon={<HeartTagIcon />} label="Free" sublabel="Forever" />
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2.5 justify-center">
              <Link href="/signup">
                <button className="px-4 py-2 rounded-lg bg-gradient-to-b from-[#5a9a4a] to-[#3a7a2a] text-white font-black text-[11px] uppercase tracking-wider shadow-md hover:brightness-110 transition-all active:translate-y-px border border-[#2a6a1a]/40">
                  Start Collecting
                </button>
              </Link>
              <Link href="/login">
                <button className="px-4 py-2 rounded-lg bg-gradient-to-b from-[#d8ccb4] to-[#c4b89c] text-[#5a4a35] font-bold text-[11px] uppercase tracking-wider shadow-md hover:brightness-105 transition-all active:translate-y-px border border-[#b0a488]/60">
                  Sign In
                </button>
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#c4b498]/40 mx-2" />

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-2 relative">
              <FeatureCard
                icon={<CheckIcon />}
                title="Checklist"
                description="Browse every Original Series with full card artwork."
              />
              <FeatureCard
                icon={<SwapIcon />}
                title="Find Trade Partners"
                description="Our matching engine finds you need and what need with one click."
              />
              <FeatureCard
                icon={<TrophyIcon />}
                title="Earn Badges"
                description="Complete sets, milestones, and collect badges."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 text-right">
            <p className="text-[8px] text-[#8a7a6a]/60">
              GPK Vault is a fan project. Garbage Pail Kids
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Badge Component ---- */
function Badge({
  icon,
  label,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-b from-[#c4b498] to-[#a89878] border-[2.5px] border-[#8a7a60]/50 flex items-center justify-center shadow-inner">
        <div className="text-[#5a4a35]">{icon}</div>
      </div>
      <div className="text-center mt-0.5">
        <p className="text-[9px] font-black text-[#5a4a35] leading-none">{label}</p>
        <p className="text-[7px] font-semibold text-[#8a7a6a] leading-tight">{sublabel}</p>
      </div>
    </div>
  );
}

/* ---- Feature Card Component ---- */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-gradient-to-b from-[#f0e0d0]/80 to-[#e8d4c0]/60 border border-[#d4b8a0]/40 p-2.5 shadow-sm relative">
      <div className="flex justify-between items-start mb-1.5">
        <div className="text-[#7a6a5a]">{icon}</div>
      </div>
      <h3 className="font-bold text-[10px] text-[#3a3025] leading-tight">{title}</h3>
      <p className="text-[8px] text-[#8a7a6a] mt-1 leading-snug">{description}</p>
    </div>
  );
}

/* ---- SVG Icons ---- */
function CardStackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="2" y="6" width="16" height="16" rx="2" opacity="0.4" />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
      <rect x="6" y="3" width="12" height="18" rx="1" fill="none" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function HeartTagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <path d="M12 10.5c0-1.5-1-2.5-2.5-2.5S7 9 7 10.5c0 2 2.5 3.5 2.5 3.5s2.5-1.5 2.5-3.5z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3l4 4-4 4" />
      <path d="M20 7H4" />
      <path d="M8 21l-4-4 4-4" />
      <path d="M4 17h16" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0012 0V2z" />
    </svg>
  );
}
