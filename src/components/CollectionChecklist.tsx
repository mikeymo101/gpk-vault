"use client";

import type { UserCardWithDetails } from "@/types";
import Link from "next/link";

function sortCards(cards: UserCardWithDetails[]) {
  return [...cards].sort((a, b) => {
    const setCompare = a.cards.sets.year - b.cards.sets.year || a.cards.sets.name.localeCompare(b.cards.sets.name);
    if (setCompare !== 0) return setCompare;
    const parseNum = (n: string) => {
      const match = n.match(/^(\d+)([ab]?)$/i);
      return { num: parseInt(match?.[1] ?? "0"), variant: (match?.[2] ?? "").toLowerCase() };
    };
    const av = parseNum(a.cards.number);
    const bv = parseNum(b.cards.number);
    if (av.num !== bv.num) return av.num - bv.num;
    return av.variant.localeCompare(bv.variant);
  });
}

export function CollectionChecklist({
  cards,
  filter,
}: {
  cards: UserCardWithDetails[];
  filter: string;
}) {
  const sorted = sortCards(cards);

  // Group by set
  const bySet = new Map<string, { setName: string; setId: string; year: number; cards: UserCardWithDetails[] }>();
  for (const uc of sorted) {
    const key = uc.cards.sets.id;
    if (!bySet.has(key)) {
      bySet.set(key, { setName: uc.cards.sets.name, setId: uc.cards.sets.id, year: uc.cards.sets.year, cards: [] });
    }
    bySet.get(key)!.cards.push(uc);
  }

  return (
    <div className="space-y-4">
      {Array.from(bySet.values())
        .sort((a, b) => a.year - b.year)
        .map(({ setName, setId, year, cards: setCards }) => (
          <div
            key={setId}
            className="gpk-card-back rounded-xl overflow-hidden shadow-lg border-4 border-amber-800/20"
          >
            {/* Green banner */}
            <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 px-4 py-2 flex items-center justify-between">
              <Link href={`/sets/${setId}`} className="hover:underline">
                <h3 className="text-white font-black text-sm drop-shadow">
                  {setName}
                </h3>
              </Link>
              <span className="text-green-200/70 text-xs">
                {year} &middot; {setCards.length} cards
              </span>
            </div>

            {/* Cream checklist body */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100/80 px-3 py-2">
              {/* Column headers */}
              <div className="flex items-center text-[9px] font-bold uppercase tracking-wider text-amber-700/40 px-1 pb-1 border-b border-amber-300/30">
                <span className="w-10">#</span>
                <span className="flex-1">Name</span>
                {filter === "have" && <span className="w-8 text-center">Qty</span>}
              </div>

              {/* Card rows */}
              <div className="divide-y divide-amber-200/20">
                {setCards.map((uc) => (
                  <div
                    key={uc.id}
                    className="flex items-center py-1 px-1 text-sm hover:bg-amber-200/20 transition-colors"
                  >
                    {/* Checkbox */}
                    <span className="w-3 h-3 rounded-sm border border-amber-600/40 bg-green-500/80 flex items-center justify-center mr-2 shrink-0">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>

                    {/* Number */}
                    <span className="w-8 text-[11px] font-mono text-amber-700/60 shrink-0">
                      {uc.cards.number}
                    </span>

                    {/* Name */}
                    <span className="flex-1 text-[12px] font-medium text-amber-950/80 truncate">
                      {uc.cards.name_a}
                    </span>

                    {/* Quantity */}
                    {filter === "have" && uc.quantity > 1 && (
                      <span className="w-8 text-center text-[10px] font-bold text-green-700">
                        x{uc.quantity}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="h-1.5 bg-gradient-to-r from-green-700 via-green-600 to-green-700" />
          </div>
        ))}
    </div>
  );
}
