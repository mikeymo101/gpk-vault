"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Card as GPKCard, UserCard } from "@/types";

type CardStatus = UserCard["status"];

const statusOptions: { value: CardStatus; label: string }[] = [
  { value: "have", label: "Have" },
  { value: "want", label: "Want" },
  { value: "for_trade", label: "For Trade" },
  { value: "for_sale", label: "For Sale" },
];

const conditionOptions = [
  "Mint",
  "Near Mint",
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Poor",
];

export function CardDetailModal({
  card,
  userEntries,
  userId,
  open,
  onClose,
}: {
  card: GPKCard;
  userEntries: UserCard[];
  userId: string;
  open: boolean;
  onClose: () => void;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState(userEntries[0]?.notes ?? "");
  const [condition, setCondition] = useState(userEntries[0]?.condition ?? "");
  const [savingNotes, setSavingNotes] = useState(false);

  const statuses = new Set(userEntries.map((e) => e.status));

  async function toggleStatus(status: CardStatus) {
    const existing = userEntries.find((uc) => uc.status === status);

    if (existing) {
      await supabase.from("user_cards").delete().eq("id", existing.id);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("user_cards") as any).insert({
        user_id: userId,
        card_id: card.id,
        status,
        quantity: 1,
        notes: notes || null,
        condition: condition || null,
      });
    }

    startTransition(() => {
      router.refresh();
    });
  }

  async function saveDetails() {
    if (userEntries.length === 0) return;
    setSavingNotes(true);

    for (const entry of userEntries) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("user_cards") as any)
        .update({
          notes: notes || null,
          condition: condition || null,
        })
        .eq("id", entry.id);
    }

    setSavingNotes(false);
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogTitle className="sr-only">
          {card.number} — {card.name_a}
        </DialogTitle>

        {/* Card image */}
        <div className="relative bg-gradient-to-b from-black/90 to-black/70 overflow-hidden">
          {card.image_url_a ? (
            <img
              src={card.image_url_a}
              alt={card.name_a}
              className="w-full max-h-[65vh] object-contain mx-auto drop-shadow-2xl"
            />
          ) : (
            <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>

        <div className="p-4 space-y-4">
          {/* Card info */}
          <div>
            <p className="text-xs font-mono text-muted-foreground">
              {card.number}
            </p>
            <h3 className="text-lg font-bold">{card.name_a}</h3>
          </div>

          {/* Status buttons */}
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((opt) => {
              const isActive = statuses.has(opt.value);
              return (
                <Button
                  key={opt.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  disabled={isPending}
                  onClick={() => toggleStatus(opt.value)}
                >
                  {isActive && "✓ "}
                  {opt.label}
                </Button>
              );
            })}
          </div>

          {/* Quantity controls for "have" cards */}
          {(() => {
            const haveEntry = userEntries.find((e) => e.status === "have");
            if (!haveEntry) return null;
            return (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Quantity:</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={isPending}
                    onClick={async () => {
                      const newQty = haveEntry.quantity - 1;
                      if (newQty <= 0) {
                        await supabase.from("user_cards").delete().eq("id", haveEntry.id);
                      } else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        await (supabase.from("user_cards") as any)
                          .update({ quantity: newQty })
                          .eq("id", haveEntry.id);
                      }
                      startTransition(() => { router.refresh(); });
                    }}
                  >
                    -
                  </Button>
                  <span className="text-lg font-bold w-8 text-center">
                    {haveEntry.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={isPending}
                    onClick={async () => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      await (supabase.from("user_cards") as any)
                        .update({ quantity: haveEntry.quantity + 1 })
                        .eq("id", haveEntry.id);
                      startTransition(() => { router.refresh(); });
                    }}
                  >
                    +
                  </Button>
                </div>
                {haveEntry.quantity > 1 && (
                  <span className="text-xs text-muted-foreground">
                    ({haveEntry.quantity - 1} duplicate{haveEntry.quantity > 2 ? "s" : ""})
                  </span>
                )}
              </div>
            );
          })()}

          {/* Condition + Notes (only show if user has at least one status) */}
          {userEntries.length > 0 && (
            <div className="space-y-3 border-t pt-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Condition
                </label>
                <Select value={condition} onValueChange={(v) => setCondition(v ?? "")}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select condition..." />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionOptions.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Notes
                </label>
                <Input
                  placeholder="e.g. creased corner, duplicate..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Button
                size="sm"
                className="w-full"
                disabled={savingNotes || isPending}
                onClick={saveDetails}
              >
                {savingNotes ? "Saving..." : "Save Details"}
              </Button>
            </div>
          )}

          {/* Current statuses */}
          {userEntries.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {userEntries.map((uc) => (
                <Badge key={uc.id} variant="outline" className="text-xs">
                  {uc.status} {uc.condition && `· ${uc.condition}`}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
