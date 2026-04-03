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
    // Parse "1a" -> { num: 1, variant: "a" }
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{set.name}</h1>
        <p className="text-muted-foreground">
          {set.series} &middot; {set.total_cards} cards
        </p>
      </div>

      {/* Set info panel */}
      {set.description && (
        <div className="rounded-lg border bg-card p-4 sm:p-5 space-y-3">
          <p className="text-sm leading-relaxed">{set.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            {set.release_date && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Released</p>
                <p>{set.release_date}</p>
              </div>
            )}
            {set.artists && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Artists</p>
                <p>{set.artists}</p>
              </div>
            )}
            {set.notable && (
              <div className="sm:col-span-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notable</p>
                <p className="italic">{set.notable}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <SetChecklist
        cards={cards}
        userCardMap={userCardMap}
        userId={user!.id}
      />
    </div>
  );
}
