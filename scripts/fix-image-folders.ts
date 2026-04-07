// Fixes image URLs for sets with wrong folder names
// Run: npx tsx scripts/fix-image-folders.ts

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const BASE = "https://www.geepeekay.com/gallery";

// Map: set name -> correct folder name (where we had it wrong)
const folderFixes: Record<string, string> = {
  "2014 Series 1": "14s1",
  "2014 Series 2": "14s2",
  "2015 Series 1": "15s1",
  "30th Anniversary": "xxxv",
  "35th Anniversary": "xxxv_35th",
};

async function fix() {
  console.log("Fixing image folder names...\n");

  for (const [setName, correctFolder] of Object.entries(folderFixes)) {
    const { data: set } = await supabase
      .from("sets")
      .select("id")
      .eq("name", setName)
      .single();

    if (!set) {
      console.log(`  ${setName} not found, skipping`);
      continue;
    }

    const { data: cards } = await supabase
      .from("cards")
      .select("id, number, image_url_a")
      .eq("set_id", set.id);

    if (!cards || cards.length === 0) {
      console.log(`  ${setName}: no cards found`);
      continue;
    }

    let fixed = 0;
    for (const card of cards) {
      const newUrl = `${BASE}/${correctFolder}/${correctFolder}_${card.number}.jpg`;
      if (card.image_url_a !== newUrl) {
        await supabase
          .from("cards")
          .update({ image_url_a: newUrl })
          .eq("id", card.id);
        fixed++;
      }
    }

    // Verify first card works
    const testUrl = `${BASE}/${correctFolder}/${correctFolder}_${cards[0].number}.jpg`;
    const res = await fetch(testUrl, { method: "HEAD" });

    console.log(`  ${setName}: ${fixed} URLs updated → ${correctFolder} (${res.ok ? "✓ working" : "✗ " + res.status})`);
  }

  // Also fix 35th Anniversary which uses "xxxv" folder but with subset structure
  // The "All Grown Up" subset cards 1-20 use xxxv_agu_1a pattern
  // For now just fix the folder to xxxv and use simple numbering
  const { data: anniv35 } = await supabase.from("sets").select("id").eq("name", "35th Anniversary").single();
  if (anniv35) {
    const { data: cards35 } = await supabase.from("cards").select("id, number").eq("set_id", anniv35.id);
    let fixed35 = 0;
    for (const card of cards35 ?? []) {
      // 35th uses xxxv folder with simple numbering
      const newUrl = `${BASE}/xxxv/xxxv_${card.number}.jpg`;
      await supabase.from("cards").update({ image_url_a: newUrl }).eq("id", card.id);
      fixed35++;
    }
    const testUrl35 = `${BASE}/xxxv/xxxv_1a.jpg`;
    const res35 = await fetch(testUrl35, { method: "HEAD" });
    console.log(`  35th Anniversary: ${fixed35} URLs updated → xxxv (${res35.ok ? "✓ working" : "✗ " + res35.status})`);
  }

  console.log("\nDone!");
}

fix();
