"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ShareWantList({
  username,
  wantCount,
}: {
  username: string;
  wantCount: number;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  function copyLink(type: "wants" | "profile") {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const url =
      type === "wants" ? `${base}/wants/${username}` : `${base}/u/${username}`;
    navigator.clipboard.writeText(url);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {wantCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyLink("wants")}
        >
          {copied === "wants" ? "Copied!" : `Share Want List (${wantCount})`}
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => copyLink("profile")}
      >
        {copied === "profile" ? "Copied!" : "Share Profile"}
      </Button>
    </div>
  );
}
