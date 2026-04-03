"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { UserCardWithDetails } from "@/types";

const statusLabels = {
  have: "Have",
  want: "Want",
  for_sale: "For Sale",
  for_trade: "For Trade",
} as const;

const statusColors = {
  have: "default",
  want: "secondary",
  for_sale: "destructive",
  for_trade: "outline",
} as const;

export function CollectionView({
  userCards,
}: {
  userCards: UserCardWithDetails[];
}) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? userCards
      : userCards.filter((uc) => uc.status === activeTab);

  if (userCards.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-lg font-medium">Your collection is empty</p>
          <p className="text-muted-foreground mt-1">
            Browse sets and start adding cards to your collection
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">All ({userCards.length})</TabsTrigger>
        <TabsTrigger value="have">
          Have ({userCards.filter((uc) => uc.status === "have").length})
        </TabsTrigger>
        <TabsTrigger value="want">
          Want ({userCards.filter((uc) => uc.status === "want").length})
        </TabsTrigger>
        <TabsTrigger value="for_trade">
          Trade ({userCards.filter((uc) => uc.status === "for_trade").length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((uc) => (
            <Card key={uc.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      #{uc.cards.number} — {uc.cards.name_a}
                    </p>
                    {uc.cards.name_b && (
                      <p className="text-sm text-muted-foreground truncate">
                        / {uc.cards.name_b}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {uc.cards.sets.name}
                    </p>
                  </div>
                  <Badge variant={statusColors[uc.status]}>
                    {statusLabels[uc.status]}
                  </Badge>
                </div>
                {uc.quantity > 1 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Qty: {uc.quantity}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
