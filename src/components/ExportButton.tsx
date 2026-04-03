"use client";

import { Button } from "@/components/ui/button";
import type { UserCardWithDetails } from "@/types";

export function ExportButton({
  userCards,
}: {
  userCards: UserCardWithDetails[];
}) {
  function exportCSV() {
    const headers = ["Number", "Name", "Set", "Status", "Quantity", "Condition", "Notes"];
    const rows = userCards.map((uc) => [
      uc.cards.number,
      uc.cards.name_a,
      uc.cards.sets.name,
      uc.status,
      uc.quantity,
      uc.condition ?? "",
      uc.notes ?? "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gpk-collection-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (userCards.length === 0) return null;

  return (
    <Button variant="outline" size="sm" onClick={exportCSV}>
      Export CSV
    </Button>
  );
}
