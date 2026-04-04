"use client";

import { useState } from "react";
import type { UserCardWithDetails } from "@/types";

type FilterStatus = "have" | "want" | "for_trade" | "for_sale";

const filters: { value: FilterStatus; label: string; color: string; activeColor: string }[] = [
  { value: "have", label: "Have", color: "border-[#d4c0a8] text-[#6b5d4d]", activeColor: "border-green-600 bg-green-600 text-white" },
  { value: "want", label: "Want", color: "border-[#d4c0a8] text-[#6b5d4d]", activeColor: "border-blue-600 bg-blue-600 text-white" },
  { value: "for_trade", label: "For Trade", color: "border-[#d4c0a8] text-[#6b5d4d]", activeColor: "border-amber-600 bg-amber-600 text-white" },
  { value: "for_sale", label: "For Sale", color: "border-[#d4c0a8] text-[#6b5d4d]", activeColor: "border-red-600 bg-red-600 text-white" },
];

export function CollectionView({
  userCards,
  stats,
}: {
  userCards: UserCardWithDetails[];
  stats: { have: number; want: number; forTrade: number; forSale: number; dupes: number };
}) {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("have");

  const filtered = userCards.filter((uc) => uc.status === activeFilter);

  const countMap: Record<FilterStatus, number> = {
    have: stats.have,
    want: stats.want,
    for_trade: stats.forTrade,
    for_sale: stats.forSale,
  };

  // Sort numerically
  const sorted = [...filtered].sort((a, b) => {
    // Group by set first
    const setCompare = a.cards.sets.name.localeCompare(b.cards.sets.name);
    if (setCompare !== 0) return setCompare;
    // Then by card number
    const parseNum = (n: string) => {
      const match = n.match(/^(\d+)([ab]?)$/i);
      return { num: parseInt(match?.[1] ?? "0"), variant: (match?.[2] ?? "").toLowerCase() };
    };
    const av = parseNum(a.cards.number);
    const bv = parseNum(b.cards.number);
    if (av.num !== bv.num) return av.num - bv.num;
    return av.variant.localeCompare(bv.variant);
  });

  // Group by set
  const bySet = new Map<string, typeof sorted>();
  for (const uc of sorted) {
    const setName = uc.cards.sets.name;
    if (!bySet.has(setName)) bySet.set(setName, []);
    bySet.get(setName)!.push(uc);
  }

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
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = activeFilter === f.value;
          const count = countMap[f.value];
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg border-2 text-xs font-bold uppercase tracking-wide transition-all ${
                isActive ? f.activeColor : f.color
              } ${count === 0 ? "opacity-40" : ""}`}
            >
              {f.label} ({count})
            </button>
          );
        })}
        <div className="flex-1" />
        <div className="px-3 py-1.5 rounded-lg border border-[#d4c0a8] text-xs text-[#6b5d4d]">
          Dupes: <span className="font-bold text-[#3a3025]">{stats.dupes}</span>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="gpk-panel text-center py-8">
          <p className="gpk-muted text-sm">
            No cards marked as &quot;{filters.find((f) => f.value === activeFilter)?.label}&quot;
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {Array.from(bySet.entries()).map(([setName, cards]) => (
            <div key={setName}>
              <h3 className="gpk-heading text-sm mb-2">{setName}</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5">
                {cards.map((uc) => (
                  <div
                    key={uc.id}
                    className={`relative rounded-lg overflow-hidden border-2 ${
                      activeFilter === "have"
                        ? "border-green-500"
                        : activeFilter === "want"
                          ? "border-blue-500"
                          : activeFilter === "for_trade"
                            ? "border-amber-500"
                            : "border-red-500"
                    }`}
                  >
                    {uc.cards.image_url_a ? (
                      <img
                        src={uc.cards.image_url_a}
                        alt={uc.cards.name_a}
                        className="w-full aspect-[3/4] object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-[#e8dcc8] flex items-center justify-center text-[10px] text-[#8a7a6a]">
                        {uc.cards.number}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] px-1 py-0.5 text-center truncate">
                      {uc.cards.number}
                    </div>
                    {/* Quantity badge */}
                    {uc.quantity > 1 && (
                      <div className="absolute top-0 right-0 bg-green-600 text-white text-[9px] font-bold px-1 py-0.5 rounded-bl">
                        x{uc.quantity}
                      </div>
                    )}
                    {/* Condition/grade badge */}
                    {uc.condition && (
                      <div className="absolute top-0 left-0 bg-black/60 text-white text-[7px] px-1 py-0.5 rounded-br truncate max-w-[80%]">
                        {uc.condition}{uc.grade ? ` ${uc.grade}` : ""}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
