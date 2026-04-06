// Seeds all non-OS sets: ANS 1-7, Flashback 1-3, BNS 1-3, and more
// Run: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-new-sets.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface SetDef {
  name: string;
  year: number;
  series: string;
  release_date: string;
  artists: string;
  notable: string;
  description: string;
  imageFolder: string; // geepeekay gallery folder
  cards: [string, string, string][]; // [number, nameA, nameB]
}

const sets: SetDef[] = [
  // ===== ALL NEW SERIES 1 (2003) =====
  {
    name: "All New Series 1",
    year: 2003,
    series: "All New Series",
    release_date: "August 2003",
    artists: "Tom Bunk, John Pound",
    notable: "The first GPK release in 15 years, bringing the brand back after the original run ended in 1988.",
    description: "After a 15-year hiatus, Garbage Pail Kids returned with All New Series 1 in August 2003. The set contains 80 base stickers (1a-40b) and revived the classic A/B naming format. Original artists Tom Bunk and John Pound returned to illustrate the comeback set.",
    imageFolder: "ans1",
    cards: [
      ["1","Bone Head Ed","Neanderthal Nathan"],["2","On Fire Mariah","Abby Birthday"],["3","Bustin' Justin","Wesley Wormhole"],["4","Cootie Cody","Buggin' Brandon"],["5","Crazy Casey","Ridiculous Nicholas"],["6","Seth Pool","Canned Kayla"],["7","Forged George","Shane Pain"],["8","Derailed Derek","Train Wreck Trevor"],["9","Cheesy Charlie","Pizza Face Chase"],["10","Shovelin' Shannon","Stuffin' Stephanie"],["11","Jarred Jared","Carly Cue"],["12","Kyle Tile","Bathroom Tyler"],["13","Leggy Lauren","Victoria's Secret"],["14","Little Barfin' Anna","Brittney Spews"],["15","Bill Board","Blinkin' Blake"],["16","Photo Matt","Vic Pic"],["17","Monstrous Monica","Colossal Cole"],["18","Rodent Rob","Pat Rat"],["19","Shelled Michelle","Lobster Shelby"],["20","Sprayed Ray","Alex Terminated"],["21","Boardin' Jordan","Rad Brad"],["22","Gross Greg","BMX Ben"],["23","Sushi Susie","Yuckie Tori"],["24","Gusty Gabriel","Disgustin' Dustin"],["25","Drew Tattoo","Marked Mark"],["26","Peein' Ian","Jacob's Bladder"],["27","Mini Vinnie","Punchy Paul"],["28","Duped David","Twice Bryce"],["29","Vendin' Brendan","Cheap Chad"],["30","Freewheelin' Frank","Dashboard Dennis"],["31","Fartin' Martin","Revvin' Evan"],["32","Zitty Whitney","Juicy Jess"],["33","Phat Phil","ill Will"],["34","Metallic Alec","Pierced Pete"],["35","Rootin' Ruben","Booger Brian"],["36","Messy Jesse","Rocky Ricardo"],["37","Yecchie Becky","Dizzy Lizzy"],["38","Lethal Ethan","Troy Destroy"],["39","Colin 911","Andrew Spew"],["40","Harry Potty","Magic Max"],
    ],
  },
  // ===== ALL NEW SERIES 2 (2004) =====
  {
    name: "All New Series 2",
    year: 2004,
    series: "All New Series",
    release_date: "March 2004",
    artists: "Tom Bunk, John Pound, James Warhola, Strephon Taylor, Pat & Sean Glover",
    notable: "No variations exist for this series — every card has only one print version.",
    description: "ANS2 arrived just 7 months after the comeback, with 80 base stickers. The artist roster expanded beyond Bunk and Pound to include James Warhola, Strephon Taylor, and Pat & Sean Glover.",
    imageFolder: "ans2",
    cards: [
      ["1","Peg Leg Greg","Justin Timber Leg"],["2","Aerial Ariel","Bubbly Brianna"],["3","Eaten Ethan","Jose Souffle"],["4","Umbilical Corey","Unraveled Rafael"],["5","Lost In Austin","Fat Chance"],["6","Leakin' Lee","Joustin' Josh"],["7","Game Over Gary","Germy Jeremy"],["8","Sk8 Nate","Flyin' Ryan"],["9","Waxed Zack","Max Wax"],["10","Hooked Brooke","Kate Bait"],["11","Bobble Bob","Will Wobble"],["12","Bungee Benjy","Xtreme Xavier"],["13","Scuzzy Ozzy","Rockin' Rick"],["14","Scarin' Aaron","Corny Cody"],["15","Skid Mark","Trackin' Travis"],["16","Dandruff Dan","Jake Flake"],["17","Dish Grace","Amped Amanda"],["18","Taylor Tubby","Morgan Organ"],["19","Spider Manny","Webby Wesley"],["20","Number Juan","Tinklin' Tyler"],["21","Nicole Mole","Warty Courtney"],["22","Handy Hannah","Mary Mucous"],["23","Downloadin' Logan","Digital Devin"],["24","Hairy Henry","Wolfman Jack"],["25","Cookie-Tosser Tessa","Krummy Kim"],["26","Piranha Conner","Sean Gone"],["27","Scabby Abby","Crusty Chris"],["28","Armed Arnie","Oscar La Vista"],["29","Gassy Garriet","Fizzy Francisco"],["30","Lippy Laura","Alyssa Kisser"],["31","Linty Lindsey","Bailey Button"],["32","Hecklin' Hector","Newsworthy Nick"],["33","Car Sick Caroline","Icky Vicky"],["34","Toe Jam Sam","Jammin' Amber"],["35","Hayden Go Seek","Timid Tim"],["36","Pete Achoo","Dorky Don"],["37","Rest Stop Russ","Wet Brett"],["38","Torn Tori","Tearin' Erin"],["39","Deflated David","Squirtin' Stephen"],["40","Lisa Loser","Marooned Marissa"],
    ],
  },
  // ===== ALL NEW SERIES 3 (2004) =====
  {
    name: "All New Series 3",
    year: 2004,
    series: "All New Series",
    release_date: "August 2004",
    artists: "Tom Bunk, John Pound, James Warhola, Luis Diaz, Ray Lago",
    notable: "Features card 7a 'Donald Dump' — a GPK take on Donald Trump years before his political career.",
    description: "ANS3 continued the revival with 80 base stickers and introduced new artists Luis Diaz and Ray Lago to the roster alongside the veterans.",
    imageFolder: "ans3",
    cards: [
      ["1","Christina Ugliera","Diana Diva"],["2","Jet Ski Jesse","Flayed Jay"],["3","Saucey Sarah","Mary Nara"],["4","Sweaty Betty","Clammy Sammy"],["5","Swampy Shaq","Omar Ogre"],["6","Tom Tongue","Coated Cody"],["7","Donald Dump","Trumped Trevor"],["8","Urine Nate","Backwoods Brandon"],["9","Bro Ken","Jumbled Jim"],["10","Astro Nat","Yuck Roger"],["11","Picky Ricky","Stringy Steve"],["12","Sprinklin' Spence","Hosed Jose"],["13","Jake Quake","Sergio Regurgio"],["14","Bob Gnarly","Dread Ed"],["15","Dartin' Dalton","Mike Spike"],["16","Cheesy Chelsea","Flossin' Jordan"],["17","Broken Crystal","Summer Break"],["18","Lava Levi","Retro Pedro"],["19","Jack Hammer","Hammered Henry"],["20","Birdbrain Brian","Cuckoo Chris"],["21","X Ray","Tanner Scanner"],["22","Cup O' Joe","Maxwell Louse"],["23","Snotty Scotty","Bubble Juan"],["24","Shredded Paige","Heather Shredder"],["25","Wranglin' Rachel","Calamity Jane"],["26","Taggin' Tyler","Popped Paul"],["27","Bigfoot Brittany","Alicia Creature"],["28","Laura Cough","Hackin' Hannah"],["29","Divin' Devin","Nosedive Noah"],["30","Chopper Chad","Hurlin' Harley"],["31","Poopdeck Pete","Marco Polo"],["32","Picked Nikki","Antsy Nancy"],["33","Troy Story","Trojan Warren"],["34","Vegan Ian","Cesar Salad"],["35","Malcom Middle","Messed Up Miguel"],["36","Offensive Oscar","Foul Fernando"],["37","Field Goal Joel","Kicked Mick"],["38","Jerry Rigged","Raul Model"],["39","Davey Croquet","Wacked Zack"],["40","Janet Jackass","Has-Been Jasmine"],
    ],
  },
  // ===== ALL NEW SERIES 4 (2005) =====
  {
    name: "All New Series 4",
    year: 2005,
    series: "All New Series",
    release_date: "April 2005",
    artists: "Tom Bunk, John Pound, James Warhola, Luis Diaz, David Gross, Ray Lago",
    notable: "Card 40 brings back Adam Bomb / Blasted Billy — the most iconic GPK character — for the new generation.",
    description: "ANS4 features 80 base stickers and brings back the legendary Adam Bomb (40a) and Blasted Billy (40b) as the set's finale. David Gross joined as a new artist.",
    imageFolder: "ans4",
    cards: [
      ["1","Green Cheese Chase","Phil Moon"],["2","Paris Embarrassed","Maris Wiltlin'"],["3","Worked-Up Warren","Chin-Up Chandler"],["4","Jimmy Dean","Sausage Sam"],["5","Allie Oops","Swingin' Sierra"],["6","Paul Vault","Impaled Dale"],["7","Nin Jack","Marshall Artless"],["8","Anna Cornea","Monica Ails"],["9","Clay Achin'","Idol Ivan"],["10","Colin Bowel","Scoutin' Scott"],["11","Grunge Bob","Spongey Spencer"],["12","Brainwashed Brett","Ed N. Shoulders"],["13","Fallen Angel","Airsick Ariel"],["14","Headless Leslie","Madison Halved"],["15","Jumpin' Jen","Megan Trouble"],["16","Cole Slawed","Sal Salad"],["17","Walter Cooler","Wizzin' Will"],["18","Harry Who Didn't","Noel Escape"],["19","Tom Turkey","Thanks Gavin"],["20","Vomitin' Victor","Ralphin' Ryan"],["21","Blown Away Ray","Breezy Brady"],["22","Snakey Jake","Charming Charlie"],["23","Blastin' Sebastian","Explosive Xavier"],["24","Cleaved Steve","Tandem Randy"],["25","Totem Tim","High Man Dan"],["26","Wishful Wes","Al Addin' Fumes"],["27","Wolver-Ian","Pokin' Logan"],["28","Fuelin' Julian","Gassin' Grant"],["29","Scuba Doo Lou","Harpoonin' Hunter"],["30","Turd King Travis","Poo-A-Mid Parker"],["31","Snotty Sarah","Jessica Simpleton"],["32","Mulched Mitch","Cut Up Chris"],["33","Hollow Wayne","Jacqueline Lantern"],["34","Zitty Zak","Acne Andy"],["35","Floodgate Nate","Levee Levi"],["36","Noah's Barf","High-Water Mark"],["37","Log Roland","Roger Logger"],["38","Recycled Michael","Overflowin' Owen"],["39","Nasty Ashley","Mary-Kate Ate"],["40","Adam Bomb","Blasted Billy"],
    ],
  },
  // ===== ALL NEW SERIES 5 (2006) =====
  {
    name: "All New Series 5",
    year: 2006,
    series: "All New Series",
    release_date: "April 2006",
    artists: "John Pound, Luis Diaz, Brent Engstrom, John Cebollero, Layron DeJarnette, David Gross",
    notable: "First ANS set without Tom Bunk. Introduced Brent Engstrom and John Cebollero who would become key GPK artists.",
    description: "ANS5 marks a turning point — Tom Bunk sat this one out while new artists Brent Engstrom and John Cebollero joined. The set has 80 base stickers with John Pound still anchoring the roster.",
    imageFolder: "ans5",
    cards: [
      ["1","Meteor Mark","Asteroid Anthony"],["2","Sam Bidexterous","Multi-Taskin' Ashton"],["3","Internal Morgan","Demonic Danielle"],["4","Matt Mobile","Batty Brad"],["5","Marty Mucous","Runny Ryan"],["6","Matrix Miguel","Skinned Jim"],["7","Ann Urism","Esther Basket"],["8","Norman NotWell","Vincent Van Gross"],["9","Furious George","King Kyle"],["10","Headless Heather","Head Alexis"],["11","Slam-Dunk Dylan","Jumpshot Josh"],["12","Heavin' Hunter","Rabbit Chase"],["13","Inmate Nate","Last-Leg Luke"],["14","Regurgita-Ted","Zack Snack"],["15","Armless Aaron","Unarmed Adrian"],["16","Al Poe","Gnawed Claude"],["17","Red-Eye Rob","Pink-Eye Guy"],["18","Corey Cola","Coca-Cole"],["19","Samantha Swirl","Decorating Deb"],["20","Paul Package","Tongue-Tied Toby"],["21","Eric The Wreck","Moto Carl"],["22","Courtin' Cody","Al Entine"],["23","Claire Snare","Lunchtime Lindsey"],["24","Stormcloud Shawn","Boltin' Colton"],["25","Nick Pick","Picky Dicky"],["26","Milkin' Milt","Diary Barry"],["27","Hay Bailey","Petey Wheatey"],["28","Karate Kyle","Ty Kwon Don't"],["29","Yo-Yo Joe","Tricky Nick"],["30","Yoga Olga","Mel Smell"],["31","Turntable Tim","Dee-Jay Jason"],["32","Gamblin' Gabe","Luis Vegas"],["33","Tether Bill","Sporty Spencer"],["34","Eye-Candy Mandy","Molly Pop"],["35","Quick-Pick Rick","Mega-Million Mike"],["36","Christina Barfarina","Spewin' Shannon"],["37","Farrah Faucet","Leakin' Lacey"],["38","Railroaded Richard","Choo-Choo Charlie"],["39","Doomed Dwayne","Toasted Todd"],["40","Chopper-Chopped Chris","Sliced Sammy"],
    ],
  },
  // ===== ALL NEW SERIES 6 (2007) =====
  {
    name: "All New Series 6",
    year: 2007,
    series: "All New Series",
    release_date: "January 2007",
    artists: "Tom Bunk, John Pound, Brent Engstrom, John Cebollero, Luis Diaz, David Gross, Layron DeJarnette",
    notable: "Card 24b 'Tom Bunk' is named after the actual GPK artist — a rare meta reference.",
    description: "ANS6 brought Tom Bunk back and expanded the artist roster to seven. The set has 80 base stickers with pop culture parodies including card 38 'i-Clod Todd' mocking Apple products.",
    imageFolder: "ans6",
    cards: [
      ["1","Orange Julius","Peeled Neal"],["2","Showerin' Howard","Rinsin' Vincent"],["3","Me Too Lou","Mirror Max"],["4","Jess Married","Married Mia"],["5","Canned Carl","Dogged Doug"],["6","Carter Farter","Curtis Blow"],["7","Hangin' Hayden","Hung Hunter"],["8","Rod 'N' Reel","Fisher Manny"],["9","Carol-Sel","Mary Go Round"],["10","Nested Ernesto","Elliot Nest"],["11","Snakes In Dwayne","Tapeworm Tanner"],["12","Blown Away Ray","Over Blown Ramon"],["13","Tara Too","Naughty Natalie"],["14","Deli Connor","Cole Cut"],["15","Axe In Jackson","Stumped Steve"],["16","Hacked Hogan","Russel Mania"],["17","Scott Pocket","Cal Zoned"],["18","Enter Net Nate","Sliced Bryce"],["19","Poop Head Paul","Turd Face Trace"],["20","Brady Back Ribs","Spare Rob"],["21","Stuffy Stephanie","Congested Jessica"],["22","Tailored Tyler","Mitch Stitched"],["23","Poker Face Chase","Card Shark Mark"],["24","Bunk Ben","Tom Bunk"],["25","Socked Brock","Refer-Reed"],["26","Mike Strike","Bowling For Dallas"],["27","Lemon Ned","Puckered Parker"],["28","Sam Castle","Crushed Kayla"],["29","Rasta Roni Tony","Spaghetti Eddy"],["30","Clawed Claude","Roy Toy"],["31","Booger Ken","Whopper Wyatt"],["32","Thomas The Train Wreck","Off The Rails Gail"],["33","Stabbed Sabrina","Targeted Taylor"],["34","Bobby Q.","Barbecue Stu"],["35","Webbed Whitney","Digestin' Jasmine"],["36","Tusky Tiffany","Buck Toothed Brenda"],["37","Cat Sup","Bottled Bailey"],["38","i-Clod Todd","MP Trey"],["39","Shot Scott","Fired Fred"],["40","Leonard Nimrod","Trekkie Trevor"],
    ],
  },
  // ===== ALL NEW SERIES 7 (2007) =====
  {
    name: "All New Series 7",
    year: 2007,
    series: "All New Series",
    release_date: "December 2007",
    artists: "Tom Bunk, John Pound, Brent Engstrom, Joe Simko, David Gross, Layron DeJarnette",
    notable: "The largest ANS set with 110 base stickers (55 pairs) — 50% more cards than previous ANS releases. The last of the All New Series.",
    description: "ANS7 was the grand finale of the All New Series era with a supersized 110-sticker base set (55 pairs). It introduced Joe Simko, who would go on to become one of the most prolific modern GPK artists. This was the last set before GPK transitioned to the Flashback and Brand New Series formats.",
    imageFolder: "ans7",
    cards: [
      ["1","Ty Dee Knot","Ty Dee Knot"],["2","Lindsay Lo-Life","Snotty Sara"],["3","Offense Spence","Rebound Roy"],["4","Knifin' Ivan","Gin Sue"],["5","Space Chase","Cosmic Ray"],["6","Morgan Donor","Di Sect"],["7","Drew Drool","Flood Ted"],["8","Big Top Tony","Ol' Faith Phil"],["9","Deodor Brent","Roll On Rob"],["10","Spartan Martin","Warrior Warren"],["11","Stormy Heather","Gail Force Wind"],["12","Vinny Son","Deer Hunter"],["13","Pee-On Leon","Ski Cliff"],["14","Coral Carson","Cora Reef"],["15","Prime Nate","Sim Ian"],["16","Ceiling Fran","Head Les"],["17","O.J. Jose","Juiced Jayden"],["18","Cooper Pooper","Dung Beetle Bailey"],["19","Ice Cole","Stuck Buck"],["20","Peter Puker","Web Head Ned"],["21","Bryce Iced","Scraped Jake"],["22","David Choppin' Squeal","Todd Da!"],["23","Gator Abe","We Winnie"],["24","Killer Wally","Chum Charlie"],["25","Britney Shears","Claire Cut"],["26","Waft Wyatt","Windy Wendel"],["27","Dog Troy","Michael Victim"],["28","Glass Blow Joe","Gas-Blowin' Owen"],["29","Eye Scream Lee","Scooped Shannon"],["30","Foamy Phil","Shave Dave"],["31","Lyin' Ryan","Tall Tale Tim"],["32","Abandoned Andy","Cast Away Jay"],["33","Wash Josh","Hans Soap"],["34","Willie Of Fortune","Nicholas Caged"],["35","Ghost Tory","Spectre Hector"],["36","Car Jack","Scrap Heath"],["37","Extra Christie","Chick Ken"],["38","Drum Kit","Tom Tom"],["39","Sub Maureen","Diver Don"],["40","Hollow Hal","Goal Noel"],["41","Sculpted Scott","Molded Miguel"],["42","Braided Brook","Tyra Eyes"],["43","Walked-On Walker","Dennis Shoe"],["44","Breakin' Brandon","Buster Move"],["45","Manuel Labor","Landon Scaping"],["46","Flamin' Damon","Dryin' Bryan"],["47","On The Mark","Snot Rocket Ricky"],["48","Del Icious","Licked Vic"],["49","Tyler Tilt","Pinball Willard"],["50","Desiree Disarray","Yard Sally"],["51","Billy Bling","Gil Grill"],["52","Winter Jill","Kindle Lynne"],["53","Trish Washer","Reese Cycle"],["54","Molly Pop","Sophie Sucker"],["55","Dough Boyd","Pills Barry"],
    ],
  },
];

