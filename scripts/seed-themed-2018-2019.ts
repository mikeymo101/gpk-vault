// Seeds We Hate the 80s, Oh the Horror-ible, We Hate the 90s, Revenge of Horror-ible
// Run: npx tsx scripts/seed-themed-2018-2019.ts

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const sets = [
  {
    name: "We Hate The 80s", year: 2018, series: "Themed Sets",
    release_date: "January 2018", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "13 subsets celebrating (mocking) 1980s pop culture — Cartoons, Celebrities, Culture, Fashion, History, Movies, Sitcom (The Goldbergs), Toys, TV Shows, and Video Games.",
    description: "We Hate The 80s is a nostalgia-fueled set parodying everything from the 1980s — He-Man, Pac-Man, Madonna, Reagan, The Breakfast Club, and more. Each of the 13 subsets covers a different aspect of 80s culture. The Sitcom subset is dedicated entirely to The Goldbergs TV show.",
    imageFolder: "80s", cards: [
      // 80s Cartoons
      ["1","He-Manny","Skele-Tor"],["2","She-Rae","Adored Adora"],["3","Otto Boot","Optimus Fine"],["4","Masked Matt","Trucked-Over Trakker"],["5","Jen Gem","Jerrica Jewel"],["6","Garga Mel","Papa Murph"],["7","Strawberry Jeri","Short Kate"],["8","Rainbow Raine","Brite Bridgit"],["9","Mona-Chhichi","Pat-Chitt"],
      // 80s Celebrities
      ["10","Pint-Size Prince","Purple Rayne"],["11","Mole Donna","Material Gal"],["12","Brock Of Seagulls","Mike Soar"],["13","Gruesome Gallagher","Walter Melon"],["14","Mary Merch","Licensed Lou"],["15","Rapid Richard","Sweatin' Simmons"],["16","Bob Gross","Happy Tre"],["17","Footy Fred","Rotten Roger"],["18","El-Vera","Missie-Tress Of The Dark"],
      // 80s Culture
      ["19","Newt Cola","Back L. Ash"],["20","Neon Art","Futuristic Ric"],["21","Loathsome Lisa","Foul Frankie"],["22","Trapped Tracy","Kept Kate"],["23","Floppy Dirk","Diskette Yvette"],["24","Sal Phone","Motor Nola"],["25","Blocked Buster","V.H. Essa"],["26","Walk Mannie","Cass-Ette"],["27","Mixed Tate","Reese-Wind"],
      // 80s Fashion
      ["28","Big Hair Sher","Hairy Geri"],["29","Shoulder Pat","Puffy Paula"],["30","Peg Warmers","Dancewear Tere"],["31","Slappy Stephie","Bracelet Janette"],["32","Harry Metal","Glam-Met Al"],["33","Flattop Aesop","Flat Matt"],["34","Break-Lance","Headspin Finn"],["35","Kirk Cardigan","Popped Cole R."],["36","Fashion Abel","Watchin' Wally"],
      // 80s History
      ["37","Burl N. Wall","Wrecked Ronald"],["38","No-No Nancy","Rippin' Reagan"],["39","Messy Mikhail","Gross Gorbachev"],["40","Obstructin' Ollie","Know-Nothin' North"],["41","Cold Warren","Nuclear Escala-Sean"],["42","Hans Across America","Handy Andy"],["43","Milk Carlton","Have You Seen Mia"],["44","Oily Oliver","Spilled Spence"],["45","Ozone Holly","Oz Zone Depletion"],
      // 80s Movies
      ["46","Batty Manny","Bonkers Bruce"],["47","Parker-Geist","Anne Apparition"],["48","Karate Kit","Ralph \"Macho\""],["49","Breakfast Bender","Club Claire"],["50","Old Time Rock & Roland","Tom Cruisin'"],["51","Dirty Dana C.","Patrick Sprayzy"],["52","Flashy Denice","Barfed-On Beals"],["53","Sawyer Anything","Jolted John"],["54","Sixteen Candice","Melting Molly"],
      // 80s TV
      ["55","Fran-ggle Rocked","Rumpled Rocky"],["56","Axed Max","Head Les"],["57","Pee Wee Hurtin'","Harmed Herman"],["58","Double Darren","Marc Bummers"],["59","Blissful Balki","Livid Larry"],["60","Tre Is Company","Smacked Jack"],["61","Claire S. The Beef","Cow Patty"],["62","Crime Doug","Bite-Outta Otto"],["63","Dominic Pizza","Annoy-Ed"],
      // 80s Video Games
      ["64","Centi-Pete","Ar-Cade"],["65","At-Ari","Control Joel"],["66","Coil Lee","Beaten Bert"],["67","Deepak-Man Fever","Pac-Manny"],["68","Drunky Konrad","Kay Kong"],["69","Marsh Room","Todd Stool"],["70","Duck Hunter","Smug Doug"],["71","Burger Tim","Jam-Packed Peter"],["72","Dig Doug","Inflate Tate"],
      // 80s Toys
      ["73","Muscle Manny","Rub-Bert"],["74","Mad Paul","Matt Ball"],["75","Dee & D.","Don-geon Master"],["76","Pet Monster","My Pet Monroe"],["77","Mutila-Ted","Rux-Finn"],["78","Flo Worm","Glowing Gloria"],["79","Wacky Wendy","Wall Wanda"],["80","Sy-mon","Leo Lights"],["81","Skippy-It","Ankle Angel"],
      // 80s Sitcom (Goldbergs)
      ["82","A.V. Adam","Grand Goldberg"],["83","Adolescent Adam","Still-Growing Goldberg"],["84","Adult/Child Adam","Groaning Goldberg"],["85","Berserk Barry","Galled Goldberg"],["86","Eighties Erica","Garrulous Goldberg"],["87","Big-Hearted Beverly","Generous Goldberg"],["88","Manly Murray","Gruff Goldberg"],["89","Avoidance Albert","Slipping-Away Soloman"],["90","Rebound Rick","Mid-Range Mellor"],
    ],
  },
  {
    name: "Oh, The Horror-ible!", year: 2018, series: "Themed Sets",
    release_date: "September 2018", artists: "Brent Engstrom, Joe Simko, David Gross, Niel Camera, Layron DeJarnette, JungHwa Im, Miran Kim, Smokin' Joe McWilliams",
    notable: "13 horror subsets spanning 80s Horror, 80s Sci-Fi, Modern Horror, Modern Sci-Fi, Classic Film Monster, Retro Horror, Retro Sci-Fi, and Folklore Monster. 8 color parallels including new Jelly Purple.",
    description: "Oh, The Horror-ible! is a horror-lover's dream set with 13 subsets covering every era and sub-genre of horror and sci-fi film. From Freddy Krueger to Alien, from classic Universal monsters to modern IT — every horror icon gets the GPK treatment.",
    imageFolder: "horror", cards: [
      // 80s Horror (first 15)
      ["1","Pin Ed","Hell Fraiser"],["2","Horrific Vic","Potted Grant"],["3","Gem and I","Shining Sheila"],["4","Beetle Bruce","Mucky Michael"],["5","Insomni Zach","Unfriendly Freddy"],["6","Grim Lynn","Midnight Jack"],["7","Joyless Jason","Frye Day"],["8","Chet Sematary","Nine Lives Louis"],["9","Were-Wolfgang","Lon Don"],["10","Creep-Joe","Creepy Carl"],["11","Half Ash","Bipolar Bruce"],["12","Jack Frost","Shining Shia"],["13","Tar Manny","Living Ed"],["14","Dale from the Crypt","Chris Keeper"],["15","Children of the Bjorn","Cornelius Cob"],
      // 80s Sci-Fi (10)
      ["16","Sammy Swamp","Swamp Bing"],["17","Living Levi","Obey Jay"],["18","Morphing Murphy","Fly Guy"],["19","Dexter Terrestrial","Crash Landon"],["20","Alien Life Norm","Gorged on Gordon"],["21","Rita Reptillian","Venomous Venessa"],["22","Snake Jake","Kurt Tussle"],["23","Robin's Egg","Hatched Hal"],["24","Mac Ready","Repulsed Russel"],["25","Brad Taste","Pickin' Peter"],
      // Modern Horror (15)
      ["26","Candy Dan","Swarmin' Norman"],["27","Heavy Handed Harvey","Rippin' Pippin"],["28","Bubble Blair","Snot Dot"],["29","Ouija Walt","Plan Chet"],["30","Selfie Georgie","Predatory Penny"],["31","Happy Death Dave","Abby Birthday"],["32","Pig Head Ed","Sawed Claud"],["33","Lepre Shaun","Rain Bo"],["34","Handed Over Hanibal","Deliver Ray"],["35","Ring Leeda","Ramona Control"],["36","Trem-Murray","Grant-Boid"],["37","Uma Centipede","Centi Peta"],["38","Puppet Mas-Sterling","Wade Blade"],["39","Mute Michael","Hollow Dean"],["40","Kris Krampus","Satan Nicholas"],
      // Classic Film Monster (15)
      ["41","Nick Nails","Jack Ill"],["42","Lon Loo","Gassy Gaston"],["43","Reflection Les","Bloody Bram"],["44","Jumping Jack","Alive Alvin"],["45","Hairy Mary","Armpit Harriet"],["46","Invisi Bill","Wrapped Ron"],["47","Pharrell-Oah","Bathroom Boris"],["48","Full Moon Boone","Lunar Lon"],["49","Jack Lagoon","Creature Craig"],["50","Askew Lou","Bud Dud"],["51","Monster Mash Nash","Mashed Upton"],["52","Kat People","Irritated Irena"],["53","House of Max","Vaporized Vincent"],["54","Wicked Wanda","Melting Mona"],
      // Retro Horror (15)
      ["55","Rotating Regan","Leaky Linda"],["56","Eraser Ed","Elimi Nate"],["57","Ravaged Rose","Mutilated Mary"],["58","More Tisha","Gory Gomez"],["59","Cautious Carrie","Sicko Sissy"],["60","Chet Hulhu","H. Pete Lovecraft"],["61","Dean of the Dead","Frye Boy"],["62","Great Wyatt","Jawin' Jimmy"],["63","Bill Has Eyes","The Hills Have Ira"],["64","Amy T. Ville","Amity Bill"],["65","The Birdie","Hitch Coco"],["66","The Wicker Stan","Sacraficed Stevie"],["67","Leather Chase","Massacred Matt"],["68","Legendary Gary","Lars of Darkness"],["69","Tom-atoe","Veggie Reggie"],
    ],
  },
  {
    name: "We Hate The 90s", year: 2019, series: "Themed Sets",
    release_date: "January 2019", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "13 subsets covering 90s nostalgia — Cartoons & Comics, Fads, Fashion, Films, Music & Celebrities, Politics & News, Toys, TV, and Video Games. Parodies everything from Nirvana to Jurassic Park to Saved by the Bell.",
    description: "We Hate The 90s covers the entire decade through GPK's gross-out lens. 13 themed subsets parody everything from Rugrats and Ren & Stimpy to Pulp Fiction and The Matrix, from Beanie Babies to the Y2K scare. The Films subset alone has 20 pairs covering every major 90s movie.",
    imageFolder: "90s", cards: [
      // 90s Cartoons & Comics (10)
      ["1","Powdered-Toast Stan","Wrestled Ren"],["2","Doug Rat","Chomped Chucky"],["3","Wranglin' Rocky","Hugh Heifer"],["4","Nick Tick","Spray Ray"],["5","Taylor Moon","Sally Sailor"],["6","Butt Ned","Judged Mike"],["7","M.T. Vee","Oddit-Ty"],["8","Space Chase","Ghostly Gary"],["9","Spawned Shawn","Tied-Up Todd"],["10","Extreme-Lee","Nineties Com-Mick"],
      // 90s Fads (10)
      ["11","Paged Paige","Buzzed Buzz"],["12","Roller Slade","Bladin' Ayden"],["13","Bubble Tate","Bubba Tape"],["14","Got Mike","Milky Jay"],["15","Lunch Abel","Prepackaged Mel"],["16","Bellowing Billy","Fishy Fred"],["17","Bleached Blake","Perry-oxide"],["18","Nate-ster","File Shari"],["19","Tribal Tad","Matt Tats"],["20","Seven Upton","Offensive Orlando"],
      // 90s Fashion (9)
      ["21","Fanny Jack","Annie Pack"],["22","Butterfly Beverly","Clipped Claire"],["23","Scrunched Scarlett","Scrunch Chari"],["24","Over Al","Dunga Reese"],["25","Grunge Greg","Ripped Upton"],["26","Back Ward","Chris Cross"],["27","Reese Boks","Sneak Kerwin"],["28","Plaid Chad","Pat-tern"],["29","Gene Co","Bottom-heavy Levi"],
      // 90s Films (20)
      ["30","Buzzed Bill","Tazed Ted"],["31","Pretty Wonda","Kitty Woman"],["32","Termi Nate","Judgment Dave"],["33","Sleep Les","Tom Winks"],["34","Dancing Wolfgang","Chewed Costner"],["35","Imaginative Edward","Scissor Hans"],["36","Jurassic Parker","Jeff Go Boom"],["37","Arachnophobic Ric","Aran-ophobia"],["38","Halfwit Harry","Laughable Lloyd"],["39","Battlin' Buffy","Slayin' Sarah"],["40","Forrest Chump","Chocolate Chuck"],["41","Independence Dave","Wiped-out Will"],["42","Men in Blake","In the Mark"],["43","Juicy Jules","Royal with Luis"],["44","Jovial Jeff","Livid Lebowski"],["45","Jacked Jack","Froze Rose"],["46","Creative Cameron","Mary Mousse"],["47","Whit's in the Box?","Se7en Devin"],["48","Just Say Neo","Matt-rix"],["49","Fight Bub","Tussling Tyler"],
      // 90s Music (8)
      ["50","Runny Rob","Vanilla Van Winkel"],["51","Courted Kurt","Grunge Roc"],["52","Cannon Belle","Kooky Kim"],["53","Blind Melanie","No Raine"],["54","Spice Gail","Ginger Ginger"],["55","Doug Life","Tattoo Lou"],["56","Dyed Dennis","Rod Man"],["57","Grilled George","Fried Foreman"],
      // 90s Politics (9)
      ["58","Dis-George","Barfin' Bush"],["59","Dum-dum Dan","Mr. Potato Ed"],["60","Stormin' Norman","Scud Buster"],["61","Blastin' Bill","Windy Willy"],["62","Munchin' Mike","Tearin' Ears Tyson"],["63","Passed-through Pierre","Chunnel Charles"],["64","Joy Rider","Pat Finder"],["65","Doppelganger Dolly","Cloned Chloe"],["66","Y2 Kay","Destruct-Sean"],
      // 90s Toys (18)
      ["67","Pin Art","Stuck Chuck"],["68","Trollin' Roland","Shaggy Shawn"],["69","Monty in My Pocket","Neon Leon"],["70","Zvee Bot","Void Boyd"],["71","Maddie Balls","Mad Bill"],["72","Creepy Carl","Crawlin' Cal"],["73","Poggy Oggy","Slammed Sam"],["74","Slip 'N' Clyde","Slidin' Sal"],["75","Socked Jacque","Bopped Bo"],["76","Nerfy Nel","Bowen Arrow"],["77","Hair Bill","Kate Kin"],["78","Bop Kit","Bopped Brent"],["79","American Dolly","Girly Gerri"],["80","Fur Bea","Bad Pet Pete"],["81","Doodle Daryl","Bad Barry"],["82","Benny Baby","Beanie Barbie"],["83","Tommy Gotchi","Digital Dan"],["84","Ticked Elmo","Sesame Skeet"],
      // 90s TV (20)
      ["85","Twila Peaks","Lynched Laura"],["86","Hairy Jerry","Joe About Nothing"],["87","Roseanne Bark","Rancid Rosie"],["88","Trimmed Tim","Wasted Wilson"],["89","Zach Attacks","Ding Dong Dustin"],["90","Cleaved Steve","Fami-Lee"],["91","Will Spray","Fresh Phil"],["92","Boyd Meets World","Clobbered Cory"],["93","Blossom B-Gone","Melt-Away Mayim"],["94","Gladia-Tor","Splatlasphere Pierre"],["95","Doomed David","Munched Mitch"],["96","Dana Saurs","Baby Dino"],["97","Drownin' Dawson","Creaky Crane"],["98","Deep Space Nigel","Quirky Kirk"],["99","Allen Autopsy","Jonathan Fakes"],["100","Afraid of the Mark","Zee-Bo"],["101","Bad Barney","Purple Dino"],["102","Steamed Steve","Hugh's Clueless"],["103","Taylor Tubby","Poe Reception"],["104","Energized Edison","Bonnie Bunny"],
      // 90s Video Games (6)
      ["105","Lopsided Link","Hy-Rule"],["106","Son-Nick","Immo-Bill"],["107","Pete Fighter","Foot Phil"],["108","Mort L. Kombat","Gory Rory"],["109","Nina-tendo 64","Slurpin' Mario"],["110","Poke-Monroe","Catch 'Em Al"],
    ],
  },
  {
    name: "Revenge of Oh, The Horror-ible!", year: 2019, series: "Themed Sets",
    release_date: "September 2019", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore, Niel Camera, Layron DeJarnette",
    notable: "The Horror-ible sequel with 13 subsets: 1980s Horror, Cult Horror, Folklore, Horror Personality, Modern Horror, Retro Horror, and Slasher Film. Parodies Jordan Peele, Stephen King, Hitchcock, and every major horror director.",
    description: "Revenge of Oh, The Horror-ible! digs deeper into horror with expanded Cult Horror (20 pairs) and Slasher Film (15 pairs) subsets. Horror Personality celebrates directors and icons from Hitchcock to Jordan Peele. The set also introduces Folklore monsters including Slenderman, Kraken, and the Jersey Devil.",
    imageFolder: "rhorror", cards: [
      // 1980s Horror (15)
      ["1","Eggy Ellen","R.I.P. Lee"],["2","Rhoda Rage","Plymouth Murray"],["3","Birthday Kate","Reanimated Nate"],["4","Cu- Joe","Rabid Ralph"],["5","Thumb Warren","Ash Vs. Ash"],["6","Branded Brewster","Holy Walter"],["7","Halloween Tre","Melting Melvin"],["8","Lost Boyd","Upside-Down David"],["9","Maxim Overdrive","Hit and Ron"],["10","Homicide El","Cymbal Kimbel"],["11","Rex Wrecks","Rawhead Ted"],["12","Hypodermic Herbert","Re-animate Tor"],["13","Tar Manny","Zom- Brie"],["14","Bobby Gum","Revealing Roddy"],["15","Kill or Be Kilian","Bobby Count"],
      // Cult Horror (20)
      ["16","Electric Alice","Raina Coat"],["17","Basket Casey","Pic Nick"],["18","Green Infer- Noah","Jabbed Justine"],["19","Thud Bud","Sewer Susie"],["20","Critter Chris","Furball Phil"],["21","Dead Alive Clive","Sumatran Dan"],["22","Raoul-ies","Porcelain Rod"],["23","Killed Klyde","Shadow Puppet Pete"],["24","Hans Cuffed","Maniac Zac"],["25","Motel Mel","Hog Wylie"],["26","Jumping Jiang","Misty Vampire"],["27","Kelli Comet","Bam Bam Sam"],["28","Tammy Warp","Cavorting Columbia"],["29","Scanned Stan","Andy Climactic"],["30","Organ Nick","Society Sal"],["31","Barb Wire","Suspiria Mia"],["32","Trapped Travis","Stuck Chuck"],["33","Tiki Dolly","Trilogy of Terry"],["34","Veggie Abel","Sloshy Joshie"],["35","Liv Stick","Vanna Vamp"],
      // Folklore (5)
      ["36","Demon Daimon","Teethy Stevie"],["37","Sam Hain","Wick Ken"],["38","Slender Slade","Tall Paul"],["39","Si- Wren","Fishy Felicia"],["40","Mirror Mary","Betty Brunch"],
      // Horror Personality (15)
      ["41","Jarring Jordan","Panicked Peele"],["42","Joined John","Conflicting Carpenter"],["43","Vincent Slice","Brent and the Pendulum"],["44","Suspenseful Stephen","King of Horror"],["45","Alive Clive","Boxy Barker"],["46","Gorging George","Roaming Romero"],["47","Zach Early","Horace Host"],["48","Torn Del Toro","Gross Guillermo"],["49","Alfred Presents","Hitchcock Flock"],["50","Wicked Wes","Creepy Craven"],["51","Jerked Joebob","Boob Tube Briggs"],["52","Dark Dario","Daring Argento"],["53","Engaging Elvira","Chilling Cassandra"],["54","Transformed Tom","Special Effects Savini"],["55","Raimi of Terror","Silver Screen Sam"],
      // Modern Horror (15)
      ["56","Allen Vs. Predator","Alien Vs. Preda- Tori"],["57","Witchy Winnie","Eva -ary"],["58","Anna Hell","Disturbed Dolly"],["59","Baba Duke","Bob A. Dook"],["60","Sparkling Spaulding","Sid Malicious"],["61","Prancing Penny","Ted Lights"],["62","Crazed Kathy","Biggest Fan Ann"],["63","Pam Labyrinth","Eyeball Paul"],["64","Slithering Sue","Farting Fran"],["65","Grudge Judge","Ju-On Juan"],["66","Noah Visibility","Misty Haze"],["67","Nina Nun","Bad Habit Hannah"],["68","Purge Serge","Sam Spew"],["69","Rick R. Treat","Trick R. Pete"],["70","Johnny in a Bottle","Wish Lester"],
      // Retro Horror (15)
      ["71","Regurgitating Regan","Inner Damon"],["72","Fran Goria","Horror Maggie -Zine"],["73","Ben Head","Zeke Freak"],["74","Notre Damon","Hurtin' Hugo"],["75","Blake -Ula","Van- Pire"],["76","Brody Snatcher","Pod Claude"],["77","Kingston Kong","Jungle Jim"],["78","Martha Moth","Chrissy -Lis"],["79","Dwight Stalker","Say Cheese Carl"],["80","Devilish Damien","Omar Omen"],["81","Dan Tasm","Evil Ira"],["82","Ro- Dan","Birdie Poop"],["83","Blood Tucker","Crooked Kurt"],["84","Vampire Ella","Count Tess"],["85","Village of the Dane","Staring Contessa"],
      // Slasher Film (15)
      ["86","Psycho Patrick","Walt Street"],["87","Chuck Bouquet","Tiffany Topper"],["88","Ground Chuck","Fly the Cooper"],["89","Fractured Francis","Metal Plate Nate"],["90","Figuring Freddy","Estimation Jason"],["91","Jabbed Jason","Bottom of the Blake"],["92","Meditating Michael","Masked Manny"],["93","Hat Chet","Axed Max"],["94","Blood Buddy","Bleeding Heart Art"],["95","Retching Robert","Foul-Mouth Freddy"],["96","Normal Norman","Psycho Killian"],["97","Tre Cycle","Saw Saul"],["98","Reese Charge","Ghost Faith"],["99","Silent Nate","Dead Lee"],["100","Massa- Kirk","Bubba Burger"],
    ],
  },
];

async function seed() {
  console.log(`Seeding ${sets.length} sets...\n`);
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
