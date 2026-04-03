// Fixes broken image URLs after A/B split
// Cards are now stored as "125a", "125b" etc. in the DB
// Run with: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/fix-broken-images.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing env vars.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BASE = "https://www.geepeekay.com/gallery";

// Map: card number in DB -> correct image URL
// These cards were assigned the wrong gallery folder
const fixes: Record<string, string> = {
  // Was in os3, actually in os4 on geepeekay
  "125a": `${BASE}/os4/os4_125a.jpg`,
  "125b": `${BASE}/os4/os4_125b.jpg`,
  "126a": `${BASE}/os4/os4_126a.jpg`,
  "126b": `${BASE}/os4/os4_126b.jpg`,
  "127a": `${BASE}/os4/os4_127a.jpg`,
  "127b": `${BASE}/os4/os4_127b.jpg`,

  // 94b had a typo filename on geepeekay
  "94b": `${BASE}/os3/os3_94bc.jpg`,

  // Was in os4, actually in os5
  "167a": `${BASE}/os5/os5_167a.jpg`,
  "167b": `${BASE}/os5/os5_167b.jpg`,

  // Was in os5, actually in os6
  "207a": `${BASE}/os6/os6_207a.jpg`,
  "207b": `${BASE}/os6/os6_207b.jpg`,
  "208a": `${BASE}/os6/os6_208a.jpg`,
  "208b": `${BASE}/os6/os6_208b.jpg`,
  "209a": `${BASE}/os6/os6_209a.jpg`,
  "209b": `${BASE}/os6/os6_209b.jpg`,

  // Was in os7, actually in os6
  "249a": `${BASE}/os6/os6_249a.jpg`,
  "249b": `${BASE}/os6/os6_249b.jpg`,
  "250a": `${BASE}/os6/os6_250a.jpg`,
  "250b": `${BASE}/os6/os6_250b.jpg`,

  // Was in os10, actually in os11
  "418a": `${BASE}/os11/os11_418a.jpg`,
  "418b": `${BASE}/os11/os11_418b.jpg`,

  // Was in os12, actually in os11
  "459a": `${BASE}/os11/os11_459a.jpg`,
  "459b": `${BASE}/os11/os11_459b.jpg`,

  // os13 boundary
  "499a": `${BASE}/os12/os12_499a.jpg`,
  "499b": `${BASE}/os12/os12_499b.jpg`,
  "500a": `${BASE}/os13/os13_500a.jpg`,
  "500b": `${BASE}/os13/os13_500b.jpg`,

  // os14 end
  "581a": `${BASE}/os14/os14_581a.jpg`,
  "581b": `${BASE}/os14/os14_581b.jpg`,
  "582a": `${BASE}/os14/os14_582a.jpg`,
  "582b": `${BASE}/os14/os14_582b.jpg`,
};

async function fixImages() {
  console.log("Fixing broken image URLs...\n");

  let fixed = 0;
  let stillBroken = 0;

  for (const [cardNumber, newUrl] of Object.entries(fixes)) {
    // Cards are now stored with number = "125a", "125b" etc.
    const { data: card } = await supabase
      .from("cards")
      .select("id, number")
      .eq("number", cardNumber)
      .single();

    if (!card) {
      console.log(`  Card #${cardNumber} not found in DB, skipping`);
      continue;
    }

    // Verify the new URL works
    try {
      const res = await fetch(newUrl, { method: "HEAD" });
      if (!res.ok) {
        console.log(`  #${cardNumber} → still broken (${res.status}): ${newUrl}`);
        stillBroken++;
        continue;
      }
    } catch {
      console.log(`  #${cardNumber} → fetch failed: ${newUrl}`);
      stillBroken++;
      continue;
    }

    // After split, image is always in image_url_a
    const { error } = await supabase
      .from("cards")
      .update({ image_url_a: newUrl })
      .eq("id", card.id);

    if (error) {
      console.error(`  #${cardNumber} update failed:`, error.message);
    } else {
      console.log(`  ✓ #${cardNumber} fixed`);
      fixed++;
    }
  }

  console.log(`\nDone! Fixed: ${fixed}, Still broken: ${stillBroken}`);
}

fixImages();
