import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 35px,
                currentColor 35px,
                currentColor 36px
              )`,
            }}
          />
        </div>

        <div className="relative text-center space-y-8 max-w-2xl">
          {/* Logo treatment */}
          <div className="space-y-2">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter">
              <span className="text-primary">GPK</span>{" "}
              <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                VAULT
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">
              <span className="h-px w-8 bg-primary/40" />
              Garbage Pail Kids Collection Tracker
              <span className="h-px w-8 bg-primary/40" />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Track your collection. Find trades. Complete your sets. The ultimate
            tool for GPK collectors.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto text-sm">
            <FeatureChip label="1,240+ Cards" />
            <FeatureChip label="15 OS Sets" />
            <FeatureChip label="Trade Matching" />
            <FeatureChip label="Free Forever" />
          </div>

          {/* CTA */}
          <div className="flex gap-3 justify-center pt-2">
            <Link href="/signup">
              <Button size="lg" className="text-base px-8 h-12 font-bold">
                Start Collecting
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 h-12"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature sections */}
      <div className="border-t bg-card">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Checklist Everything"
              description="Browse every Original Series set with full card artwork. Mark cards as Have, Want, or For Trade. Track duplicates and condition."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              }
            />
            <FeatureCard
              title="Find Trade Partners"
              description="Our matching engine finds collectors who have what you need and need what you have. Share your want list with one click."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/></svg>
              }
            />
            <FeatureCard
              title="Earn Badges"
              description="Complete sets, hit milestones, and earn collector badges. Share your public profile and show off your collection to the community."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
              }
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        GPK Vault is a fan project. Garbage Pail Kids is a trademark of The
        Topps Company, Inc.
      </footer>
    </div>
  );
}

function FeatureChip({ label }: { label: string }) {
  return (
    <div className="rounded-full border bg-card px-3 py-1.5 text-center font-medium">
      {label}
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="text-primary">{icon}</div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
