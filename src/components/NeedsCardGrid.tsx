"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Card as GPKCard } from "@/types";

export function NeedsCardGrid({
  cards,
  userId,
}: {
  cards: GPKCard[];
  userId: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());

  async function markAsHave(card: GPKCard) {
    setAddingId(card.id);

    // Remove any "want" entry for this card since we now have it
    await supabase.from("user_cards")
      .delete()
      .eq("user_id", userId)
      .eq("card_id", card.id)
      .eq("status", "want");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("user_cards") as any).insert({
      user_id: userId,
      card_id: card.id,
      status: "have",
      quantity: 1,
    });

    setAddingId(null);
    setJustAdded((prev) => new Set(prev).add(card.id));
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
      {cards.map((card) => {
        const added = justAdded.has(card.id);
        const loading = addingId === card.id;

        return (
          <button
            key={card.id}
            onClick={() => !added && !loading && markAsHave(card)}
            disabled={added || loading || isPending}
            className={`relative rounded-lg overflow-hidden border-2 transition-all text-left ${
              added
                ? "border-green-500 opacity-100"
                : "border-red-300 opacity-70 hover:opacity-100 hover:border-green-400 cursor-pointer"
            }`}
          >
            {card.image_url_a ? (
              <img
                src={card.image_url_a}
                alt={card.name_a}
                className={`w-full aspect-[3/4] object-cover transition-all ${
                  added ? "" : "grayscale hover:grayscale-0"
                }`}
                loading="lazy"
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center text-[10px]">
                {card.number}
              </div>
            )}

            {/* Card info bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[9px] px-1 py-0.5 text-center truncate">
              {card.number} {card.name_a}
            </div>

            {/* "Got it" overlay when added */}
            {added && (
              <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center">
                <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  GOT IT
                </span>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white text-[10px]">Adding...</span>
              </div>
            )}

            {/* Tap hint */}
            {!added && !loading && (
              <div className="absolute top-0 right-0 bg-green-600 text-white text-[8px] font-bold px-1 py-0.5 rounded-bl opacity-0 hover:opacity-100 transition-opacity">
                + HAVE
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
