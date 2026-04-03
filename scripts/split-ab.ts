// Splits every card with A/B variants into two separate DB rows
// so each can be independently tracked in user collections.
// Run with: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/split-ab.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing env vars.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function splitCards() {
  console.log("Splitting A/B variants into separate card rows...\n");

  // First, delete any user_cards entries (since card IDs will change)
  const { error: ucError } = await supabase.from("user_cards").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (ucError) {
    console.log("Note: Could not clear user_cards (may be empty):", ucError.message);
  }

  // Fetch all current cards
  const { data: cards, error } = await supabase
    .from("cards")
    .select("*")
    .eq("is_parallel", false);

  if (error || !cards) {
    console.error("Failed to fetch cards:", error);
    process.exit(1);
  }

  console.log(`Found ${cards.length} combined cards. Splitting...\n`);

  // Delete all existing cards
  for (const card of cards) {
    await supabase.from("cards").delete().eq("id", card.id);
  }
  console.log("Cleared existing cards.");

  // Re-insert as separate A and B rows
  let insertCount = 0;

  for (const card of cards) {
    // Insert A variant
    const aRow = {
      set_id: card.set_id,
      number: `${card.number}a`,
      name_a: card.name_a,
      name_b: null,
      image_url_a: card.image_url_a,
      image_url_b: null,
      is_parallel: false,
      parallel_type: null,
    };

    const { error: aError } = await supabase.from("cards").insert(aRow);
    if (aError) {
      console.error(`Failed to insert #${card.number}a:`, aError.message);
    } else {
      insertCount++;
    }

    // Insert B variant (if exists)
    if (card.name_b) {
      const bRow = {
        set_id: card.set_id,
        number: `${card.number}b`,
        name_a: card.name_b,
        name_b: null,
        image_url_a: card.image_url_b,
        image_url_b: null,
        is_parallel: false,
        parallel_type: null,
      };

      const { error: bError } = await supabase.from("cards").insert(bRow);
      if (bError) {
        console.error(`Failed to insert #${card.number}b:`, bError.message);
      } else {
        insertCount++;
      }
    }
  }

  // Update set total_cards counts
  const { data: sets } = await supabase.from("sets").select("id, name");
  for (const set of sets ?? []) {
    const { count } = await supabase
      .from("cards")
      .select("id", { count: "exact", head: true })
      .eq("set_id", set.id);

    await supabase.from("sets").update({ total_cards: count ?? 0 }).eq("id", set.id);
    console.log(`${set.name}: ${count} cards`);
  }

  console.log(`\n✓ Done! Created ${insertCount} individual card rows.`);
}

splitCards();
