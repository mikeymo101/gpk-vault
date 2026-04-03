import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TradeMatch {
  match_user_id: string;
  match_username: string;
  match_display_name: string | null;
  they_have_i_want: number;
  i_have_they_want: number;
  total_match_score: number;
}

export default async function TradesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user's want/have counts for context
  const { data: userCards } = await supabase
    .from("user_cards")
    .select("status")
    .eq("user_id", user!.id);

  const ucList = (userCards ?? []) as unknown as { status: string }[];
  const wantCount = ucList.filter((uc) => uc.status === "want").length;
  const haveCount = ucList.filter((uc) => uc.status === "have" || uc.status === "for_trade").length;

  // Find trade matches using the DB function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: matches } = await (supabase.rpc as any)("find_trade_matches", {
    current_user_id: user!.id,
  });

  const tradeMatches = (matches ?? []) as unknown as TradeMatch[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trade Matches</h1>
        <p className="text-muted-foreground">
          Collectors who have what you need — and need what you have
        </p>
      </div>

      {/* User context */}
      <div className="flex gap-4 text-sm">
        <div className="rounded-lg border bg-card px-4 py-2">
          <span className="text-muted-foreground">Your wants: </span>
          <span className="font-bold">{wantCount}</span>
        </div>
        <div className="rounded-lg border bg-card px-4 py-2">
          <span className="text-muted-foreground">Your tradeable: </span>
          <span className="font-bold">{haveCount}</span>
        </div>
      </div>

      {wantCount === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium">No wants listed yet</p>
            <p className="text-muted-foreground mt-1">
              Mark cards as &quot;Want&quot; in set checklists to find trade matches
            </p>
          </CardContent>
        </Card>
      ) : tradeMatches.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium">No matches yet</p>
            <p className="text-muted-foreground mt-1">
              As more collectors join GPK Vault, matches will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {tradeMatches.map((match) => (
            <Link key={match.match_user_id} href={`/u/${match.match_username}`}>
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">
                        {match.match_display_name || match.match_username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{match.match_username}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      {match.they_have_i_want > 0 && (
                        <div>
                          <p className="text-lg font-bold text-green-600">
                            {match.they_have_i_want}
                          </p>
                          <p className="text-[10px] text-muted-foreground leading-tight">
                            cards you need
                          </p>
                        </div>
                      )}
                      {match.i_have_they_want > 0 && (
                        <div>
                          <p className="text-lg font-bold text-blue-600">
                            {match.i_have_they_want}
                          </p>
                          <p className="text-[10px] text-muted-foreground leading-tight">
                            cards they need
                          </p>
                        </div>
                      )}
                      <Badge
                        variant="default"
                        className="text-sm px-3 py-1"
                      >
                        {match.total_match_score} matches
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
