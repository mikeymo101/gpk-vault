"use client";

import { useState } from "react";
import type { UserCardWithDetails } from "@/types";
import { CollectionChecklist } from "@/components/CollectionChecklist";
import { CollectionGrid } from "@/components/CollectionGrid";
import { CollectionCards } from "@/components/CollectionCards";

type FilterStatus = "have" | "want" | "for_trade" | "for_sale";
type ViewMode = "checklist" | "grid" | "cards";

const filters: { value: FilterStatus; label: string; activeColor: string }[] = [
  { value: "have", label: "Have", activeColor: "border-green-600 bg-green-600 text-white" },
  { value: "want", label: "Want", activeColor: "border-blue-600 bg-blue-600 text-white" },
  { value: "for_trade", label: "For Trade", activeColor: "border-amber-600 bg-amber-600 text-white" },
  { value: "for_sale", label: "For Sale", activeColor: "border-red-600 bg-red-600 text-white" },
];

const views: { value: ViewMode; label: string }[] = [
  { value: "checklist", label: "Checklist" },
  { value: "grid", label: "Grid" },
  { value: "cards", label: "Cards" },
];

export function CollectionView({
  userCards,
  stats,
}: {
  userCards: UserCardWithDetails[];
  stats: { have: number; want: number; forTrade: number; forSale: number; dupes: number };
}) {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("have");
  const [viewMode, setViewMode] = useState<ViewMode>("checklist");

  const filtered = userCards.filter((uc) => uc.status === activeFilter);

  const countMap: Record<FilterStatus, number> = {
    have: stats.have,
    want: stats.want,
    for_trade: stats.forTrade,
    for_sale: stats.forSale,
  };

  if (userCards.length === 0) {
    return (
      <div className="gpk-panel text-center py-10">
        <p className="gpk-heading text-lg">Your collection is empty</p>
        <p className="gpk-muted text-sm mt-1">
          Browse sets and start adding cards to your collection
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter + View controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status filters */}
        {filters.map((f) => {
          const isActive = activeFilter === f.value;
          const count = countMap[f.value];
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`gpk-chip ${isActive ? "gpk-chip-active" : ""} ${count === 0 ? "opacity-40" : ""}`}
            >
              {f.label} ({count})
            </button>
          );
        })}

        <div className="flex-1" />

        {/* Dupes */}
        <div className="px-3 py-1.5 rounded-lg border border-[#d4c0a8] text-xs text-[#6b5d4d]">
          Dupes: <span className="font-bold text-[#3a3025]">{stats.dupes}</span>
        </div>
      </div>

      {/* View mode toggle */}
      <div className="flex gap-1 border-2 border-[#111] rounded-xl p-1 w-fit bg-[#F2E8D5]">
        {views.map((v) => (
          <button
            key={v.value}
            onClick={() => setViewMode(v.value)}
            className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
              viewMode === v.value
                ? "bg-[#111] text-[#7ED957] shadow-[2px_2px_0_#7ED957]"
                : "text-[#777] hover:text-[#111]"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="gpk-panel text-center py-8">
          <p className="gpk-muted text-sm">
            No cards marked as &quot;{filters.find((f) => f.value === activeFilter)?.label}&quot;
          </p>
        </div>
      ) : (
        <>
          {viewMode === "checklist" && (
            <CollectionChecklist cards={filtered} filter={activeFilter} />
          )}
          {viewMode === "grid" && (
            <CollectionGrid cards={filtered} filter={activeFilter} />
          )}
          {viewMode === "cards" && (
            <CollectionCards cards={filtered} filter={activeFilter} />
          )}
        </>
      )}
    </div>
  );
}
