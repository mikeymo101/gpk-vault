import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Profile, UserCard, Card as GPKCard, Set } from "@/types";

type UserCardWithCard = UserCard & { cards: GPKCard & { sets: Set } };

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  // Find the profile
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  const profile = profileData as unknown as Profile | null;
  if (!profile) notFound();

  // Fetch their collection
  const { data: ucData } = await supabase
    .from("user_cards")
    .select("*, cards(*, sets(*))")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  const userCards = (ucData ?? []) as unknown as UserCardWithCard[];

  const haveCount = userCards.filter((uc) => uc.status === "have").length;
  const wantCount = userCards.filter((uc) => uc.status === "want").length;
  const tradeCount = userCards.filter((uc) => uc.status === "for_trade").length;
  const saleCount = userCards.filter((uc) => uc.status === "for_sale").length;

  // Group by set
  const bySet = new Map<string, { set: Set; cards: UserCardWithCard[] }>();
  for (const uc of userCards) {
    const setId = uc.cards.sets.id;
    if (!bySet.has(setId)) {
      bySet.set(setId, { set: uc.cards.sets, cards: [] });
    }
    bySet.get(setId)!.cards.push(uc);
  }

  return (
    <div className="min-h-screen gpk-wallpaper">
      <div className="container mx-auto px-3 sm:px-4 py-6 max-w-4xl">
        <div className="rounded-2xl border-4 border-[#d4a0b0]/60 bg-[#e8dcc8]/95 shadow-xl p-4 sm:p-6 space-y-6 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {profile.display_name || profile.username}
          </h1>
          <p className="text-muted-foreground">@{profile.username}</p>
          {profile.bio && (
            <p className="text-sm max-w-md mx-auto">{profile.bio}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Have" count={haveCount} />
          <StatCard label="Want" count={wantCount} />
          <StatCard label="Trade" count={tradeCount} />
          <StatCard label="Sale" count={saleCount} />
        </div>

        {/* Collection by set */}
        {userCards.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                This collector hasn&apos;t added any cards yet
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Array.from(bySet.values())
              .sort((a, b) => a.set.year - b.set.year)
              .map(({ set, cards }) => (
                <div key={set.id} className="space-y-2">
                  <h2 className="font-semibold">
                    {set.name}{" "}
                    <span className="text-sm text-muted-foreground font-normal">
                      ({set.year})
                    </span>
                  </h2>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5">
                    {cards
                      .sort((a, b) => {
                        const parseNum = (n: string) => {
                          const match = n.match(/^(\d+)([ab]?)$/i);
                          return {
                            num: parseInt(match?.[1] ?? "0"),
                            variant: (match?.[2] ?? "").toLowerCase(),
                          };
                        };
                        const av = parseNum(a.cards.number);
                        const bv = parseNum(b.cards.number);
                        if (av.num !== bv.num) return av.num - bv.num;
                        return av.variant.localeCompare(bv.variant);
                      })
                      .map((uc) => (
                        <div
                          key={uc.id}
                          className={`relative rounded overflow-hidden border-2 ${
                            uc.status === "have"
                              ? "border-green-500"
                              : uc.status === "want"
                                ? "border-blue-500"
                                : uc.status === "for_trade"
                                  ? "border-amber-500"
                                  : "border-red-500"
                          }`}
                        >
                          {uc.cards.image_url_a ? (
                            <img
                              src={uc.cards.image_url_a}
                              alt={uc.cards.name_a}
                              className="w-full aspect-[3/4] object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                              {uc.cards.number}
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5 text-center truncate">
                            {uc.cards.number}
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

function StatCard({ label, count }: { label: string; count: number }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-center">
      <p className="text-xl font-bold">{count}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
