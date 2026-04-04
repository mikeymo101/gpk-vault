"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserCard } from "@/types";

const conditionOptions = [
  "Mint",
  "Near Mint",
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Poor",
  "PSA Graded",
  "BGS Graded",
  "CGC Graded",
  "SGC Graded",
];

const gradeOptions = [
  "10", "9.5", "9", "8.5", "8", "7.5", "7", "6.5", "6",
  "5.5", "5", "4.5", "4", "3.5", "3", "2.5", "2", "1.5", "1",
];

export function InlineCardDetails({
  entry,
  onClose,
}: {
  entry: UserCard;
  onClose: () => void;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);

  const [condition, setCondition] = useState(entry.condition ?? "");
  const [grade, setGrade] = useState(entry.grade ?? "");
  const [notes, setNotes] = useState(entry.notes ?? "");
  const [pricePaid, setPricePaid] = useState(
    entry.price_paid_cents ? (entry.price_paid_cents / 100).toFixed(2) : ""
  );

  const isGraded = condition.includes("Graded");

  async function handleSave() {
    setSaving(true);

    const paidCents = pricePaid ? Math.round(parseFloat(pricePaid) * 100) : null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("user_cards") as any)
      .update({
        condition: condition || null,
        grade: isGraded && grade ? grade : null,
        notes: notes || null,
        price_paid_cents: paidCents,
      })
      .eq("id", entry.id);

    setSaving(false);
    startTransition(() => {
      router.refresh();
    });
    onClose();
  }

  return (
    <div className="bg-[#f4ece0] border border-[#d4c0a8] rounded-lg p-3 mt-1 mb-1 space-y-2.5 animate-in slide-in-from-top-1 duration-200">
      <div className="grid grid-cols-2 gap-2">
        {/* Condition */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#8a7a6a] mb-0.5 block">
            Condition
          </label>
          <Select value={condition} onValueChange={(v) => setCondition(v ?? "")}>
            <SelectTrigger className="h-8 text-xs bg-white/80 border-[#d4c0a8]">
              <SelectValue placeholder="Select..." />
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

        {/* Grade — only when graded condition selected */}
        {isGraded ? (
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wide text-[#8a7a6a] mb-0.5 block">
              Grade
            </label>
            <Select value={grade} onValueChange={(v) => setGrade(v ?? "")}>
              <SelectTrigger className="h-8 text-xs bg-white/80 border-[#d4c0a8]">
                <SelectValue placeholder="Grade..." />
              </SelectTrigger>
              <SelectContent>
                {gradeOptions.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wide text-[#8a7a6a] mb-0.5 block">
              Paid
            </label>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[#8a7a6a]">$</span>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={pricePaid}
                onChange={(e) => setPricePaid(e.target.value)}
                className="h-8 text-xs bg-white/80 border-[#d4c0a8] pl-5"
              />
            </div>
          </div>
        )}
      </div>

      {/* Paid field when graded (moves down) */}
      {isGraded && (
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#8a7a6a] mb-0.5 block">
            Paid
          </label>
          <div className="relative w-1/2">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[#8a7a6a]">$</span>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={pricePaid}
              onChange={(e) => setPricePaid(e.target.value)}
              className="h-8 text-xs bg-white/80 border-[#d4c0a8] pl-5"
            />
          </div>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-wide text-[#8a7a6a] mb-0.5 block">
          Notes
        </label>
        <Input
          placeholder="e.g. creased corner, duplicate, centered..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="h-8 text-xs bg-white/80 border-[#d4c0a8]"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs border-[#d4c0a8] text-[#6b5d4d]"
          onClick={onClose}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          className="h-7 text-xs bg-gradient-to-b from-[#5a9a4a] to-[#3a7a2a] text-white border-0"
          onClick={handleSave}
          disabled={saving || isPending}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
