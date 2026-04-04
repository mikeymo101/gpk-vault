import { createClient } from "@/lib/supabase/server";
import { CollectionView } from "@/components/CollectionView";
import { ExportButton } from "@/components/ExportButton";
import { BadgesDisplay } from "@/components/BadgesDisplay";
import { ShareWantList } from "@/components/ShareWantList";
import type { UserCardWithDetails, Set } from "@/types";
import type { CollectorStats } from "@/lib/badges";

export default async function CollectionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user!.id)
    .single();

  const { data } = await supabase
    .from("user_cards")
    .select(`*, cards (*, sets (*))`)
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const userCards = (data ?? []) as unknown as UserCardWithDetails[];

  const haveCards = userCards.filter((uc) => uc.status === "have");
  const haveCount = haveCards.length;
  const wantCount = userCards.filter((uc) => uc.status === "want").length;
  const tradeCount = userCards.filter((uc) => uc.status === "for_trade").length;
  const saleCount = userCards.filter((uc) => uc.status === "for_sale").length;
  const dupeCount = haveCards.reduce((sum, uc) => sum + Math.max(0, uc.quantity - 1), 0);

  const setIds = new Set(haveCards.map((uc) => uc.cards.sets.id));
  const { data: allSets } = await supabase.from("sets").select("*");
  const sets = (allSets ?? []) as unknown as Set[];

  const completedSets: string[] = [];
  for (const set of sets) {
    if (!setIds.has(set.id)) continue;
    const cardsInSet = haveCards.filter((uc) => uc.cards.set_id === set.id);
    if (cardsInSet.length >= set.total_cards) {
      completedSets.push(set.name);
    }
  }

  const badgeStats: CollectorStats = {
    totalHave: haveCount,
    totalWant: wantCount,
    totalSets: setIds.size,
    completedSets,
    dupeCount,
    totalTrades: 0,
  };

  const username = (profile as unknown as { username: string } | null)?.username;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="gpk-heading text-2xl">My Collection</h1>
          <p className="gpk-muted text-sm">Manage your Garbage Pail Kids cards</p>
        </div>
        <ExportButton userCards={userCards} />
      </div>

      {completedSets.length > 0 && (
        <div className="gpk-panel !bg-green-50/50 !border-green-300/40">
          <p className="text-sm font-medium text-green-800">
            Completed sets: {completedSets.join(", ")}
          </p>
        </div>
      )}

      <BadgesDisplay stats={badgeStats} />

      {username && (
        <ShareWantList username={username} wantCount={wantCount} />
      )}

      <CollectionView
        userCards={userCards}
        stats={{
          have: haveCount,
          want: wantCount,
          forTrade: tradeCount,
          forSale: saleCount,
          dupes: dupeCount,
        }}
      />
    </div>
  );
}
