"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardDetailModal } from "@/components/CardDetailModal";
import { InlineCardDetails } from "@/components/InlineCardDetails";
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
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedCard, setSelectedCard] = useState<GPKCard | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  async function toggleStatus(card: GPKCard, status: CardStatus) {
    const key = card.id + status;
    setLoadingKey(key);

    const existing = userCardMap[card.id]?.find((uc) => uc.status === status);

    if (existing) {
      await supabase.from("user_cards").delete().eq("id", existing.id);
    } else {
      // When marking as "have", auto-remove "want" since you got it
      if (status === "have") {
        const wantEntry = userCardMap[card.id]?.find((uc) => uc.status === "want");
        if (wantEntry) {
          await supabase.from("user_cards").delete().eq("id", wantEntry.id);
        }
      }

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

  async function updateQuantity(entryId: string, delta: number) {
    setLoadingKey(entryId + "qty");
    const entry = Object.values(userCardMap)
      .flat()
      .find((uc) => uc.id === entryId);
    if (!entry) return;

    const newQty = entry.quantity + delta;
    if (newQty <= 0) {
      await supabase.from("user_cards").delete().eq("id", entryId);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("user_cards") as any)
        .update({ quantity: newQty })
        .eq("id", entryId);
    }

    setLoadingKey(null);
    startTransition(() => { router.refresh(); });
  }

  const [bulkLoading, setBulkLoading] = useState(false);

  async function bulkMarkAll(status: CardStatus) {
    if (!confirm(`Mark all ${cards.length} cards as "${status}"?`)) return;
    setBulkLoading(true);

    // Find cards that don't already have this status
    const toInsert = cards.filter(
      (c) => !(userCardMap[c.id] ?? []).some((uc) => uc.status === status)
    );

    // Insert in batches of 50
    for (let i = 0; i < toInsert.length; i += 50) {
      const batch = toInsert.slice(i, i + 50).map((c) => ({
        user_id: userId,
        card_id: c.id,
        status,
        quantity: 1,
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("user_cards") as any).insert(batch);
    }

    setBulkLoading(false);
    startTransition(() => { router.refresh(); });
  }

  async function bulkClearAll() {
    if (!confirm("Reset this set? This will remove all Have/Want/Trade entries and quantities for every card in this set.")) return;
    setBulkLoading(true);

    const allEntryIds = cards.flatMap(
      (c) => (userCardMap[c.id] ?? []).map((uc) => uc.id)
    );

    for (let i = 0; i < allEntryIds.length; i += 50) {
      const batch = allEntryIds.slice(i, i + 50);
      await supabase.from("user_cards").delete().in("id", batch);
    }

    setBulkLoading(false);
    startTransition(() => { router.refresh(); });
  }

  const haveCount = cards.filter((c) =>
    userCardMap[c.id]?.some((uc) => uc.status === "have")
  ).length;

  return (
    <div className="space-y-4">
      {/* Bulk actions */}
      <div className="flex flex-wrap items-center gap-2 text-amber-900/60 dark:text-amber-200/60">
        <span className="text-xs font-bold uppercase tracking-wide mr-1">Bulk:</span>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          disabled={bulkLoading || isPending}
          onClick={() => bulkMarkAll("have")}
        >
          All Have
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          disabled={bulkLoading || isPending}
          onClick={() => bulkMarkAll("want")}
        >
          All Want
        </Button>
        <div className="flex-1" />
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          disabled={bulkLoading || isPending}
          onClick={bulkClearAll}
        >
          Reset Set
        </Button>
      </div>

      {/* Progress bar + view toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-1">
          <span className="shrink-0">
            {haveCount} / {cards.length} (
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
        <div className="flex gap-1">
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 px-2"
            onClick={() => setView("list")}
          >
            List
          </Button>
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 px-2"
            onClick={() => setView("grid")}
          >
            Grid
          </Button>
        </div>
      </div>

      {/* List view */}
      {view === "list" && (
        <div className="rounded-lg overflow-hidden">
          {cards.map((card) => {
            const entries = userCardMap[card.id] ?? [];
            const statuses = new Set(entries.map((e) => e.status));
            const isOwned = statuses.has("have");

            const haveEntry = entries.find((e) => e.status === "have");
            const hasDetails = haveEntry && (haveEntry.condition || haveEntry.notes || haveEntry.grade);
            const isExpanded = expandedCardId === card.id;

            return (
              <div key={card.id} className="border-b border-amber-200/20 dark:border-amber-800/10">
                <div
                  className={`gpk-checklist-row flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-2 transition-colors ${
                    isOwned ? "bg-green-50/50 dark:bg-green-950/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <button
                      className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer"
                      onClick={() => setSelectedCard(card)}
                    >
                      {card.image_url_a ? (
                        <img
                          src={card.image_url_a}
                          alt={card.name_a}
                          className="w-10 h-14 sm:w-12 sm:h-16 object-cover rounded shrink-0"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-10 h-14 sm:w-12 sm:h-16 bg-muted rounded shrink-0 flex items-center justify-center text-xs text-muted-foreground">
                          ?
                        </div>
                      )}
                      <div className="min-w-0 text-left">
                        <span className="text-xs font-mono text-muted-foreground">
                          {card.number}
                        </span>
                        <p className="font-medium truncate text-sm sm:text-base">
                          {card.name_a}
                        </p>
                        {/* Detail summary line */}
                        {haveEntry && hasDetails && (
                          <p className="text-[10px] text-[#8a7a6a] truncate">
                            {[
                              haveEntry.condition,
                              haveEntry.grade ? `Grade: ${haveEntry.grade}` : null,
                              haveEntry.price_paid_cents ? `Paid: $${(haveEntry.price_paid_cents / 100).toFixed(2)}` : null,
                            ].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                    {/* Detail indicator / expand button for "have" cards */}
                    {haveEntry && (
                      <button
                        onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] transition-colors mr-0.5 ${
                          hasDetails
                            ? "bg-green-600 text-white"
                            : "bg-[#d4c0a8] text-[#6b5d4d] hover:bg-[#c4b098]"
                        }`}
                        title={hasDetails ? "Edit details" : "Add details"}
                      >
                        {hasDetails ? "✓" : "…"}
                      </button>
                    )}

                    {/* Quantity controls */}
                    {haveEntry && (
                      <div className="flex items-center gap-0.5 mr-0.5 sm:mr-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-xs"
                          disabled={loadingKey === haveEntry.id + "qty" || isPending}
                          onClick={() => updateQuantity(haveEntry.id, -1)}
                        >
                          -
                        </Button>
                        <span className="text-xs font-mono w-5 text-center">
                          {haveEntry.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-xs"
                          disabled={loadingKey === haveEntry.id + "qty" || isPending}
                          onClick={() => updateQuantity(haveEntry.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                    )}

                    {/* Status buttons */}
                    {statusOptions.map((opt) => {
                      const isActive = statuses.has(opt.value);
                      const btnKey = card.id + opt.value;

                      return (
                        <Button
                          key={opt.value}
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          className="h-7 px-1.5 sm:px-2 text-xs"
                          disabled={loadingKey === btnKey || isPending}
                          onClick={() => toggleStatus(card, opt.value)}
                        >
                          {isActive && "✓ "}
                          <span className="hidden sm:inline">{opt.label}</span>
                          <span className="sm:hidden">{opt.label[0]}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Inline detail panel */}
                {isExpanded && haveEntry && (
                  <div className="px-2 sm:px-3 pb-2">
                    <InlineCardDetails
                      entry={haveEntry}
                      onClose={() => setExpandedCardId(null)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {cards.map((card) => {
            const entries = userCardMap[card.id] ?? [];
            const statuses = new Set(entries.map((e) => e.status));
            const isHave = statuses.has("have");
            const isWant = statuses.has("want");
            const isTrade = statuses.has("for_trade");
            const haveEntry = entries.find((e) => e.status === "have");
            const qty = haveEntry?.quantity ?? 0;

            return (
              <div
                key={card.id}
                className={`relative rounded-lg overflow-hidden border-2 transition-colors cursor-pointer group ${
                  isHave
                    ? "border-green-500"
                    : isWant
                      ? "border-blue-500"
                      : isTrade
                        ? "border-amber-500"
                        : "border-transparent opacity-60"
                }`}
              >
                <div onClick={() => setSelectedCard(card)}>
                {card.image_url_a ? (
                  <img
                    src={card.image_url_a}
                    alt={card.name_a}
                    className="w-full aspect-[3/4] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground text-center px-1">
                      {card.number}
                    </span>
                  </div>
                )}

                {/* Card number overlay */}
                <div className="absolute top-0 left-0 bg-black/60 text-white text-[10px] font-mono px-1 py-0.5 rounded-br">
                  {card.number}
                </div>

                {/* Status indicator dots */}
                {(isHave || isWant || isTrade) && (
                  <div className="absolute top-0 right-0 flex gap-0.5 p-0.5">
                    {isHave && <div className="w-2 h-2 rounded-full bg-green-500" />}
                    {isWant && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    {isTrade && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                  </div>
                )}

                {/* Duplicate count badge */}
                {qty > 1 && (
                  <div className="absolute bottom-0 right-0 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl">
                    x{qty}
                  </div>
                )}

                </div>
                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                  <p className="text-white text-[10px] text-center font-medium leading-tight mb-1 line-clamp-2">
                    {card.name_a}
                  </p>
                  {statusOptions.map((opt) => {
                    const isActive = statuses.has(opt.value);
                    const btnKey = card.id + opt.value;

                    return (
                      <Button
                        key={opt.value}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        className="h-6 px-2 text-[10px] w-full"
                        disabled={loadingKey === btnKey || isPending}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(card, opt.value);
                        }}
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
      )}

      {/* Card detail modal */}
      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          userEntries={userCardMap[selectedCard.id] ?? []}
          userId={userId}
          open={!!selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
