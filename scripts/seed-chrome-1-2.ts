// Seeds Chrome Series 1 and 2
// Run: npx tsx scripts/seed-chrome-1-2.ts

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const sets = [
  {
    name: "Chrome Series 1", year: 2013, series: "Chrome Series",
    release_date: "August 2013",
    artists: "John Pound, Tom Bunk (original OS1 art on chrome cardstock)",
    notable: "First-ever Chrome GPK set. OS1 cards (1-41) reprinted on chrome/refractor cardstock plus 14 new Lost cards and C-name variations.",
    description: "Chrome Series 1 launched the Chrome line by putting the legendary OS1 cards on premium chrome refractor cardstock. All 41 OS1 pairs are included plus 14 brand new 'Lost' cards that were never part of the original run. Many cards also have exclusive C-name variations.",
    imageFolder: "cs1",
    cards: [
      ["1","Nasty Nick","Evil Eddie"],["2","Junkfood John","Ray Decay"],["3","Up Chuck","Heavin' Steven"],["4","Fryin' Brian","Electric Bill"],["5","Dead Ted","Jay Decay"],["6","Art Apart","Busted Bob"],["7","Stormy Heather","April Showers"],["8","Adam Bomb","Blasted Billy"],["9","Boozin' Bruce","Drunk Ken"],["10","Tee-Vee Stevie","Geeky Gary"],["11","Itchy Richie","Bugged Bert"],["12","Furry Fran","Hairy Mary"],["13","Ashcan Andy","Spacey Stacy"],["14","Potty Scotty","Jason Basin"],["15","Ailin' Al","Mauled Paul"],["16","Weird Wendy","Haggy Maggie"],["17","Wacky Jackie","Loony Lenny"],["18","Cranky Frankie","Bad Brad"],["19","Corroded Carl","Crater Chris"],["20","Swell Mel","Dressy Jesse"],["21","Virus Iris","Sicky Vicky"],["22","Junky Jeff","Stinky Stan"],["23","Drippy Dan","Leaky Lou"],["24","Nervous Rex","Nerdy Norm"],["25","Creepy Carol","Scary Carrie"],["26","Slobby Robbie","Fat Matt"],["27","Brainy Janie","Jenny Genius"],["28","Oozy Suzie","Meltin' Melissa"],["29","Bony Joanie","Thin Lynn"],["30","New Wave Dave","Graffiti Petey"],["31","Run Down Rhoda","Flat Pat"],["32","Frigid Bridget","Chilly Millie"],["33","Mad Mike","Savage Stuart"],["34","Kim Kong","Anna Banana"],["35","Wrinkly Randy","Rockin' Robert"],["36","Wrappin' Ruth","Tommy Tomb"],["37","GuilloTina","Cindy Lopper"],["38","Slimy Sam","Lizard Liz"],["39","Buggy Betty","Green Jean"],["40","Unstitched Mitch","Damaged Don"],["41","Mean Gene","Joltin' Joe"],
    ],
  },
  {
    name: "Chrome Series 2", year: 2014, series: "Chrome Series",
    release_date: "September 2014",
    artists: "John Pound (original OS2 art on chrome cardstock)",
    notable: "Chrome reprints of OS2 cards (42-83). Second Chrome release continuing the premium refractor treatment of the original series.",
    description: "Chrome Series 2 puts all 42 OS2 card pairs on chrome refractor cardstock, continuing from where Chrome Series 1 left off. The full OS2 lineup from Patty Putty to Ugh Lee gets the premium chrome treatment.",
    imageFolder: "cs2",
    cards: [
      ["42","Patty Putty","Muggin' Megan"],["43","Smelly Kelly","Doug Plug"],["44","Sy Clops","One-Eyed Jack"],["45","Leaky Lindsay","Messy Tessie"],["46","Rappin' Ron","Ray Gun"],["47","Disgustin' Justin","Vile Kyle"],["48","Tongue Tied Tim","Marty Mouthful"],["49","Double Heather","Schizo Fran"],["50","Mad Donna","Nutty Nicole"],["51","Russell Muscle","Brett Sweat"],["52","Dirty Harry","Rob Slob"],["53","Jolted Joel","Live Mike"],["54","Fryin' Ryan","Charred Chad"],["55","Hairy Gary","Brutal Brad"],["56","Hairy Carrie","Brutal Bridget"],["57","Tommy Gun","Dead Fred"],["58","Cracked Jack","Soft Boiled Sam"],["59","Clogged Duane","Bye Bye Bobby"],["60","Prickly Rick","Cactus Carol"],["61","Jolly Roger","Pegleg Peter"],["62","Greaser Greg","Chris Hiss"],["63","Spacey Stacy","Janet Planet"],["64","Hot Scott","Luke Warm"],["65","Shrunken Ed","Cheeky Charles"],["66","Matt Ratt","Rachel Rodent"],["67","Phony Lisa","Mona Loser"],["68","Oliver Twisted","Dizzy Dave"],["69","Jenny Jelly","Sara Slime"],["70","Bad Breath Seth","Foul Phil"],["71","Odd Todd","Bent Ben"],["72","Mad Max","Brainy Brian"],["73","Gorgeous George","Dollar Bill"],["74","Mark Bark","Kennel Kenny"],["75","Off-The-Wall Paul","Zach Plaque"],["76","Bonnie Bunny","Pourin' Lauren"],["77","Ghastly Ashley","Acne Amy"],["78","Wrinkled Rita","Ancient Annie"],["79","Sewer Sue","Michelle Muck"],["80","Tattoo Lou","Art Gallery"],["81","Split Kit","Mixed-Up Mitch"],["82","Slain Wayne","Ventilated Vinnie"],["83","Ugh Lee","Sumo Sid"],
    ],
  },
];

async function seed() {
  console.log(`Seeding ${sets.length} Chrome sets...\n`);
  for (const s of sets) {
    const { data: existing } = await supabase.from("sets").select("id").eq("name", s.name).single();
    if (existing) { console.log(`  ${s.name} already exists, skipping`); continue; }
    const { data: newSet, error: setError } = await supabase.from("sets").insert({
      name: s.name, year: s.year, series: s.series, total_cards: s.cards.length * 2,
      release_date: s.release_date, artists: s.artists, notable: s.notable, description: s.description,
    }).select().single();
    if (setError) { console.error(`  Failed: ${s.name}:`, setError.message); continue; }
    const BASE = "https://www.geepeekay.com/gallery";
    const rows: Record<string, unknown>[] = [];
    for (const [num, a, b] of s.cards) {
      rows.push({ set_id: newSet.id, number: `${num}a`, name_a: a, name_b: null, image_url_a: `${BASE}/${s.imageFolder}/${s.imageFolder}_${num}a.jpg`, image_url_b: null, is_parallel: false });
      if (b) rows.push({ set_id: newSet.id, number: `${num}b`, name_a: b, name_b: null, image_url_a: `${BASE}/${s.imageFolder}/${s.imageFolder}_${num}b.jpg`, image_url_b: null, is_parallel: false });
    }
    for (let i = 0; i < rows.length; i += 50) {
      const { error } = await supabase.from("cards").insert(rows.slice(i, i + 50));
      if (error) console.error(`  Batch error:`, error.message);
    }
    console.log(`  ✓ ${s.name} (${s.year}): ${rows.length} cards`);
  }
  console.log("\nDone!");
}
seed();
