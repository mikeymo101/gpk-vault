"use client";

import { useState } from "react";
import { BADGE_DEFINITIONS, type CollectorStats } from "@/lib/badges";

export function BadgesDisplay({ stats }: { stats: CollectorStats }) {
  const earned = BADGE_DEFINITIONS.filter((b) => b.check(stats));
  const unearned = BADGE_DEFINITIONS.filter((b) => !b.check(stats));
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  if (earned.length === 0 && unearned.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="gpk-heading text-lg">Badges</h2>

      {/* Earned */}
      {earned.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {earned.map((badge) => (
            <div
              key={badge.type}
              className="relative"
              onMouseEnter={() => setHoveredBadge(badge.type)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              <div className="flex items-center gap-1.5 rounded-full border-2 border-[#111] bg-[#7ED957] px-3 py-1.5 text-xs font-bold text-[#111] shadow-[2px_2px_0_#111] cursor-default">
                <span className="text-sm">{badge.icon}</span>
                <span>{badge.name}</span>
              </div>

              {/* Hover tooltip */}
              {hoveredBadge === badge.type && (
                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 gpk-panel p-3 text-left">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base">{badge.icon}</span>
                    <span className="font-black text-sm text-[#111]">{badge.name}</span>
                  </div>
                  <p className="text-[10px] font-bold text-[#7ED957] uppercase tracking-wide mb-1">
                    {badge.description}
                  </p>
                  <p className="text-xs text-[#555] leading-relaxed">
                    {badge.detail}
                  </p>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#F2E8D5] border-r-3 border-b-3 border-[#111] rotate-45 -mt-1.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Locked */}
      {unearned.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {unearned.map((badge) => (
            <div
              key={badge.type}
              className="relative"
              onMouseEnter={() => setHoveredBadge(badge.type)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              <div className="flex items-center gap-1.5 rounded-full border-2 border-[#ccc] bg-[#e8e0d0] px-3 py-1.5 text-xs font-bold text-[#aaa] cursor-default opacity-50">
                <span className="text-sm grayscale">{badge.icon}</span>
                <span>{badge.name}</span>
              </div>

              {/* Hover tooltip for locked */}
              {hoveredBadge === badge.type && (
                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 gpk-panel p-3 text-left">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base grayscale">{badge.icon}</span>
                    <span className="font-black text-sm text-[#111]">{badge.name}</span>
                    <span className="text-[9px] font-bold text-[#FF4FA3] uppercase ml-auto">Locked</span>
                  </div>
                  <p className="text-[10px] font-bold text-[#999] uppercase tracking-wide mb-1">
                    {badge.description}
                  </p>
                  <p className="text-xs text-[#555] leading-relaxed">
                    {badge.detail}
                  </p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#F2E8D5] border-r-3 border-b-3 border-[#111] rotate-45 -mt-1.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
