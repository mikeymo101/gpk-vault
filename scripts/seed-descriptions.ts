// Seeds set descriptions from geepeekay.com data
// Run migration first, then: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-descriptions.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const descriptions: Record<string, {
  release_date: string;
  artists: string;
  notable: string;
  description: string;
}> = {
  "Original Series 1": {
    release_date: "June 1985",
    artists: "John Pound (fronts), Tom Bunk (backs)",
    notable: "The only GPK series to not include puzzle-back cards.",
    description: "The series that started it all. Original Series 1 launched in June 1985 with 82 base stickers (1a–41b). All front artwork was created by John Pound and all back artwork by Tom Bunk. It was an instant cultural phenomenon, spawning a collecting craze among kids and eventually leading to a movie, cartoon, and decades of follow-up releases. Both Gloss and Matte finish backs have been found across pack variations.",
  },
  "Original Series 2": {
    release_date: "October 1985",
    artists: "John Pound",
    notable: "Featured three distinct print waves with name changes — card 49b changed from 'Schizo Fran' to 'Fran Fran' across printings.",
    description: "Released just four months after the debut, OS2 continued the momentum with 84 base stickers (42a–83b). John Pound was the sole artist. The set is notable for three distinct U.S. print runs, each with different puzzle-back designs and a controversial name change on card 49b. Two wrapper variations were produced.",
  },
  "Original Series 3": {
    release_date: "January 1986",
    artists: "John Pound, Tom Bunk, Mae Jeon",
    notable: "First series to feature front artwork from an artist other than John Pound.",
    description: "OS3 expanded the creative team — Tom Bunk and Mae Jeon contributed front artwork for the first time alongside John Pound. The set contains 82 base stickers (84a–124b) with two puzzle-back designs: U.S. Arnie/Snooty Sam (blue border) and Mugged Marcus/Kayo'd Cody (yellow border). Six wrapper variations were produced with different promotional offers.",
  },
  "Original Series 4": {
    release_date: "May 1986",
    artists: "John Pound, David Burke, Tom Bunk",
    notable: "Four characters had name changes after the initial print run — cards 125, 149, 158, and 164 each have three different name variations.",
    description: "OS4 is famous for its naming controversies. Four characters endured name changes after the initial print run, making cards 125, 149, 158, and 164 highly collectible with three name variants each. The set contains 84 base stickers (125a–166b) and introduced David Burke as an artist. A total of 2 boxes and 10 wrappers were produced across variants.",
  },
  "Original Series 5": {
    release_date: "August 1986",
    artists: "John Pound, Tom Bunk",
    notable: "The last original series to feature Adam Bomb on the wrapper.",
    description: "OS5 marks the end of an era — it was the last series to feature the iconic Adam Bomb on the wrapper. The set contains 80 base stickers (167a–206b) with artwork split between John Pound and Tom Bunk. Two puzzle-back designs featured Handy Randy/Jordan Nuts (orange border) and Dee Faced/Terri Cloth (purple border), each with 21 pieces.",
  },
  "Original Series 6": {
    release_date: "November 1986",
    artists: "John Pound, Tom Bunk, James Warhola",
    notable: "First GPK series with no variations whatsoever — no name changes, no matte/glossy differences, nothing.",
    description: "OS6 stands alone as the first Garbage Pail Kids series with zero variations during its print run — no name changes, no matte/glossy differences, no errors. The set contains 88 base stickers (207a–250b) and introduced James Warhola (nephew of Andy Warhol) as an artist alongside Pound and Bunk. One box and six wrapper variations were produced.",
  },
  "Original Series 7": {
    release_date: "February 1987",
    artists: "John Pound, James Warhola, Tom Bunk",
    notable: "Sticker 289b is the ONLY sticker to ever have its number change both color AND location between printings — one of the most unique variations in the entire run.",
    description: "OS7 contains 84 base stickers (249a–292b) with one of the most unique variations in GPK history. Card 289b (Stair Casey / Alexander The Grate) is the only sticker to ever have its number change both color and location between printings. The artist workload was split across Pound, Warhola, and Bunk with Pound handling the majority.",
  },
  "Original Series 8": {
    release_date: "April 1987",
    artists: "John Pound, Tom Bunk, James Warhola",
    notable: "The only series to use capital 'A' and 'B' for the card numbers.",
    description: "OS8 has a subtle but distinctive feature — it's the only series to use capital 'A' and 'B' for card number variants (293A instead of 293a). The set contains 84 base stickers (293A–334B) with artwork by Pound, Bunk, and Warhola. One box and four wrapper variations were produced.",
  },
  "Original Series 9": {
    release_date: "June 1987",
    artists: "John Pound, Tom Bunk, James Warhola",
    notable: "Contains the most famous GPK error card — 355b 'Semi Colon' with a missing card number due to a black ink printing error.",
    description: "OS9 is legendary among collectors for containing the most famous GPK error card: 355b Semi Colin, where a printing error caused the black ink to be missing from the upper-right corner, leaving some cards unnumbered. The set contains 88 base stickers (335a–378b). Two box variants and twelve wrapper variations were produced — the most wrapper variants of any original series.",
  },
  "Original Series 10": {
    release_date: "September 1987",
    artists: "John Pound, James Warhola, Tom Bunk, Bill Wray",
    notable: "First series to feature the 'new look' GPK design and banner following the Cabbage Patch Kids lawsuit and court ruling.",
    description: "OS10 marks a visual turning point for the franchise. Following the lawsuit and court ruling related to Cabbage Patch Kids, this was the first series to feature the redesigned GPK characters and new banner style. The set contains 78 base stickers (379a–417b) and introduced Bill Wray as a fourth artist. One box and three wrappers were produced.",
  },
  "Original Series 11": {
    release_date: "December 1987",
    artists: "John Pound, James Warhola, Tom Bunk, James Bennett",
    notable: "The only series to feature PINK letters on the checklist instead of the typical red.",
    description: "OS11 added James Bennett to the growing artist roster and has a quirky distinction — it's the only series to feature pink letters on the checklist instead of the typical red (and later cyan). The set contains 84 base stickers (418a–459b). One box and two wrapper variations were produced.",
  },
  "Original Series 12": {
    release_date: "March 1988",
    artists: "John Pound, James Warhola, Tom Bunk, James Bennett",
    notable: "First series released in 1988 — the final year of original series production.",
    description: "OS12 opened the final year of original GPK production. Released in March 1988, it contains 82 base stickers (460a–500b) with art by Pound, Warhola, Bunk, and Bennett. The set marked the beginning of the end for the original run, with only three more series to follow. One box and two wrappers were produced.",
  },
  "Original Series 13": {
    release_date: "June 1988",
    artists: "John Pound, Tom Bunk, James Warhola",
    notable: "First series to feature a different character on the wrapper than the character on the box.",
    description: "OS13 broke tradition by featuring a different character on the wrapper than the one on the box — a first for the franchise. The set contains 80 base stickers (501a–540b) with artwork by the core trio of Pound, Bunk, and Warhola. One box and two wrappers were produced.",
  },
  "Original Series 14": {
    release_date: "September 1988",
    artists: "Tom Bunk, John Pound, James Warhola",
    notable: "First series to feature a different color wrapper than the box.",
    description: "OS14 continued the late-series design experiments — it was the first series where the wrapper color differed from the box color. The set contains 80 base stickers (541a–580b). Tom Bunk illustrated cards 541–553 while John Pound handled 554–580, with James Warhola contributing card 554. One box and two wrappers were produced.",
  },
  "Original Series 15": {
    release_date: "December 1988",
    artists: "Tom Bunk, John Pound",
    notable: "The last set of the original run to be produced and released by Topps, Inc.",
    description: "The end of an era. OS15 was the last set of the original Garbage Pail Kids run, released in December 1988. It contains 80 base stickers (581a–620b) but has a massive 176-sticker variation set — the largest of any original series. Artwork was split between Tom Bunk and John Pound. A 'Non Die-cut' error set variant also exists. One box and two wrappers were produced.",
  },
};

async function seedDescriptions() {
  console.log("Seeding set descriptions...\n");

  for (const [name, info] of Object.entries(descriptions)) {
    const { error } = await supabase
      .from("sets")
      .update({
        description: info.description,
        release_date: info.release_date,
        artists: info.artists,
        notable: info.notable,
      })
      .eq("name", name);

    if (error) {
      console.error(`Failed to update ${name}:`, error.message);
    } else {
      console.log(`✓ ${name}`);
    }
  }

  console.log("\nDone!");
}

seedDescriptions();
