// Seed script: GPK Original Series 1 (1985)
// Run with: npx tsx scripts/seed.ts

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

// OS1 — Original Series 1 (1985), 82 card pairs (A/B names)
const os1Cards: [string, string, string][] = [
  ["1", "Nasty Nick", "Evil Eddie"],
  ["2", "Jelly Kelly", "Cranky Frankie"],
  ["3", "Virus Iris", "Foul Phil"],
  ["4", "Fryin' Brian", "Electric Bill"],
  ["5", "Dead Ted", "Jay Decay"],
  ["6", "Ali Gator", "Marshy Marshall"],
  ["7", "Stormy Heather", "Warring Warren"],
  ["8", "Adam Bomb", "Blasted Billy"],
  ["9", "Boozin' Bruce", "Drunk Ken"],
  ["10", "Geeky Gary", "Nerdy Norm"],
  ["11", "Itchy Richie", "Rash Ricky"],
  ["12", "Furry Fran", "Hairy Mary"],
  ["13", "Ashcan Andy", "Trashed Tracy"],
  ["14", "Potty Scotty", "Sicky Vicky"],
  ["15", "Bony Joanie", "Thin Lynn"],
  ["16", "Weird Wendy", "Haggy Maggie"],
  ["17", "Wry Rye", "Guillo Tina"],
  ["18", "Crater Chris", "Spacey Stacy"],
  ["19", "Acne Amy", "Crater Carmen"],
  ["20", "Junky Jeff", "Trashy Ann"],
  ["21", "Swell Mel", "Puffy Pete"],
  ["22", "Junky Jennifer", "Trashy Traci"],
  ["23", "Leaky Lindsay", "Drippy Dan"],
  ["24", "Nervous Rex", "Frightened Frank"],
  ["25", "Creepy Carol", "Eerie Eric"],
  ["26", "Slobby Robbie", "Mean Gene"],
  ["27", "Tommy Tomb", "Deadly Dudley"],
  ["28", "Valerie Vomit", "Barfin' Barbara"],
  ["29", "Punchy Perry", "Bruised Lee"],
  ["30", "Oozy Suzy", "Juicy Jessica"],
  ["31", "Run Down Rhoda", "Flat Pat"],
  ["32", "Joltin' Joe", "Watt Satt"],
  ["33", "Mad Mike", "Deranged Donald"],
  ["34", "Kim Kong", "Hairy Harriet"],
  ["35", "Wrinkly Winnie", "Saggy Sally"],
  ["36", "Patty Putty", "Bendy Wendy"],
  ["37", "Blasted Bill", "Meltin' Melissa"],
  ["38", "Surreal Neal", "Schizo Fran"],
  ["39", "Dopey Donald", "Brainy Janey"],
  ["40", "Art Apart", "Split Kit"],
  ["41", "Mean Jean", "Ugly Doug"],
  ["42", "Ailin' Al", "Ill Will"],
  ["43", "Handy Randy", "Extra Eddie"],
  ["44", "Buggy Betty", "Creepy Crawly"],
  ["45", "Hot Scott", "Luke Warm"],
  ["46", "Dusty Dave", "Musty Rusty"],
  ["47", "Bony Tony", "Skinny Vinnie"],
  ["48", "Gadget Gary", "Mech Mike"],
  ["49", "Frigid Bridget", "Cold Colleen"],
  ["50", "Rob Slob", "Piggy Pete"],
  ["51", "Wrappin' Ruth", "Bandage Bridget"],
  ["52", "Foul Freddy", "Gross George"],
  ["53", "Bugged Bert", "Infested Ingrid"],
  ["54", "Heavin' Steven", "Carsick Carl"],
  ["55", "Ray Decay", "Dyin' Ryan"],
  ["56", "Slobby Sue", "Snotty Sally"],
  ["57", "Ghastly Ashley", "Scary Carrie"],
  ["58", "Stinky Stan", "Smellin' Helen"],
  ["59", "Tee-Vee Stevie", "Gory Rory"],
  ["60", "New Wave Dave", "Punky Brewster"],
  ["61", "Greaser Greg", "Grease Ball Grace"],
  ["62", "Mugged Marcus", "Harmed Hank"],
  ["63", "Up Chuck", "Heavin' Heather"],
  ["64", "Shorned Sean", "Bald Brenda"],
  ["65", "Hy Rye", "Short Circuit Seth"],
  ["66", "Blasted Brian", "Nuclear Norman"],
  ["67", "Dotty Donna", "Spotty Sophie"],
  ["68", "Sy Clops", "One-Eyed Eileen"],
  ["69", "Horsey Henry", "Centaur Sarah"],
  ["70", "Corroded Carl", "Rusted Robert"],
  ["71", "Armpit Britt", "Stinky Stella"],
  ["72", "Pourin' Norman", "Rainy Ruth"],
  ["73", "Woody Alan", "Knotty Ned"],
  ["74", "Mark Bark", "Timber Tammy"],
  ["75", "Root Canal Cal", "Toothy Terry"],
  ["76", "Damaged Don", "Busted Bob"],
  ["77", "Snot Rod", "Slimy Sam"],
  ["78", "Wacky Winnie", "Crazy Carrie"],
  ["79", "Kit Kat", "Cathy Catty"],
  ["80", "Formalde Heidi", "Pickled Pete"],
  ["81", "Tied Ty", "Knotted Nora"],
  ["82", "Berserk Kirk", "Mental Marvin"],
];

async function seed() {
  console.log("Seeding GPK Original Series 1...");

  // Insert the set
  const { data: set, error: setError } = await supabase
    .from("sets")
    .upsert(
      {
        name: "Original Series 1",
        year: 1985,
        series: "Original Series",
        total_cards: 82,
      },
      { onConflict: "name" }
    )
    .select()
    .single();

  if (setError) {
    // Try insert without upsert if no unique constraint on name
    const { data: existingSet } = await supabase
      .from("sets")
      .select()
      .eq("name", "Original Series 1")
      .single();

    if (existingSet) {
      console.log("Set already exists, using existing.");
      await insertCards(existingSet.id);
      return;
    }

    const { data: newSet, error: insertError } = await supabase
      .from("sets")
      .insert({
        name: "Original Series 1",
        year: 1985,
        series: "Original Series",
        total_cards: 82,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Failed to create set:", insertError);
      process.exit(1);
    }
    await insertCards(newSet!.id);
    return;
  }

  await insertCards(set!.id);
}

async function insertCards(setId: string) {
  const cards = os1Cards.map(([number, nameA, nameB]) => ({
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

  console.log(`Seeded ${cards.length} cards for OS1.`);
}

seed();
