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

  // Fetch profile for username
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user!.id)
    .single();

  // Fetch user's collection with card and set details
  const { data } = await supabase
    .from("user_cards")
    .select(`
      *,
      cards (
        *,
        sets (*)
      )
    `)
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const userCards = (data ?? []) as unknown as UserCardWithDetails[];

  // Stats
  const haveCards = userCards.filter((uc) => uc.status === "have");
  const haveCount = haveCards.length;
  const wantCount = userCards.filter((uc) => uc.status === "want").length;
  const tradeCount = userCards.filter((uc) => uc.status === "for_trade").length;
  const dupeCount = haveCards.reduce((sum, uc) => sum + Math.max(0, uc.quantity - 1), 0);

  // Value estimate (sum estimated_value_cents for have cards)
  const totalValueCents = haveCards.reduce(
    (sum, uc) => sum + (uc.cards.estimated_value_cents ?? 0) * uc.quantity,
    0
  );

  // Sets user is collecting
  const setIds = new Set(haveCards.map((uc) => uc.cards.sets.id));

  // Check set completion
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

  // Badge stats
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
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Collection</h1>
          <p className="text-muted-foreground">
            Manage your Garbage Pail Kids cards
          </p>
        </div>
        <div className="flex gap-2">
          <ExportButton userCards={userCards} />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard label="Have" count={haveCount} />
        <StatCard label="Want" count={wantCount} />
        <StatCard label="For Trade" count={tradeCount} />
        <StatCard label="Dupes" count={dupeCount} />
        <StatCard
          label="Est. Value"
          count={totalValueCents}
          format="currency"
        />
      </div>

      {/* Completed sets */}
      {completedSets.length > 0 && (
        <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 p-4">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            Completed sets: {completedSets.join(", ")}
          </p>
        </div>
      )}

      {/* Badges */}
      <BadgesDisplay stats={badgeStats} />

      {/* Share links */}
      {username && (
        <div className="flex flex-wrap gap-3 text-sm">
          <ShareWantList username={username} wantCount={wantCount} />
        </div>
      )}

      <CollectionView userCards={userCards} />
    </div>
  );
}

function StatCard({
  label,
  count,
  format,
}: {
  label: string;
  count: number;
  format?: "currency";
}) {
  const display =
    format === "currency"
      ? count > 0
        ? `$${(count / 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
        : "—"
      : count;

  return (
    <div className="rounded-lg border bg-card p-3 text-center">
      <p className="text-xl font-bold">{display}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
