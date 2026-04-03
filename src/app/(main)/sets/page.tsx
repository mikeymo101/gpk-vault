import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Set, Card as GPKCard } from "@/types";

// Map set names to their iconic cover card numbers
const setCoverCards: Record<string, string> = {
  "Original Series 1": "8a",   // Adam Bomb
  "Original Series 2": "52a",  // Dirty Harry
  "Original Series 3": "88a",  // Dinah Saur
  "Original Series 4": "137a", // Max Axe
  "Original Series 5": "185a", // Fran Furter
  "Original Series 6": "222a", // Troy Toy
  "Original Series 7": "260a", // Adam Boom
  "Original Series 8": "309a", // Heartless Hal
  "Original Series 9": "355a", // Beasty Boyd
  "Original Series 10": "399a", // Dirty Flora
  "Original Series 11": "438a", // Hallie Ween
  "Original Series 12": "480a", // Robby Rubbish
  "Original Series 13": "520a", // Sprinkling Jose
  "Original Series 14": "549a", // Shannon Cannon
  "Original Series 15": "600a", // Vendo-Matt
};

export default async function SetsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("sets")
    .select("*")
    .order("year", { ascending: true });

  const sets = (data ?? []) as unknown as Set[];

  // Get cover card images
  const coverNumbers = Object.values(setCoverCards);
  const { data: coverCardsData } = await supabase
    .from("cards")
    .select("number, image_url_a, set_id")
    .in("number", coverNumbers);

  const coverCards = (coverCardsData ?? []) as unknown as GPKCard[];
  const coverMap = new Map<string, string>();
  for (const card of coverCards) {
    if (card.image_url_a) {
      coverMap.set(card.set_id + card.number, card.image_url_a);
    }
  }

  // Get user's card counts per set
  const { data: userCardsData } = await supabase
    .from("user_cards")
    .select("card_id, status, cards(set_id)")
    .eq("user_id", user!.id)
    .eq("status", "have");

  const haveCounts: Record<string, number> = {};
  for (const uc of (userCardsData ?? []) as unknown as { card_id: string; status: string; cards: { set_id: string } }[]) {
    const setId = uc.cards?.set_id;
    if (setId) {
      haveCounts[setId] = (haveCounts[setId] ?? 0) + 1;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Browse Sets</h1>
        <p className="text-muted-foreground">
          Select a set to view its checklist
        </p>
      </div>

      {sets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium">No sets loaded yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sets.map((set) => {
            const have = haveCounts[set.id] ?? 0;
            const pct =
              set.total_cards > 0
                ? Math.round((have / set.total_cards) * 100)
                : 0;
            const coverNum = setCoverCards[set.name];
            const coverUrl = coverNum
              ? coverMap.get(set.id + coverNum)
              : undefined;

            return (
              <Link key={set.id} href={`/sets/${set.id}`}>
                <Card className="hover:border-primary/50 transition-all cursor-pointer h-full overflow-hidden group">
                  <div className="flex">
                    {/* Cover card image */}
                    <div className="w-24 sm:w-28 shrink-0 bg-muted relative overflow-hidden">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={set.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                          {set.name.replace("Original Series ", "OS")}
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold">{set.name}</p>
                          <Badge variant="outline" className="shrink-0 text-xs">
                            {set.year}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {set.release_date ?? set.series} &middot; {set.total_cards} cards
                        </p>
                        {set.artists && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {set.artists}
                          </p>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>
                            {have} / {set.total_cards}
                          </span>
                          {pct === 100 ? (
                            <span className="text-green-600 font-bold">COMPLETE</span>
                          ) : (
                            <span>{pct}%</span>
                          )}
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              pct === 100 ? "bg-green-500" : "bg-primary"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
