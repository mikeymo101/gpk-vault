// Master seed script: GPK Original Series 1-15
// Reads the CSV and seeds all sets + cards into Supabase
// Run with: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-all.ts

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// OS set boundaries (card number ranges)
const setDefinitions: { name: string; year: number; startCard: number; endCard: number }[] = [
  { name: "Original Series 1", year: 1985, startCard: 1, endCard: 41 },
  { name: "Original Series 2", year: 1985, startCard: 42, endCard: 83 },
  { name: "Original Series 3", year: 1986, startCard: 84, endCard: 127 },
  { name: "Original Series 4", year: 1986, startCard: 128, endCard: 167 },
  { name: "Original Series 5", year: 1986, startCard: 168, endCard: 209 },
  { name: "Original Series 6", year: 1986, startCard: 210, endCard: 248 },
  { name: "Original Series 7", year: 1987, startCard: 249, endCard: 292 },
  { name: "Original Series 8", year: 1987, startCard: 293, endCard: 334 },
  { name: "Original Series 9", year: 1987, startCard: 335, endCard: 378 },
  { name: "Original Series 10", year: 1987, startCard: 379, endCard: 418 },
  { name: "Original Series 11", year: 1987, startCard: 419, endCard: 458 },
  { name: "Original Series 12", year: 1988, startCard: 459, endCard: 498 },
  { name: "Original Series 13", year: 1988, startCard: 499, endCard: 540 },
  { name: "Original Series 14", year: 1988, startCard: 541, endCard: 582 },
  { name: "Original Series 15", year: 1988, startCard: 583, endCard: 620 },
];

interface ParsedCard {
  number: string;
  nameA: string;
  nameB: string | null;
}

function parseCSV(filePath: string): ParsedCard[] {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.trim().split("\n");
  const cards: ParsedCard[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Format: "1a Nasty NICK / 1b Evil EDDIE"
    // or just "551b Sis Boom BONNIE" (missing a-side)
    const parts = trimmed.split(" / ");

    let number: string | null = null;
    let nameA: string | null = null;
    let nameB: string | null = null;

    for (const part of parts) {
      const match = part.trim().match(/^(\d+)(a|A)\s+(.+)$/);
      if (match) {
        number = match[1];
        nameA = formatName(match[3]);
      }
      const matchB = part.trim().match(/^(\d+)(b|B)\s+(.+)$/);
      if (matchB) {
        if (!number) number = matchB[1];
        nameB = formatName(matchB[3]);
      }
    }

    if (number && (nameA || nameB)) {
      cards.push({
        number,
        nameA: nameA ?? nameB!,
        nameB,
      });
    }
  }

  return cards;
}

// Convert "Nasty NICK" to "Nasty Nick" (title case the ALL CAPS name)
function formatName(raw: string): string {
  return raw
    .split(/\s+/)
    .map((word) => {
      // If the word is all caps and longer than 1 char, title-case it
      // But preserve words like "N." or single letters, and apostrophe words
      if (word === word.toUpperCase() && word.length > 1 && /^[A-Z]+$/.test(word)) {
        return word.charAt(0) + word.slice(1).toLowerCase();
      }
      // Handle words like "NICK" but also "O'Clock"
      if (word === word.toUpperCase() && word.length > 1) {
        return word.charAt(0) + word.slice(1).toLowerCase();
      }
      return word;
    })
    .join(" ");
}

async function seed() {
  const csvPath = process.argv[2] || `${process.env.HOME}/Downloads/GPK Checklists - All Cards OS1-OS15.csv`;

  console.log(`Reading CSV from: ${csvPath}`);
  const allCards = parseCSV(csvPath);
  console.log(`Parsed ${allCards.length} cards from CSV`);

  // First, delete existing OS1 and OS2 that were seeded earlier (to avoid duplicates)
  for (const setDef of setDefinitions) {
    const { data: existingSet } = await supabase
      .from("sets")
      .select("id")
      .eq("name", setDef.name)
      .single();

    if (existingSet) {
      // Delete cards for this set first (cascade should handle it, but be explicit)
      await supabase.from("cards").delete().eq("set_id", existingSet.id);
      await supabase.from("sets").delete().eq("id", existingSet.id);
      console.log(`Cleared existing ${setDef.name}`);
    }
  }

  // Create all sets
  for (const setDef of setDefinitions) {
    const totalCards = setDef.endCard - setDef.startCard + 1;

    const { data: newSet, error: setError } = await supabase
      .from("sets")
      .insert({
        name: setDef.name,
        year: setDef.year,
        series: "Original Series",
        total_cards: totalCards,
      })
      .select()
      .single();

    if (setError) {
      console.error(`Failed to create ${setDef.name}:`, setError);
      continue;
    }

    // Find cards that belong to this set
    const setCards = allCards.filter((c) => {
      const num = parseInt(c.number);
      return num >= setDef.startCard && num <= setDef.endCard;
    });

    if (setCards.length === 0) {
      console.log(`Warning: No cards found for ${setDef.name}`);
      continue;
    }

    const cardRows = setCards.map((c) => ({
      set_id: newSet.id,
      number: c.number,
      name_a: c.nameA,
      name_b: c.nameB,
      is_parallel: false,
    }));

    // Insert in batches of 50
    for (let i = 0; i < cardRows.length; i += 50) {
      const batch = cardRows.slice(i, i + 50);
      const { error: cardError } = await supabase.from("cards").insert(batch);
      if (cardError) {
        console.error(`Failed to insert cards for ${setDef.name} (batch ${i}):`, cardError);
      }
    }

    console.log(`✓ ${setDef.name} (${setDef.year}): ${setCards.length} cards`);
  }

  console.log("\nDone! All sets seeded.");
}

seed();
