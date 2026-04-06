// Seeds estimated card values from Wayne's GPK Price Guide (wgpkr.com)
// Values are for ungraded raw cards in good/very good condition
// Run: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-values.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Price per card in cents, by card number range
// Source: wgpkr.com/GPK/PriceGuide/ (Wayne's GPK References)
// These are average raw/ungraded values

interface PriceRule {
  start: number;
  end: number;
  defaultCents: number;
  // Override specific card numbers (without a/b suffix)
  overrides?: Record<string, number>;
}

const priceRules: PriceRule[] = [
  // OS1: 1-41 — glossy avg ~$4.50, matte ~$3.00. Use $3.50 average
  {
    start: 1, end: 41,
    defaultCents: 350,
    overrides: {
      "1": 1500,   // Nasty Nick — $15
      "8": 1500,   // Adam Bomb — $15
      "5": 800,    // Dead Ted / Jay Decay — popular
      "2": 600,    // Junkfood John / Ray Decay
      "10": 500,   // Tee-Vee Stevie / Geeky Gary
      "25": 500,   // Creepy Carol / Scary Carrie
      "33": 500,   // Mad Mike / Savage Stuart
      "41": 500,   // Mean Gene / Joltin' Joe
    },
  },
  // OS2: 42-83 — avg $1.00
  {
    start: 42, end: 83,
    defaultCents: 100,
    overrides: {
      "49": 300,   // Double Heather / Schizo Fran — variant card
      "52": 200,   // Dirty Harry
      "64": 200,   // Hot Scott / Luke Warm
    },
  },
  // OS3: 84-127 — avg $0.15
  { start: 84, end: 127, defaultCents: 15 },
  // OS4: 128-167 — avg $0.15
  { start: 128, end: 167, defaultCents: 15 },
  // OS5: 168-209 — avg $0.15
  { start: 168, end: 209, defaultCents: 15 },
  // OS6: 210-248 — avg $0.15
  { start: 210, end: 248, defaultCents: 15 },
  // OS7: 249-292 — avg $0.15
  {
    start: 249, end: 292,
    defaultCents: 15,
    overrides: {
      "260": 200,  // Adam Boom / Blasted Billy II — Adam Bomb sequel
    },
  },
  // OS8: 293-334 — avg $0.15
  { start: 293, end: 334, defaultCents: 15 },
  // OS9: 335-378 — avg $0.15
  {
    start: 335, end: 378,
    defaultCents: 15,
    overrides: {
      "355": 20000, // Semi Colin error card — $200
    },
  },
  // OS10: 379-418 — avg $0.15
  { start: 379, end: 418, defaultCents: 15 },
  // OS11: 419-458 — avg $0.15
  { start: 419, end: 458, defaultCents: 15 },
  // OS12: 459-498 — avg $0.15
  { start: 459, end: 498, defaultCents: 15 },
  // OS13: 499-540 — avg $0.15
  { start: 499, end: 540, defaultCents: 15 },
  // OS14: 541-582 — avg $0.15
  { start: 541, end: 582, defaultCents: 15 },
  // OS15: 583-620 — avg $0.15
  {
    start: 583, end: 620,
    defaultCents: 15,
    overrides: {
      "620": 500,  // Blasted Betty / ADA Bomb — last card, eyelash error variant
    },
  },
];

function getValueCents(cardNumber: string): number {
  // Parse "8a" -> baseNum 8
  const match = cardNumber.match(/^(\d+)/);
  if (!match) return 15;
  const baseNum = parseInt(match[1]);

  for (const rule of priceRules) {
    if (baseNum >= rule.start && baseNum <= rule.end) {
      // Check overrides first
      if (rule.overrides && rule.overrides[String(baseNum)]) {
        return rule.overrides[String(baseNum)];
      }
      return rule.defaultCents;
    }
  }
  return 15; // fallback
}

async function seedValues() {
  console.log("Seeding card values from Wayne's GPK Price Guide...\n");

  const { data: cards, error } = await supabase
    .from("cards")
    .select("id, number")
    .eq("is_parallel", false);

  if (error || !cards) {
    console.error("Failed to fetch cards:", error);
    process.exit(1);
  }

  let updated = 0;
  let totalValue = 0;

  // Batch update in groups of 50
  for (let i = 0; i < cards.length; i += 50) {
    const batch = cards.slice(i, i + 50);

    for (const card of batch) {
      const valueCents = getValueCents(card.number);
      totalValue += valueCents;

      const { error: updateError } = await supabase
        .from("cards")
        .update({ estimated_value_cents: valueCents })
        .eq("id", card.id);

      if (!updateError) updated++;
    }
  }

  console.log(`✓ Updated ${updated} cards with estimated values`);
  console.log(`  Total catalog value: $${(totalValue / 100).toFixed(2)}`);
  console.log(`  Average per card: $${(totalValue / cards.length / 100).toFixed(2)}`);
  console.log("\nSource: wgpkr.com/GPK/PriceGuide/");
  console.log("Values are for ungraded raw cards in good/VG condition.");
}

seedValues();
