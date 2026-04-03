// Updates all OS1-OS15 cards with image URLs from geepeekay.com
// Run with: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-images.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BASE_URL = "https://www.geepeekay.com/gallery";

// Map card number ranges to their OS series folder name
const seriesMap: { startCard: number; endCard: number; folder: string }[] = [
  { startCard: 1, endCard: 41, folder: "os1" },
  { startCard: 42, endCard: 83, folder: "os2" },
  { startCard: 84, endCard: 127, folder: "os3" },
  { startCard: 128, endCard: 167, folder: "os4" },
  { startCard: 168, endCard: 209, folder: "os5" },
  { startCard: 210, endCard: 248, folder: "os6" },
  { startCard: 249, endCard: 292, folder: "os7" },
  { startCard: 293, endCard: 334, folder: "os8" },
  { startCard: 335, endCard: 378, folder: "os9" },
  { startCard: 379, endCard: 418, folder: "os10" },
  { startCard: 419, endCard: 458, folder: "os11" },
  { startCard: 459, endCard: 498, folder: "os12" },
  { startCard: 499, endCard: 540, folder: "os13" },
  { startCard: 541, endCard: 582, folder: "os14" },
  { startCard: 583, endCard: 620, folder: "os15" },
];

function getFolder(cardNumber: number): string | null {
  for (const s of seriesMap) {
    if (cardNumber >= s.startCard && cardNumber <= s.endCard) {
      return s.folder;
    }
  }
  return null;
}

async function seedImages() {
  console.log("Updating cards with image URLs...");

  // Fetch all cards
  const { data: cards, error } = await supabase
    .from("cards")
    .select("id, number, name_a, name_b")
    .eq("is_parallel", false)
    .order("number");

  if (error || !cards) {
    console.error("Failed to fetch cards:", error);
    process.exit(1);
  }

  let updated = 0;

  for (const card of cards) {
    const num = parseInt(card.number);
    const folder = getFolder(num);
    if (!folder) continue;

    const imageUrlA = `${BASE_URL}/${folder}/${folder}_${card.number}a.jpg`;
    const imageUrlB = card.name_b
      ? `${BASE_URL}/${folder}/${folder}_${card.number}b.jpg`
      : null;

    const { error: updateError } = await supabase
      .from("cards")
      .update({
        image_url_a: imageUrlA,
        image_url_b: imageUrlB,
      })
      .eq("id", card.id);

    if (updateError) {
      console.error(`Failed to update card #${card.number}:`, updateError);
    } else {
      updated++;
    }
  }

  console.log(`✓ Updated ${updated} cards with image URLs.`);
}

seedImages();
