"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import type { Card as GPKCard, Set } from "@/types";

type CardWithSet = GPKCard & { sets: Set };

export function SearchResults({
  query,
  results,
}: {
  query: string;
  results: CardWithSet[];
}) {
  const router = useRouter();
  const [value, setValue] = useState(query);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <Input
          type="search"
          placeholder="Search by card name or number (e.g. 'Adam Bomb' or '8a')..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="max-w-lg"
          autoFocus
        />
      </form>

      {query && (
        <p className="text-sm text-muted-foreground">
          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
        </p>
      )}

      {results.length > 0 && (
        <div className="border rounded-lg divide-y">
          {results.map((card) => (
            <Link
              key={card.id}
              href={`/sets/${card.set_id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors"
            >
              {card.image_url_a ? (
                <img
                  src={card.image_url_a}
                  alt={card.name_a}
                  className="w-10 h-14 object-cover rounded shrink-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-10 h-14 bg-muted rounded shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">
                  <span className="text-xs font-mono text-muted-foreground mr-2">
                    {card.number}
                  </span>
                  {card.name_a}
                </p>
              </div>
              <Badge variant="outline" className="shrink-0">
                {card.sets.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {query && query.length >= 2 && results.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No cards found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
