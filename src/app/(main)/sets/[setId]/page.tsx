import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { SetChecklist } from "@/components/SetChecklist";
import type { Set, Card as GPKCard, UserCard } from "@/types";

export default async function SetDetailPage({
  params,
}: {
  params: Promise<{ setId: string }>;
}) {
  const { setId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch set info
  const { data: setData } = await supabase
    .from("sets")
    .select("*")
    .eq("id", setId)
    .single();

  const set = setData as unknown as Set | null;
  if (!set) notFound();

  // Fetch all cards in this set
  const { data: cardsData } = await supabase
    .from("cards")
    .select("*")
    .eq("set_id", setId)
    .eq("is_parallel", false)
    .order("number", { ascending: true });

  const cards = ((cardsData ?? []) as unknown as GPKCard[]).sort((a, b) => {
    const parseNum = (n: string) => {
      const match = n.match(/^(\d+)([ab]?)$/i);
      return { num: parseInt(match?.[1] ?? "0"), variant: (match?.[2] ?? "").toLowerCase() };
    };
    const av = parseNum(a.number);
    const bv = parseNum(b.number);
    if (av.num !== bv.num) return av.num - bv.num;
    return av.variant.localeCompare(bv.variant);
  });

  // Fetch user's entries for cards in this set
  const { data: userCardsData } = await supabase
    .from("user_cards")
    .select("*")
    .eq("user_id", user!.id)
    .in(
      "card_id",
      cards.map((c) => c.id)
    );

  const userCards = (userCardsData ?? []) as unknown as UserCard[];

  // Build a lookup: card_id -> user_card entries
  const userCardMap: Record<string, UserCard[]> = {};
  for (const uc of userCards) {
    if (!userCardMap[uc.card_id]) userCardMap[uc.card_id] = [];
    userCardMap[uc.card_id].push(uc);
  }

  return (
    <div className="space-y-6">
      {/* Card-back styled header */}
      <div className="gpk-card-back rounded-xl overflow-hidden shadow-xl border-4 border-amber-800/30">
        {/* Green GPK Banner */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 px-4 sm:px-6 py-3 text-center relative overflow-hidden">
          {/* Decorative stars */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1 left-4 text-yellow-300 text-lg">*</div>
            <div className="absolute top-2 right-8 text-yellow-300 text-sm">*</div>
            <div className="absolute bottom-1 left-1/4 text-yellow-300 text-xs">*</div>
            <div className="absolute bottom-0 right-1/3 text-yellow-300 text-lg">*</div>
          </div>

          <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-green-200/80">
            Garbage Pail Kids
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-md">
            {set.name}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1 text-green-100/90 text-xs sm:text-sm">
            <span>{set.release_date ?? set.year}</span>
            <span className="text-green-300/50">|</span>
            <span>{set.total_cards} stickers</span>
          </div>
        </div>

        {/* Cream card-stock body */}
        <div className="bg-gradient-to-b from-amber-50 to-amber-100/80 dark:from-amber-950/30 dark:to-amber-900/20">
          {/* Set info section */}
          {set.description && (
            <div className="px-4 sm:px-6 py-4 border-b-2 border-dashed border-amber-300/50 dark:border-amber-700/30">
              <p className="text-sm leading-relaxed text-amber-950/80 dark:text-amber-100/80">
                {set.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                {set.artists && (
                  <div>
                    <span className="font-bold text-amber-800/60 dark:text-amber-300/60 uppercase tracking-wide text-[10px]">
                      Artists:{" "}
                    </span>
                    <span className="text-amber-950/70 dark:text-amber-100/70">
                      {set.artists}
                    </span>
                  </div>
                )}
                {set.notable && (
                  <div className="sm:col-span-2">
                    <span className="font-bold text-amber-800/60 dark:text-amber-300/60 uppercase tracking-wide text-[10px]">
                      Notable:{" "}
                    </span>
                    <span className="text-amber-950/70 dark:text-amber-100/70 italic">
                      {set.notable}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Checklist header */}
          <div className="px-4 sm:px-6 pt-3 pb-1">
            <div className="flex items-center justify-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase text-amber-700/50 dark:text-amber-400/50">
                Checklist
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            </div>
          </div>

          {/* The actual checklist */}
          <div className="px-2 sm:px-4 pb-4">
            <SetChecklist
              cards={cards}
              userCardMap={userCardMap}
              userId={user!.id}
            />
          </div>
        </div>

        {/* Bottom border bar */}
        <div className="h-2 bg-gradient-to-r from-green-700 via-green-600 to-green-700" />
      </div>
    </div>
  );
}
