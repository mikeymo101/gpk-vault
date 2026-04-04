"use client";

import type { UserCardWithDetails } from "@/types";

function sortCards(cards: UserCardWithDetails[]) {
  return [...cards].sort((a, b) => {
    const setCompare = a.cards.sets.name.localeCompare(b.cards.sets.name);
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

export function CollectionCards({
  cards,
  filter,
}: {
  cards: UserCardWithDetails[];
  filter: string;
}) {
  const sorted = sortCards(cards);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {sorted.map((uc) => {
        const hasCondition = !!uc.condition;
        const hasGrade = !!uc.grade;
        const hasNotes = !!uc.notes;
        const hasPaid = uc.price_paid_cents && uc.price_paid_cents > 0;
        const hasAnyDetails = hasCondition || hasGrade || hasNotes || hasPaid || uc.quantity > 1;

        return (
          <div
            key={uc.id}
            className="rounded-xl overflow-hidden border-2 border-[#d4c0a8] bg-gradient-to-b from-[#f4ece0] to-[#e8dcc8] shadow-sm"
          >
            {/* Card image */}
            <div className="relative">
              {uc.cards.image_url_a ? (
                <img
                  src={uc.cards.image_url_a}
                  alt={uc.cards.name_a}
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-[#e0d4c0] flex items-center justify-center text-sm text-[#8a7a6a]">
                  {uc.cards.number}
                </div>
              )}

              {/* Quantity badge */}
              {uc.quantity > 1 && (
                <div className="absolute top-1.5 right-1.5 bg-green-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow">
                  x{uc.quantity}
                </div>
              )}
            </div>

            {/* Card info */}
            <div className="p-3 space-y-1.5">
              <div>
                <span className="text-[10px] font-mono text-[#8a7a6a]">{uc.cards.number}</span>
                <h4 className="font-bold text-sm text-[#3a3025] leading-tight">{uc.cards.name_a}</h4>
                <p className="text-[10px] text-[#8a7a6a]">{uc.cards.sets.name}</p>
              </div>

              {/* Details — only show what's been entered */}
              {hasAnyDetails && (
                <div className="space-y-1 pt-1 border-t border-[#d4c0a8]/50">
                  {hasCondition && (
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-wide text-[#8a7a6a] font-bold">Condition</span>
                      <span className="text-[11px] font-medium text-[#3a3025]">
                        {uc.condition}
                        {hasGrade && <span className="ml-1 text-[#5a9a4a] font-bold">{uc.grade}</span>}
                      </span>
                    </div>
                  )}

                  {hasPaid && (
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-wide text-[#8a7a6a] font-bold">Paid</span>
                      <span className="text-[11px] font-medium text-[#3a3025]">
                        ${(uc.price_paid_cents! / 100).toFixed(2)}
                      </span>
                    </div>
                  )}

                  {hasNotes && (
                    <p className="text-[10px] text-[#6b5d4d] italic leading-snug">
                      &ldquo;{uc.notes}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
