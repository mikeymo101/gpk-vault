// Seeds Brand New Series 1-3
// Run: npx tsx scripts/seed-bns.ts (with env vars exported)

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

interface SetDef {
  name: string; year: number; series: string; release_date: string; artists: string; notable: string; description: string; imageFolder: string;
  cards: [string, string, string][];
}

const sets: SetDef[] = [
  {
    name: "Brand New Series 1", year: 2012, series: "Brand New Series",
    release_date: "October 2012",
    artists: "Brent Engstrom, Joe Simko, David Gross, Layron DeJarnette, Tom Bunk, John Pound",
    notable: "The first GPK set since the Flashback era. Introduced a new generation of characters while keeping the classic A/B format.",
    description: "Brand New Series 1 kicked off a fresh chapter for GPK with 110 base stickers (55 pairs). Pop culture parodies ramped up with cards referencing Jersey Shore, Angry Birds, and more. The modern GPK art style solidified here with Brent Engstrom and Joe Simko leading the way.",
    imageFolder: "bns1",
    cards: [
      ["1","D. Jay","Dee J."],["2","Nate Inflate","Balloony Bart"],["3","Picky Nicky","Pocketing Palmer"],["4","Lifted Linda","Smoothed Sally"],["5","Steve Rotters","Calvin America"],["6","Lasso Luke","Duke Ranch"],["7","Ear Bud","Waxy Wesley"],["8","Bob Sled","Crashed Craig"],["9","Sushi Seth","Chopped Chad"],["10","Tooth Mary","Fiona Fairy"],["11","Sawing Sal","Musical Mike"],["12","Angry Al","Birdbrain Bruce"],["13","Chalk Linus","Crime Scene Dean"],["14","Laundro Matt","Clean Gene"],["15","Doughy Zoe","Snotty Sally"],["16","Jammin' Julie","Jenny Jelly"],["17","Rubber Roy","Bouncing Bert"],["18","Taffy Toby","Pulled Pierre"],["19","Sammy Stooge","Triple Ted"],["20","Relay Trey","Racin' Ricky"],["21","Hank Bank","Piggy Peyton"],["22","Screaming Stuart","Terrified Terence"],["23","Super Manny","Airsick Vick"],["24","Tricky Tracy","Hallow Wendy"],["25","Larry Lo Mein","Takeout Tyler"],["26","Academy Ward","Grouchy Oscar"],["27","Tina Trapeze","Aerial Alice"],["28","Jersey Jeff","Situational Stan"],["29","Brice Lice","Infested Ian"],["30","Complex Rex","Water Lou"],["31","Filin' Phyllis","Manicure Margaret"],["32","Twisted Tom","Salty Sean"],["33","Ray Spray","Brutal Barry"],["34","3-D Stevie","Realistic Ralph"],["35","Jack Snack","Vending Vinnie"],["36","Facial Harry","Bearded Brent"],["37","Vulgar Venus","Stony Steph"],["38","Thunder Todd","Lightning Les"],["39","Flatfoot Frank","Doggy Dennis"],["40","Pasty Pierce","Rolled Up Ronald"],["41","Jez Dispenser","Candy Sandy"],["42","Contact Carl","Eyeball Paul"],["43","Crystal Ball","Fortune Terra"],["44","Trashy Trixie","Dustbin Daphne"],["45","Messy Mario","Lewd Luigi"],["46","Proportional Pat","Limber Leonardo"],["47","Grillin' Greg","Hotdog Harris"],["48","Cannon Bill","Explosive Earl"],["49","Marshy Mel","Gooey Hughie"],["50","Pete Sheet","Boo Bradley"],["51","Tug Of Warren","Stretched Saul"],["52","Snowy Joey","Blizzard Blake"],["53","Clipper Claire","Toenail Teresa"],["54","Fried Frieda","Fishy Florence"],["55","Will Street","Juan Percent"],
    ],
  },
  {
    name: "Brand New Series 2", year: 2013, series: "Brand New Series",
    release_date: "March 2013",
    artists: "Brent Engstrom, Joe Simko, David Gross, Layron DeJarnette, Tom Bunk",
    notable: "Card numbering continues from BNS1 (56-128). Card 96 'Booger Barack' is a parody of President Obama. Card 128 brings back Adam Bomb.",
    description: "BNS2 is the largest Brand New Series set with 146 base stickers (73 pairs), continuing the numbering from BNS1. Heavy on political and pop culture parodies. Adam Bomb returns as card 128 and classic characters like Nasty Nick and Weird Wendy get modern updates.",
    imageFolder: "bns2",
    cards: [
      ["56","Mel Tin","Marsh Marlow"],["57","Chocolate Bonnie","Esther Bunny"],["58","Surf's Up Chuck","Regurgi Tate"],["59","Chalky Chester","Cringing Carl"],["60","i Padme","Colleen Screen"],["61","Capped Calvin","Robed Rob"],["62","Knot Ned","Troy Scout"],["63","Chamel Leon","Blendin' Brendan"],["64","Sleep Les","Insomniac Zack"],["65","Charlie Down","Peanut Paul"],["66","Brad Apple","Apple A Ray"],["67","Egg Sheldon","Cracked Chris"],["68","8-Biff","Pixelated Perry"],["69","Sliding Sophie","Separated Samantha"],["70","Blown-Up Bruce","Smashing Stan"],["71","Frida Spirit","Tie Dyna"],["72","Fred Case","Hidden Herman"],["73","Roll-Up Ralph","Frank Fruit"],["74","Sketched Sal","Etched Eric"],["75","Goldie Locks","Pauline Pudding"],["76","Tongue Ty","Licky Mickey"],["77","Instant Wynn","Lotto Otto"],["78","Nicole Troll","Orange Gina"],["79","Misfired Merlin","Spell Castor"],["80","Piranha Finn","Devoured Howard"],["81","Allen Formation","Jose Hoax"],["82","Tad Tris","Puzzled Parker"],["83","Dominated David","Little Lance"],["84","Surprisin' Steph","Toilet Trish"],["85","Sheepish Seth","Wade Wolf"],["86","Blake Rake","Hit Mitt"],["87","Kool Aiden","Pitcher Pierre"],["88","Grating Gary","Parma John"],["89","Jake Mistake","Dwight Out"],["90","Mixed-Up Michelangelo","Disordered Donatello"],["91","Shane Shovel","Sandy Andy"],["92","Peter Pain","Shad Ow"],["93","Cheese Louise","Lin Berger"],["94","Straw Barry","Deface Chase"],["95","Drummed Dennis","Bongo Bart"],["96","Booger Barack","Handy Hussein"],["97","Luau Luann","Peg Roast"],["98","Firey Francis","Reptillian Killian"],["99","Dee Seeded","Grace Vine"],["100","Abduct Jed","Take Ken"],["101","Nasty Nick","Garlic Rick"],["102","Buggy Betty","Squashed Sophia"],["103","Gene E.","Grant Wishes"],["104","Drippy Dan","Watery Wyatt"],["105","Weird Wendy","Wicked Wanda"],["106","Roller Debbie","Kate Skate"],["107","Oliver Twisted","Brett Towel"],["108","Grim Jim","Last Leg Lenny"],["109","Charming Chessie","Jeweled Julia"],["110","Doug Plug","Trey Spray"],["111","Fishy Phyllis","Tuna Nettie"],["112","Leafy Larry","Waterin' Walter"],["113","Guillo Tina","Headless Harriet"],["114","Haunted Forrest","Tim Ber"],["115","Duster Dorothy","Taylor Twister"],["116","Dead Ted","Deliver Roy"],["117","Green Dean","Vicious Venus"],["118","Matt Hatter","Tea Time Terence"],["119","Joel Hole","Peyton Paddle"],["120","Ali Gator","Skinned Sam"],["121","Leo Tamer","Cir Gus"],["122","Cute Tippi","Eerie Erin"],["123","Hector Collector","Hoardin' Jordan"],["124","Gargoyle Doyle","Stone Sculpture"],["125","Ill Jill","Mothy Martha"],["126","Curt The Rope","Halfed Harry"],["127","Pat Of Gold","Lepre Shaun"],["128","Adam Bomb","Protestin' Preston"],
    ],
  },
  {
    name: "Brand New Series 3", year: 2013, series: "Brand New Series",
    release_date: "October 2013",
    artists: "Brent Engstrom, Joe Simko, David Gross, Layron DeJarnette",
    notable: "Continues the BNS numbering (129-194). Features classic character callbacks like Cranky Frankie, Bony Joanie, and Eerie Eric alongside new characters.",
    description: "BNS3 closes out the Brand New Series with 132 base stickers (66 pairs). The set mixes new characters with updated versions of OS classics — Cranky Frankie, Potty Scotty, Bony Joanie, and more get the modern treatment. Card 193 'Max Stacks' references the original OS7 character.",
    imageFolder: "bns3",
    cards: [
      ["129","Dodge Bill","Jim Class"],["130","Coughed Up Kitty","Hairball Mol"],["131","Hoodie Harlan","Inside Out Oscar"],["132","Alarm Clark","Snoozin' Sebastian"],["133","Gloomy Gus","Sad Seth"],["134","Lucky Luke","Numbered Nate"],["135","Miming Miles","Shadowy Stan"],["136","Fishing Lauren","Baited Brooklyn"],["137","Yeti Eddie","Abominable Abe"],["138","Bumper Carl","Amusement Parker"],["139","Opti Cal","Leggy Liam"],["140","Bellowing Bella","Loud Melody"],["141","Clay Dreidel","Dizzy Devin"],["142","Bouncy Brody","Inflated Ian"],["143","Pottery Peggy","Booger Brenda"],["144","Pearl Oyster","Precious Jewel"],["145","Parchute Pat","Divin' Damian"],["146","Sawing Sally","Laurie Logs"],["147","Sammy Salmon","Upton Stream"],["148","Halved Henry","Evil Edward"],["149","Disjoint Ted","Let Go Lenny"],["150","Revolving Ryan","Stretched Stefan"],["151","Worn-Out Warren","Discarded Derrick"],["152","New Year's Eve","Dropped Deb"],["153","Mike Craft","Avalanche Albert"],["154","Betty Bug","Infested Isabel"],["155","Shane Saw","Chain Sawyer"],["156","Bedazzled Brianna","Rhinestone Rachel"],["157","Loch Nessie","Cryptid Crissie"],["158","Lost Lewis","Found Flynn"],["159","Tape Dis Spencer","Packing Tate"],["160","Toilet Tommy","Creature Connor"],["161","Lovestruck Chuck","Lovesick Nick"],["162","Fresh Fred","Scented Simon"],["163","Bea Hive","Honey Haley"],["164","Lisa Miserables","Raggy Anne"],["165","Bertha Day","Frances Frosting"],["166","Periscope Hope","Submerged Susannah"],["167","Stuffed Steve","Packed Zack"],["168","Hangman Hank","Larry Letters"],["169","Crabby Abby","Sea Shelly"],["170","Dunked Darren","Don Nut"],["171","Pop-Up Paula","Turned Paige"],["172","Cat Lady","Feline Farrah"],["173","Nutty Noah","Shelled Sergio"],["174","Cranky Frankie","Terrible Terence"],["175","Launched Lance","Doomed Diego"],["176","Bony Joanie","Blind Date Danielle"],["177","Menacing Dennis","Bratty Brent"],["178","Potty Scotty","Flushed Francis"],["179","Tasted Tony","Eaten Ethan"],["180","Graffiti Petey","Fine Art"],["181","Cut Kanye","Sylvester Shutter"],["182","Mad Max","Brain-Dead Jed"],["183","Disjointed Jason","Torn Rip"],["184","Horsey Henry","Equine Ethan"],["185","Party Paulie","Popped Ivan"],["186","Eerie Eric","Heartthrob Harry"],["187","Warrin' Loren","Clotheslined Caleb"],["188","Large Marge","Bulky Beth"],["189","Chimney Chad","Third Degree Bernie"],["190","Roy Bot","Mechanic Al"],["191","Kangaroo Katie","Pouched Polly"],["192","Tiny Tim","Mini Martin"],["193","Max Stacks","Heady Hal"],["194","Garden Norm","Lawn Sean"],
    ],
  },
];

