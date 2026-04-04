"use client";

import type { UserCardWithDetails } from "@/types";

const filterColors: Record<string, string> = {
  have: "border-green-500",
  want: "border-blue-500",
  for_trade: "border-amber-500",
  for_sale: "border-red-500",
};

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

export function CollectionGrid({
  cards,
  filter,
  onCardClick,
}: {
  cards: UserCardWithDetails[];
  filter: string;
  onCardClick: (card: UserCardWithDetails) => void;
}) {
  const sorted = sortCards(cards);
  const borderColor = filterColors[filter] ?? "border-green-500";

  // Group by set
  const bySet = new Map<string, { setName: string; cards: UserCardWithDetails[] }>();
  for (const uc of sorted) {
    const key = uc.cards.sets.id;
    if (!bySet.has(key)) {
      bySet.set(key, { setName: uc.cards.sets.name, cards: [] });
    }
    bySet.get(key)!.cards.push(uc);
  }

  return (
    <div className="space-y-5">
      {Array.from(bySet.values()).map(({ setName, cards: setCards }) => (
        <div key={setName}>
          <h3 className="gpk-heading text-sm mb-2">{setName}</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5">
            {setCards.map((uc) => (
              <div
                key={uc.id}
                onClick={() => onCardClick(uc)}
                role="button"
                className={`relative rounded-lg overflow-hidden border-2 ${borderColor} cursor-pointer hover:scale-105 transition-transform`}
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
                {uc.quantity > 1 && (
                  <div className="absolute top-0 right-0 bg-green-600 text-white text-[9px] font-bold px-1 py-0.5 rounded-bl">
                    x{uc.quantity}
                  </div>
                )}
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
  );
}
