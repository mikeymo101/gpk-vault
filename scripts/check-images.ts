// Checks all card image URLs for broken links (404s)
// Run with: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/check-images.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing env vars.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkImages() {
  const { data: cards, error } = await supabase
    .from("cards")
    .select("id, number, name_a, name_b, image_url_a, image_url_b")
    .eq("is_parallel", false)
    .order("number");

  if (error || !cards) {
    console.error("Failed to fetch cards:", error);
    process.exit(1);
  }

  console.log(`Checking ${cards.length} cards...\n`);

  const missing: string[] = [];
  const broken: { card: string; url: string; status: number }[] = [];

  for (const card of cards) {
    const num = parseInt(card.number);

    // Check A side
    if (!card.image_url_a) {
      missing.push(`#${card.number}a ${card.name_a} — no URL`);
    } else {
      try {
        const res = await fetch(card.image_url_a, { method: "HEAD" });
        if (!res.ok) {
          broken.push({ card: `#${card.number}a ${card.name_a}`, url: card.image_url_a, status: res.status });
        }
      } catch {
        broken.push({ card: `#${card.number}a ${card.name_a}`, url: card.image_url_a, status: 0 });
      }
    }

    // Check B side
    if (card.name_b) {
      if (!card.image_url_b) {
        missing.push(`#${card.number}b ${card.name_b} — no URL`);
      } else {
        try {
          const res = await fetch(card.image_url_b, { method: "HEAD" });
          if (!res.ok) {
            broken.push({ card: `#${card.number}b ${card.name_b}`, url: card.image_url_b, status: res.status });
          }
        } catch {
          broken.push({ card: `#${card.number}b ${card.name_b}`, url: card.image_url_b, status: 0 });
        }
      }
    }

    // Progress indicator every 50 cards
    if (num % 50 === 0) {
      process.stdout.write(`  checked through #${card.number}...\r`);
    }
  }

  console.log("\n\n=== RESULTS ===\n");

  if (missing.length === 0 && broken.length === 0) {
    console.log("All images OK!");
  }

  if (missing.length > 0) {
    console.log(`Missing URLs (${missing.length}):`);
    missing.forEach((m) => console.log(`  ${m}`));
  }

  if (broken.length > 0) {
    console.log(`\nBroken URLs (${broken.length}):`);
    broken.forEach((b) => console.log(`  ${b.card} → ${b.status} ${b.url}`));
  }

  console.log(`\nTotal cards: ${cards.length}`);
  console.log(`Total image slots: ${cards.length * 2}`);
  console.log(`Missing: ${missing.length}`);
  console.log(`Broken: ${broken.length}`);
}

checkImages();
