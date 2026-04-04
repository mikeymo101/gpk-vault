import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { NeedsCardGrid } from "@/components/NeedsCardGrid";
import Link from "next/link";
import type { Set, Card as GPKCard, UserCard } from "@/types";

type UserCardWithCard = UserCard & { cards: GPKCard & { sets: Set } };

export default async function NeedsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get all sets the user has at least one "have" card in
  const { data: haveData } = await supabase
    .from("user_cards")
    .select("card_id, cards(set_id)")
    .eq("user_id", user!.id)
    .eq("status", "have");

  const activeSets = new Set(
    ((haveData ?? []) as unknown as { card_id: string; cards: { set_id: string } }[])
      .map((uc) => uc.cards.set_id)
  );

  if (activeSets.size === 0) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">What Do I Need?</h1>
          <p className="text-muted-foreground">
            Cards missing from sets you&apos;re collecting
          </p>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium">Start collecting first</p>
            <p className="text-muted-foreground mt-1">
              Mark cards as &quot;Have&quot; in any set to see what you&apos;re missing
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get all cards in those sets
  const { data: allCardsData } = await supabase
    .from("cards")
    .select("*, sets(*)")
    .in("set_id", Array.from(activeSets))
    .eq("is_parallel", false)
    .order("number");

  const allCards = (allCardsData ?? []) as unknown as (GPKCard & { sets: Set })[];

  // Get user's have cards
  const { data: userHaveData } = await supabase
    .from("user_cards")
    .select("card_id")
    .eq("user_id", user!.id)
    .eq("status", "have");

  const haveCardIds = new Set(
    ((userHaveData ?? []) as unknown as { card_id: string }[]).map((uc) => uc.card_id)
  );

  // Filter to only missing cards
  const missingCards = allCards.filter((c) => !haveCardIds.has(c.id));

  // Group by set
  const bySet = new Map<string, { set: Set; cards: (GPKCard & { sets: Set })[] }>();
  for (const card of missingCards) {
    if (!bySet.has(card.set_id)) {
      bySet.set(card.set_id, { set: card.sets, cards: [] });
    }
    bySet.get(card.set_id)!.cards.push(card);
  }

  // Sort cards numerically within each set
  const parseNum = (n: string) => {
    const match = n.match(/^(\d+)([ab]?)$/i);
    return { num: parseInt(match?.[1] ?? "0"), variant: (match?.[2] ?? "").toLowerCase() };
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="gpk-heading text-2xl">What Do I Need?</h1>
        <p className="gpk-muted text-sm">
          {missingCards.length} cards missing from {activeSets.size} set{activeSets.size !== 1 ? "s" : ""} you&apos;re collecting
        </p>
      </div>

      {missingCards.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium">You have everything!</p>
            <p className="text-muted-foreground mt-1">
              All sets you&apos;re collecting are complete
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Array.from(bySet.values())
            .sort((a, b) => a.set.year - b.set.year)
            .map(({ set, cards }) => {
              const totalInSet = allCards.filter((c) => c.set_id === set.id).length;
              const haveInSet = totalInSet - cards.length;
              const pct = Math.round((haveInSet / totalInSet) * 100);

              return (
                <div key={set.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Link href={`/sets/${set.id}`} className="hover:underline">
                      <h2 className="font-semibold text-lg">{set.name}</h2>
                    </Link>
                    <span className="text-sm text-muted-foreground">
                      Need {cards.length} of {totalInSet} ({pct}% complete)
                    </span>
                  </div>

                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <NeedsCardGrid
                    cards={cards.sort((a, b) => {
                      const av = parseNum(a.number);
                      const bv = parseNum(b.number);
                      if (av.num !== bv.num) return av.num - bv.num;
                      return av.variant.localeCompare(bv.variant);
                    })}
                    userId={user!.id}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
