import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Profile, UserCard, Card as GPKCard, Set } from "@/types";

type WantCardWithDetails = UserCard & { cards: GPKCard & { sets: Set } };

export default async function PublicWantListPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  const profile = profileData as unknown as Profile | null;
  if (!profile) notFound();

  const { data: wantData } = await supabase
    .from("user_cards")
    .select("*, cards(*, sets(*))")
    .eq("user_id", profile.id)
    .eq("status", "want")
    .order("created_at", { ascending: false });

  const wants = (wantData ?? []) as unknown as WantCardWithDetails[];

  // Group by set
  const bySet = new Map<string, { set: Set; cards: WantCardWithDetails[] }>();
  for (const w of wants) {
    const setId = w.cards.sets.id;
    if (!bySet.has(setId)) {
      bySet.set(setId, { set: w.cards.sets, cards: [] });
    }
    bySet.get(setId)!.cards.push(w);
  }

  const parseNum = (n: string) => {
    const match = n.match(/^(\d+)([ab]?)$/i);
    return { num: parseInt(match?.[1] ?? "0"), variant: (match?.[2] ?? "").toLowerCase() };
  };

  return (
    <div className="min-h-screen gpk-wallpaper">
      <div className="container mx-auto px-3 sm:px-4 py-6 max-w-4xl">
        <div className="rounded-2xl border-4 border-[#d4a0b0]/60 bg-[#e8dcc8]/95 shadow-xl p-4 sm:p-6 space-y-6 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {profile.display_name || profile.username}&apos;s Want List
          </h1>
          <p className="text-muted-foreground">
            @{profile.username} needs {wants.length} card{wants.length !== 1 ? "s" : ""}
          </p>
          <p className="text-sm text-muted-foreground">
            Have something they need?{" "}
            <Link href="/signup" className="text-primary underline">
              Join GPK Vault
            </Link>{" "}
            to propose a trade
          </p>
        </div>

        {wants.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No cards on the want list right now
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Array.from(bySet.values())
              .sort((a, b) => a.set.year - b.set.year)
              .map(({ set, cards }) => (
                <div key={set.id} className="space-y-2">
                  <h2 className="font-semibold">
                    {set.name}{" "}
                    <Badge variant="outline" className="ml-1">
                      {cards.length} needed
                    </Badge>
                  </h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {cards
                      .sort((a, b) => {
                        const av = parseNum(a.cards.number);
                        const bv = parseNum(b.cards.number);
                        if (av.num !== bv.num) return av.num - bv.num;
                        return av.variant.localeCompare(bv.variant);
                      })
                      .map((w) => (
                        <div
                          key={w.id}
                          className="relative rounded-lg overflow-hidden border-2 border-blue-400"
                        >
                          {w.cards.image_url_a ? (
                            <img
                              src={w.cards.image_url_a}
                              alt={w.cards.name_a}
                              className="w-full aspect-[3/4] object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center text-[10px]">
                              {w.cards.number}
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[9px] px-1 py-0.5 text-center truncate">
                            {w.cards.number} {w.cards.name_a}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="text-center pt-4">
          <Link href="/" className="text-sm gpk-muted hover:underline">
            GPK Vault — Track your Garbage Pail Kids collection
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
