"use client";

import { BADGE_DEFINITIONS, type CollectorStats } from "@/lib/badges";

export function BadgesDisplay({ stats }: { stats: CollectorStats }) {
  const earned = BADGE_DEFINITIONS.filter((b) => b.check(stats));
  const unearned = BADGE_DEFINITIONS.filter((b) => !b.check(stats));

  if (earned.length === 0 && unearned.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">Badges</h2>

      {earned.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {earned.map((badge) => (
            <div
              key={badge.type}
              className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm"
              title={badge.description}
            >
              <span>{badge.icon}</span>
              <span className="font-medium">{badge.name}</span>
            </div>
          ))}
        </div>
      )}

      {unearned.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {unearned.map((badge) => (
            <div
              key={badge.type}
              className="flex items-center gap-2 rounded-full border border-dashed bg-muted/30 px-3 py-1.5 text-sm opacity-40"
              title={`Locked: ${badge.description}`}
            >
              <span className="grayscale">{badge.icon}</span>
              <span>{badge.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
