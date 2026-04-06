import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Set, Card as GPKCard } from "@/types";

// Iconic cover cards per set (first card as fallback)
const setCoverCards: Record<string, string> = {
  "Original Series 1": "8a",
  "Original Series 2": "52a",
  "Original Series 3": "88a",
  "Original Series 4": "137a",
  "Original Series 5": "185a",
  "Original Series 6": "222a",
  "Original Series 7": "260a",
  "Original Series 8": "309a",
  "Original Series 9": "355a",
  "Original Series 10": "399a",
  "Original Series 11": "438a",
  "Original Series 12": "480a",
  "Original Series 13": "520a",
  "Original Series 14": "549a",
  "Original Series 15": "600a",
  "All New Series 4": "40a",  // Adam Bomb
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

  const sets = ((data ?? []) as unknown as Set[]).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    const numA = parseInt(a.name.match(/\d+/)?.[0] ?? "0");
    const numB = parseInt(b.name.match(/\d+/)?.[0] ?? "0");
    return numA - numB;
  });

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

  // Also get first card per set as fallback cover
  const { data: firstCardsData } = await supabase
    .from("cards")
    .select("set_id, number, image_url_a")
    .like("number", "%a")
    .order("number", { ascending: true });

  const firstCardMap = new Map<string, string>();
  for (const card of (firstCardsData ?? []) as unknown as GPKCard[]) {
    if (card.image_url_a && !firstCardMap.has(card.set_id)) {
      firstCardMap.set(card.set_id, card.image_url_a);
    }
  }

  // Get user's have counts per set
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

  // Group sets by series
  const seriesGroups = new Map<string, Set[]>();
  for (const set of sets) {
    const series = set.series;
    if (!seriesGroups.has(series)) seriesGroups.set(series, []);
    seriesGroups.get(series)!.push(set);
  }

  // Define series order and colors
  const seriesConfig: Record<string, { color: string; accent: string }> = {
    "Original Series": { color: "#7ED957", accent: "#4CAF50" },
    "All New Series": { color: "#4CC9F0", accent: "#2196F3" },
    "Flashback Series": { color: "#FFE600", accent: "#FF9800" },
    "Brand New Series": { color: "#FF4FA3", accent: "#E91E63" },
    "Chrome Series": { color: "#C0C0C0", accent: "#9E9E9E" },
    "Sapphire Edition": { color: "#1E88E5", accent: "#1565C0" },
  };

  function getCover(set: Set): string | undefined {
    const coverNum = setCoverCards[set.name];
    if (coverNum) {
      const url = coverMap.get(set.id + coverNum);
      if (url) return url;
    }
    return firstCardMap.get(set.id);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="gpk-heading text-2xl">Browse Sets</h1>
        <p className="gpk-muted text-sm">
          {sets.length} sets &middot; Select a series to explore
        </p>
      </div>

      {sets.length === 0 ? (
        <div className="gpk-panel p-8 text-center">
          <p className="gpk-heading text-lg">No sets loaded yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(seriesGroups.entries()).map(([seriesName, seriesSets]) => {
            const config = seriesConfig[seriesName] ?? { color: "#7ED957", accent: "#4CAF50" };
            const totalCards = seriesSets.reduce((sum, s) => sum + s.total_cards, 0);
            const totalHave = seriesSets.reduce((sum, s) => sum + (haveCounts[s.id] ?? 0), 0);
            const overallPct = totalCards > 0 ? Math.round((totalHave / totalCards) * 100) : 0;

            return (
              <div key={seriesName} className="space-y-3">
                {/* Series header */}
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl border-3 border-[#111]"
                  style={{
                    background: `linear-gradient(135deg, ${config.color}22, ${config.color}44)`,
                    borderColor: config.accent,
                    boxShadow: `3px 3px 0 ${config.accent}`,
                  }}
                >
                  <div>
                    <h2 className="font-black text-lg text-[#111]">{seriesName}</h2>
                    <p className="text-xs text-[#555]">
                      {seriesSets.length} set{seriesSets.length !== 1 ? "s" : ""} &middot;{" "}
                      {totalCards} cards &middot;{" "}
                      {seriesSets[0].year}
                      {seriesSets[seriesSets.length - 1].year !== seriesSets[0].year
                        ? `–${seriesSets[seriesSets.length - 1].year}`
                        : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#111]">{overallPct}%</p>
                    <div className="w-20 h-1.5 bg-[#111]/10 rounded-full overflow-hidden mt-0.5">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${overallPct}%`, background: config.color }}
                      />
                    </div>
                  </div>
                </div>

                {/* Sets grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {seriesSets.map((set) => {
                    const have = haveCounts[set.id] ?? 0;
                    const pct = set.total_cards > 0 ? Math.round((have / set.total_cards) * 100) : 0;
                    const cover = getCover(set);

                    return (
                      <Link key={set.id} href={`/sets/${set.id}`}>
                        <div className="gpk-card-tile group cursor-pointer h-full">
                          {/* Cover image */}
                          <div className="relative h-[120px] overflow-hidden bg-[#e8dcc8]">
                            {cover ? (
                              <img
                                src={cover}
                                alt={set.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                              />
                            ) : (
                              <div
                                className="w-full h-full flex items-center justify-center text-3xl font-black"
                                style={{ color: config.color + "66" }}
                              >
                                {set.name.replace(/^(Original |All New |Flashback |Brand New |Chrome )Series /, "").replace("Edition ", "")}
                              </div>
                            )}
                            {/* Year badge */}
                            <div className="absolute top-1.5 right-1.5 bg-[#111]/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              {set.year}
                            </div>
                            {/* Complete badge */}
                            {pct === 100 && (
                              <div
                                className="absolute top-1.5 left-1.5 text-[#111] text-[9px] font-black px-1.5 py-0.5 rounded"
                                style={{ background: config.color }}
                              >
                                COMPLETE
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-2.5">
                            <p className="font-bold text-xs text-[#111] leading-tight truncate">
                              {set.name}
                            </p>
                            <p className="text-[10px] text-[#777] mt-0.5">
                              {set.total_cards} cards
                            </p>

                            {/* Progress */}
                            <div className="mt-1.5 flex items-center gap-1.5">
                              <div className="flex-1 h-1 bg-[#111]/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{ width: `${pct}%`, background: config.color }}
                                />
                              </div>
                              <span className="text-[9px] font-bold text-[#555]">{pct}%</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
