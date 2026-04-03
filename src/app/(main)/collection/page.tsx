import { createClient } from "@/lib/supabase/server";
import { CollectionView } from "@/components/CollectionView";
import { ExportButton } from "@/components/ExportButton";
import type { UserCardWithDetails } from "@/types";

export default async function CollectionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  // Get collection stats
  const haveCount = userCards.filter((uc) => uc.status === "have").length;
  const wantCount = userCards.filter((uc) => uc.status === "want").length;
  const tradeCount = userCards.filter((uc) => uc.status === "for_trade").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Collection</h1>
          <p className="text-muted-foreground">
            Manage your Garbage Pail Kids cards
          </p>
        </div>
        <ExportButton userCards={userCards} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Have" count={haveCount} />
        <StatCard label="Want" count={wantCount} />
        <StatCard label="For Trade" count={tradeCount} />
      </div>

      <CollectionView userCards={userCards} />
    </div>
  );
}

function StatCard({ label, count }: { label: string; count: number }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center">
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
