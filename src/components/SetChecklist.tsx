"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Card as GPKCard, UserCard } from "@/types";

type CardStatus = UserCard["status"];

const statusOptions: { value: CardStatus; label: string }[] = [
  { value: "have", label: "Have" },
  { value: "want", label: "Want" },
  { value: "for_trade", label: "Trade" },
];

export function SetChecklist({
  cards,
  userCardMap,
  userId,
}: {
  cards: GPKCard[];
  userCardMap: Record<string, UserCard[]>;
  userId: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  async function toggleStatus(card: GPKCard, status: CardStatus) {
    const key = card.id + status;
    setLoadingKey(key);

    const existing = userCardMap[card.id]?.find((uc) => uc.status === status);

    if (existing) {
      await supabase.from("user_cards").delete().eq("id", existing.id);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("user_cards") as any).insert({
        user_id: userId,
        card_id: card.id,
        status,
        quantity: 1,
      });
    }

    setLoadingKey(null);
    startTransition(() => {
      router.refresh();
    });
  }

  const haveCount = cards.filter((c) =>
    userCardMap[c.id]?.some((uc) => uc.status === "have")
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          Progress: {haveCount} / {cards.length} (
          {cards.length > 0
            ? Math.round((haveCount / cards.length) * 100)
            : 0}
          %)
        </span>
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{
              width: `${cards.length > 0 ? (haveCount / cards.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <div className="border rounded-lg divide-y">
        {cards.map((card) => {
          const entries = userCardMap[card.id] ?? [];
          const statuses = new Set(entries.map((e) => e.status));

          return (
            <div
              key={card.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                {card.image_url_a ? (
                  <img
                    src={card.image_url_a}
                    alt={card.name_a}
                    className="w-12 h-16 object-cover rounded shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-12 h-16 bg-muted rounded shrink-0 flex items-center justify-center text-xs text-muted-foreground">
                    ?
                  </div>
                )}
                <div className="min-w-0">
                  <span className="text-xs font-mono text-muted-foreground">
                    {card.number}
                  </span>
                  <p className="font-medium truncate">{card.name_a}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {statusOptions.map((opt) => {
                  const isActive = statuses.has(opt.value);
                  const btnKey = card.id + opt.value;

                  return (
                    <Button
                      key={opt.value}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className="h-7 px-2 text-xs"
                      disabled={loadingKey === btnKey || isPending}
                      onClick={() => toggleStatus(card, opt.value)}
                    >
                      {isActive && "✓ "}
                      {opt.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