async function seed() {
  console.log(`Seeding ${sets.length} Brand New Series sets...\n`);
  for (const setDef of sets) {
    const { data: existing } = await supabase.from("sets").select("id").eq("name", setDef.name).single();
    if (existing) { console.log(`  ${setDef.name} already exists, skipping`); continue; }
    const { data: newSet, error: setError } = await supabase.from("sets").insert({
      name: setDef.name, year: setDef.year, series: setDef.series, total_cards: setDef.cards.length * 2,
      release_date: setDef.release_date, artists: setDef.artists, notable: setDef.notable, description: setDef.description,
    }).select().single();
    if (setError) { console.error(`  Failed: ${setDef.name}:`, setError.message); continue; }
    const BASE = "https://www.geepeekay.com/gallery";
    const cardRows: Record<string, unknown>[] = [];
    for (const [num, nameA, nameB] of setDef.cards) {
      cardRows.push({ set_id: newSet.id, number: `${num}a`, name_a: nameA, name_b: null, image_url_a: `${BASE}/${setDef.imageFolder}/${setDef.imageFolder}_${num}a.jpg`, image_url_b: null, is_parallel: false });
      if (nameB) cardRows.push({ set_id: newSet.id, number: `${num}b`, name_a: nameB, name_b: null, image_url_a: `${BASE}/${setDef.imageFolder}/${setDef.imageFolder}_${num}b.jpg`, image_url_b: null, is_parallel: false });
    }
    for (let i = 0; i < cardRows.length; i += 50) {
      const { error } = await supabase.from("cards").insert(cardRows.slice(i, i + 50));
      if (error) console.error(`  Batch error for ${setDef.name}:`, error.message);
    }
    console.log(`  ✓ ${setDef.name} (${setDef.year}): ${cardRows.length} cards`);
  }
  console.log("\nDone!");
}
seed();