async function seed() {
  console.log(`Seeding ${sets.length} new sets...\n`);

  for (const setDef of sets) {
    // Check if set already exists
    const { data: existing } = await supabase
      .from("sets")
      .select("id")
      .eq("name", setDef.name)
      .single();

    if (existing) {
      console.log(`  ${setDef.name} already exists, skipping`);
      continue;
    }

    // Create the set
    const { data: newSet, error: setError } = await supabase
      .from("sets")
      .insert({
        name: setDef.name,
        year: setDef.year,
        series: setDef.series,
        total_cards: setDef.cards.length * 2, // A + B
        release_date: setDef.release_date,
        artists: setDef.artists,
        notable: setDef.notable,
        description: setDef.description,
      })
      .select()
      .single();

    if (setError) {
      console.error(`  Failed to create ${setDef.name}:`, setError.message);
      continue;
    }

    // Create cards (split A/B into separate rows)
    const BASE = "https://www.geepeekay.com/gallery";
    const cardRows = [];

    for (const [num, nameA, nameB] of setDef.cards) {
      cardRows.push({
        set_id: newSet.id,
        number: `${num}a`,
        name_a: nameA,
        name_b: null,
        image_url_a: `${BASE}/${setDef.imageFolder}/${setDef.imageFolder}_${num}a.jpg`,
        image_url_b: null,
        is_parallel: false,
      });
      if (nameB) {
        cardRows.push({
          set_id: newSet.id,
          number: `${num}b`,
          name_a: nameB,
          name_b: null,
          image_url_a: `${BASE}/${setDef.imageFolder}/${setDef.imageFolder}_${num}b.jpg`,
          image_url_b: null,
          is_parallel: false,
        });
      }
    }

    // Insert in batches
    for (let i = 0; i < cardRows.length; i += 50) {
      const batch = cardRows.slice(i, i + 50);
      const { error } = await supabase.from("cards").insert(batch);
      if (error) {
        console.error(`  Failed batch for ${setDef.name}:`, error.message);
      }
    }

    console.log(`  ✓ ${setDef.name} (${setDef.year}): ${cardRows.length} cards`);
  }

  console.log("\nDone!");
}

seed();
