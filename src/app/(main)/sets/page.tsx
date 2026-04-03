import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Set } from "@/types";

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

  // Get user's card counts per set
  const { data: userCardsData } = await supabase
    .from("user_cards")
    .select("card_id, status, cards(set_id)")
    .eq("user_id", user!.id)
    .eq("status", "have");

  // Build set_id -> have count
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
            <p className="text-muted-foreground mt-1">
              Card data will be seeded soon
            </p>
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

            return (
              <Link key={set.id} href={`/sets/${set.id}`}>
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{set.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {set.series}
                        </p>
                      </div>
                      <Badge variant="outline">{set.year}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {set.total_cards} cards
                    </p>

                    {/* Progress bar */}
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {have} / {set.total_cards}
                        </span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
