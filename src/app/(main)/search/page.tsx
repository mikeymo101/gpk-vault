import { createClient } from "@/lib/supabase/server";
import { SearchResults } from "@/components/SearchResults";
import type { Card, Set } from "@/types";

type CardWithSet = Card & { sets: Set };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  let results: CardWithSet[] = [];

  if (query.length >= 2) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("cards")
      .select("*, sets(*)")
      .or(`name_a.ilike.%${query}%,number.ilike.%${query}%`)
      .order("number")
      .limit(100);

    results = (data ?? []) as unknown as CardWithSet[];

    // Sort numerically
    results.sort((a, b) => {
      const parseNum = (n: string) => {
        const match = n.match(/^(\d+)([ab]?)$/i);
        return { num: parseInt(match?.[1] ?? "0"), variant: (match?.[2] ?? "").toLowerCase() };
      };
      const av = parseNum(a.number);
      const bv = parseNum(b.number);
      if (av.num !== bv.num) return av.num - bv.num;
      return av.variant.localeCompare(bv.variant);
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search Cards</h1>
        <p className="text-muted-foreground">
          Search across all sets by card name or number
        </p>
      </div>

      <SearchResults query={query} results={results} />
    </div>
  );
}
