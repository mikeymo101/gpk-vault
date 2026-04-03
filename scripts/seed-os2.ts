// Seed script: GPK Original Series 2 (1985)
// Run with: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-os2.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// OS2 — Original Series 2 (1985), cards 42-83 (42 pairs)
const os2Cards: [string, string, string][] = [
  ["42", "Patty Putty", "Muggin' Megan"],
  ["43", "Smelly Kelly", "Doug Plug"],
  ["44", "Sy Clops", "One-Eyed Jack"],
  ["45", "Leaky Lindsay", "Messy Tessie"],
  ["46", "Rappin' Ron", "Ray Gun"],
  ["47", "Disgustin' Justin", "Vile Kyle"],
  ["48", "Tongue Tied Tim", "Marty Mouthful"],
  ["49", "Double Heather", "Schizo Fran"],
  ["50", "Mad Donna", "Nutty Nicole"],
  ["51", "Russell Muscle", "Brett Sweat"],
  ["52", "Dirty Harry", "Rob Slob"],
  ["53", "Jolted Joel", "Live Mike"],
  ["54", "Fryin' Ryan", "Charred Chad"],
  ["55", "Hairy Gary", "Brutal Brad"],
  ["56", "Hairy Carrie", "Brutal Bridget"],
  ["57", "Tommy Gun", "Dead Fred"],
  ["58", "Cracked Jack", "Soft Boiled Sam"],
  ["59", "Clogged Duane", "Bye Bye Bobby"],
  ["60", "Prickly Rick", "Cactus Carol"],
  ["61", "Jolly Roger", "Pegleg Peter"],
  ["62", "Greaser Greg", "Chris Hiss"],
  ["63", "Spacey Stacy", "Janet Planet"],
  ["64", "Hot Scott", "Luke Warm"],
  ["65", "Shrunken Ed", "Cheeky Charles"],
  ["66", "Matt Ratt", "Rachel Rodent"],
  ["67", "Phony Lisa", "Mona Loser"],
  ["68", "Oliver Twisted", "Dizzy Dave"],
  ["69", "Jenny Jelly", "Sara Slime"],
  ["70", "Bad Breath Seth", "Foul Phil"],
  ["71", "Odd Todd", "Bent Ben"],
  ["72", "Mad Max", "Brainy Brian"],
  ["73", "Gorgeous George", "Dollar Bill"],
  ["74", "Mark Bark", "Kennel Kenny"],
  ["75", "Off-The-Wall Paul", "Zach Plaque"],
  ["76", "Bonnie Bunny", "Pourin' Lauren"],
  ["77", "Ghastly Ashley", "Acne Amy"],
  ["78", "Wrinkled Rita", "Ancient Annie"],
  ["79", "Sewer Sue", "Michelle Muck"],
  ["80", "Tattoo Lou", "Art Gallery"],
  ["81", "Split Kit", "Mixed-Up Mitch"],
  ["82", "Slain Wayne", "Ventilated Vinnie"],
  ["83", "Ugh Lee", "Sumo Sid"],
];

async function seed() {
  console.log("Seeding GPK Original Series 2...");

  // Check if set already exists
  const { data: existingSet } = await supabase
    .from("sets")
    .select()
    .eq("name", "Original Series 2")
    .single();

  let setId: string;

  if (existingSet) {
    console.log("Set already exists, using existing.");
    setId = existingSet.id;
  } else {
    const { data: newSet, error: insertError } = await supabase
      .from("sets")
      .insert({
        name: "Original Series 2",
        year: 1985,
        series: "Original Series",
        total_cards: 42,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Failed to create set:", insertError);
      process.exit(1);
    }
    setId = newSet!.id;
  }

  const cards = os2Cards.map(([number, nameA, nameB]) => ({
    set_id: setId,
    number,
    name_a: nameA,
    name_b: nameB,
    is_parallel: false,
  }));

  const { error } = await supabase.from("cards").upsert(cards, {
    onConflict: "set_id,number,is_parallel,parallel_type",
  });

  if (error) {
    console.error("Failed to seed cards:", error);
    process.exit(1);
  }

  console.log(`Seeded ${cards.length} cards for OS2.`);
}

seed();
