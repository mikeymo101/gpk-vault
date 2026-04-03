import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 gpk-wallpaper">
      {/* Main Card */}
      <div className="w-full max-w-[420px] rounded-[20px] border-[6px] border-[#d4a0b0] shadow-2xl overflow-hidden bg-[#e8dcc8]">
        <div className="relative">

          {/* Logo Banner */}
          <div className="mx-auto mt-4 px-4 text-center">
            <img
              src="/logo.png"
              alt="GPK Vault — Garbage Pail Kids Collection Tracker"
              className="w-full max-w-[320px] mx-auto drop-shadow-lg"
            />
          </div>

          {/* Card Body */}
          <div className="px-5 pt-4 pb-3 space-y-4">

            {/* Tagline */}
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

            {/* CTA Buttons */}
            <div className="flex gap-3 justify-center items-center">
              <Link href="/signup">
                <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-b from-[#5a9a4a] to-[#3a7a2a] text-white font-black text-[12px] uppercase tracking-wider shadow-lg hover:brightness-110 transition-all active:translate-y-px border border-[#2a6a1a]/40">
                  Start Collecting
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </Link>
              <Link href="/login">
                <button className="px-5 py-2.5 rounded-lg bg-gradient-to-b from-[#d8ccb4] to-[#c4b89c] text-[#5a4a35] font-bold text-[12px] uppercase tracking-wider shadow-lg hover:brightness-105 transition-all active:translate-y-px border border-[#b0a488]/60">
                  Sign In
                </button>
              </Link>
            </div>

            {/* Feature Cards with character art */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {/* Checklist */}
              <div className="rounded-xl bg-gradient-to-b from-[#e8d8c8] to-[#d8c8b0] border border-[#c4b090]/50 overflow-hidden shadow-sm">
                <div className="relative h-[80px] overflow-hidden bg-[#d0c0a8] flex items-end justify-center">
                  <img
                    src="/Check.png"
                    alt="Checklist"
                    className="h-[75px] object-contain drop-shadow-md"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-bold text-[11px] text-[#3a3025]">Checklist</h3>
                  <p className="text-[8px] text-[#6b5d4d] mt-0.5 leading-snug">
                    Browse every Original Series with full card artwork.
                  </p>
                </div>
              </div>

              {/* Find Trade Partners */}
              <div className="rounded-xl bg-gradient-to-b from-[#e8d8c8] to-[#d8c8b0] border border-[#c4b090]/50 overflow-hidden shadow-sm">
                <div className="relative h-[80px] overflow-hidden bg-[#d0c0a8] flex items-end justify-center">
                  <img
                    src="/Trade.png"
                    alt="Find Trade Partners"
                    className="h-[75px] object-contain drop-shadow-md"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-bold text-[11px] text-[#3a3025]">Find Trade Partners</h3>
                  <p className="text-[8px] text-[#6b5d4d] mt-0.5 leading-snug">
                    Our matching engine automatically connects you with other collectors.
                  </p>
                </div>
              </div>

              {/* Earn Badges */}
              <div className="rounded-xl bg-gradient-to-b from-[#e8d8c8] to-[#d8c8b0] border border-[#c4b090]/50 overflow-hidden shadow-sm">
                <div className="relative h-[80px] overflow-hidden bg-[#d0c0a8] flex items-end justify-center">
                  <img
                    src="/Badge.png"
                    alt="Earn Badges"
                    className="h-[75px] object-contain drop-shadow-md"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-bold text-[11px] text-[#3a3025]">Earn Badges</h3>
                  <p className="text-[8px] text-[#6b5d4d] mt-0.5 leading-snug">
                    Complete sets, hit milestones, and earn unique digital collector badges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 text-right">
            <p className="text-[8px] text-[#8a7a6a]/60">
              GPK Vault is a fan project. Garbage Pail Kids is a trademark of The Topps Company, Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
