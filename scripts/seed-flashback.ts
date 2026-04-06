// Seeds Flashback Series 1-3
// Run: npx tsx scripts/seed-flashback.ts (with env vars exported)

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

interface SetDef {
  name: string; year: number; series: string; release_date: string; artists: string; notable: string; description: string; imageFolder: string;
  cards: [string, string, string][];
}

const sets: SetDef[] = [
  {
    name: "Flashback Series 1", year: 2010, series: "Flashback Series",
    release_date: "February 2010",
    artists: "John Pound, Tom Bunk, James Warhola, Brent Engstrom, Joe Simko, David Gross",
    notable: "Reprints classic OS cards with updated artwork alongside brand new characters. Cards 66-70 are new 'Where Are They Now' characters, and 71-80 are reprinted OS classics.",
    description: "Flashback Series 1 bridges old and new — featuring 65 base pairs plus bonus 'Where Are They Now' and reprinted classic OS cards. A nostalgia-driven set that brought original series favorites back with fresh art while introducing new characters.",
    imageFolder: "fb1",
    cards: [
      ["1","Nasty Nick","Evil Eddie"],["2","Dead Ted","Jay Decay"],["3","Adam Bomb","Blasted Billy"],["4","Tee-Vee Stevie","Geeky Gary"],["5","Potty Scotty","Jason Basin"],["6","Corroded Carl","Crater Chris"],["7","Bony Joanie","Thin Lynn"],["8","New Wave Dave","Graffiti Petey"],["9","Sy Clops","One-Eyed Jack"],["10","Rappin' Ron","Ray Gun"],["11","Double Heather","Fran Fran"],["12","Russell Muscle","Brett Sweat"],["13","Spacey Stacy","Janet Planet"],["14","Shrunken Ed","Cheeky Charles"],["15","Ghastly Ashley","Acne Amy"],["16","Split Kit","Mixed-Up Mitch"],["17","Joe Blow","Rod Wad"],["18","Hot Head Harvey","Roy Bot"],["19","Dinah Saur","Farrah Fossil"],["20","Blake Flake","Hippie Skippy"],["21","Ali Gator","Marshy Marshall"],["22","Silent Sandy","Barren Aaron"],["23","Starin' Darren","Peepin' Tom"],["24","Half-Nelson","Glandular Angela"],["25","Armpit Britt","Shaggy Aggie"],["26","Sloshed Josh","Low Cal"],["27","Stuffed Stephen","Rutherford B. Hay"],["28","Swollen Sue Ellen","Bloated Blair"],["29","Max Axe","Deadly Dudley"],["30","Alien Ian","Outerspace Chase"],["31","Baked Jake","Dry Guy"],["32","Losin' Faith","Dyin' Dinah"],["33","Handy Randy","Jordan Nuts"],["34","Nat Nerd","Clark Can't"],["35","Meltin' Milton","Lazy Louie"],["36","Moe Skeeto","Sting Ray"],["37","Fran Furter","Hot Doug"],["38","Dangling Dolly","Surreal Neal"],["39","Fluoride Floyd","Dental Daniel"],["40","Toothie Ruthie","Dental Flossie"],["41","Over Flo","Moist Joyce"],["42","Joel Hole","Teed-Off Tom"],["43","Upliftin' Clifton","Air-Head Jed"],["44","Tiny Tim","Small Saul"],["45","Bea Sting","Screaming Mimi"],["46","Claire Stare","Bloodshot Scott"],["47","Harry Canary","Burt Cage"],["48","Marc Spark","Cherry Bomb"],["49","Milky Wayne","Dairy Cari"],["50","On The Mark","Bull's Ira"],["51","Cut-Up Carmen","Dotted Lionel"],["52","Curly Shirley","Blown Joan"],["53","Have A Nice Dave","Miles Smiles"],["54","Soured Howard","Paul Bunion"],["55","Manny Heads","Max Stacks"],["56","Grant Ant","Sticky Nikki"],["57","Bowling Elaine","Mike Strike"],["58","Heartless Hal","Bowen Arrow"],["59","Moe Bile","Dang Len"],["60","Haley's Vomit","Inter Stella"],["61","K.O.'d Karl","Sparrin' Warren"],["62","Waffle Ira","Griddled Greta"],["63","Leather Heather","Chained Shane"],["64","Glowing Amber","Bright Dwight"],["65","Pickled Pete","Formaldehyde Fred"],["66","Baby Abie","Lincoln Park"],["67","Global Warren","Al Pocalypse"],["68","Stitched Stella","Patchwork Paula"],["69","Raisin' Ella","Grape Vi"],["70","Finger-Paintin' Fifi","Libby Stick"],["71","Nasty Nick","Evil Eddie"],["72","Adam Bomb","Blasted Billy"],["73","Boozin' Bruce","Drunk Ken"],["74","Tee-Vee Stevie","Geeky Gary"],["75","Cranky Frankie","Bad Brad"],["76","Bony Joanie","Thin Lynn"],["77","Split Kit","Mixed-Up Mitch"],["78","Hot Head Harvey","Roy Bot"],["79","Babbling Brooke","Jelly Kelly"],["80","Nat Nerd","Clark Can't"],
    ],
  },
  {
    name: "Flashback Series 2", year: 2011, series: "Flashback Series",
    release_date: "February 2011",
    artists: "John Pound, Tom Bunk, James Warhola, Brent Engstrom, Joe Simko, David Gross, Layron DeJarnette",
    notable: "Card 41 features Hector Collector / G.P. Kay — a meta-reference to the geepeekay.com website itself.",
    description: "Flashback Series 2 continues the formula of mixing classic OS reprints with new characters. 65 base pairs plus bonus cards, with the 'Where Are They Now' subset returning. Features a deep cut of OS favorites from across all 15 original series.",
    imageFolder: "fb2",
    cards: [
      ["1","Junkfood John","Ray Decay"],["2","Stormy Heather","April Showers"],["3","Weird Wendy","Haggy Maggie"],["4","Cranky Frankie","Bad Brad"],["5","Creepy Carol","Scary Carrie"],["6","Kim Kong","Anna Banana"],["7","Wrappin' Ruth","Tommy Tomb"],["8","Patty Putty","Muggin' Megan"],["9","Smelly Kelly","Doug Plug"],["10","Leaky Lindsay","Messy Tessie"],["11","Mad Donna","Nutty Nicole"],["12","Jolted Joel","Live Mike"],["13","Jolly Roger","Pegleg Peter"],["14","Sewer Sue","Michelle Muck"],["15","Hurt Curt","Pat Splat"],["16","Drew Blood","Bustin' Dustin"],["17","Bruised Lee","Karate Kate"],["18","Beaky Becky","Picky Mickey"],["19","Eerie Eric","Berserk Kirk"],["20","Babbling Brooke","Jelly Kelly"],["21","Apply Cory","Dwight Bite"],["22","Second Hand Rose","Trashed Tracy"],["23","Bony Tony","Unzipped Zack"],["24","Amazin' Grace","Muscular Molly"],["25","Hairy Harriet","Bushy Bernice"],["26","Warrin' Warren","Brett Vet"],["27","Yicchy Mickey","Barfin' Bart"],["28","Gored Gordon","No Way Jose"],["29","Dee Faced","Terri Cloth"],["30","Sprayed Wade","Tagged Tad"],["31","Diaper Dan","Pinned Penny"],["32","Lucas Mucus","Dotty Dribble"],["33","Dangling Dolly","Surreal Neal"],["34","Michael Mutant","Zeke Freak"],["35","Deaf Geoff","Audio Augie"],["36","Intense Payne","First Ada"],["37","Tom Thumb","Bridget Digit"],["38","Joan Clone","Warty Ward"],["39","Ugly Hans","Jan Hand"],["40","John John","Flushing Floyd"],["41","Hector Collector","G.P. Kay"],["42","Many Lenny","Lotta Carlotta"],["43","Mickey Mouths","Oral Laurel"],["44","Adam Boom","Blasted Billy II"],["45","Pete Seat","Noel Bowl"],["46","Elastic Elwood","Fletcher Stretcher"],["47","Shut-Up Sherwin","Filled Up Philip"],["48","Alien Alan","Martian Marcia"],["49","Haley Comet","June Moon"],["50","Explorin' Norman","Drillin' Dylan"],["51","Divin' Ivan","Walter Sport"],["52","Fritz Spritz","Ella P. Record"],["53","Messy Bessie","Unclean Helene"],["54","Lem Phlegm","Gezundt Heidi"],["55","Page Cage","Tommy Ache"],["56","Ortho Donny","Ruth Canal"],["57","Cute Tippi","Waxy Wendy"],["58","Early Bert","Rotten Robin"],["59","Snot Rope Hope","Drippy Debbie"],["60","Con Vic","Al Catraz"],["61","Clark Shark","Manny Eater"],["62","Beasty Boyd","Semi Colin"],["63","3-Dee","Blurry Blair"],["64","Dent Al","Fluoride Ida"],["65","Scalped Ralph","Bone-Head Fred"],["66","Slammed Sloan","Keith Out"],["67","Scrawled Saul","Bad Art"],["68","Noah Parking","Peter Meter"],["69","Dead Flora","Fetid Fern"],["70","Idol Ira","Ken Tiki"],["71","Potty Scotty","Jason Basin"],["72","Ghastly Ashley","Acne Amy"],["73","Jolly Roger","Pegleg Peter"],["74","Greaser Greg","Chris Hiss"],["75","Smelly Sally","Fishy Phyllis"],["76","New Wave Dave","Graffiti Petey"],["77","Ultra Violet","Tanya Hide"],["78","Barfin' Barbara","Valerie Vomit"],["79","Wacky Jackie","Loony Lenny"],["80","Half-Nelson","Glandular Angela"],
    ],
  },
  {
    name: "Flashback Series 3", year: 2011, series: "Flashback Series",
    release_date: "November 2011",
    artists: "John Pound, Tom Bunk, James Warhola, Brent Engstrom, Joe Simko, David Gross",
    notable: "The final Flashback set. Card 62b 'Semi Colin' references the famous OS9 error card — a callback within a callback.",
    description: "The third and final Flashback set wraps up the series with 66 base pairs plus bonus reprints. Deep cuts from OS3-OS15 get the spotlight alongside new characters, closing out the Flashback era before the Brand New Series began.",
    imageFolder: "fb3",
    cards: [
      ["1","Up Chuck","Heavin' Steven"],["2","Fryin' Brian","Electric Bill"],["3","Boozin' Bruce","Drunk Ken"],["4","Wacky Jackie","Loony Lenny"],["5","Buggy Betty","Green Jean"],["6","Mean Gene","Joltin' Joe"],["7","Disgustin' Justin","Vile Kyle"],["8","Fryin' Ryan","Charred Chad"],["9","Tommy Gun","Dead Fred"],["10","Clogged Duane","Bye Bye Bobby"],["11","Greaser Greg","Chris Hiss"],["12","Gorgeous George","Dollar Bill"],["13","Juicy Jessica","Green Dean"],["14","Smelly Sally","Fishy Phyllis"],["15","Snooty Sam","U.S. Arnie"],["16","Alice Island","Liberty Libby"],["17","Broad Maud","Large Marge"],["18","Hugh Mungous","King-Size Kevin"],["19","Ashley Can","Greta Garbage"],["20","Dale Snail","Crushed Shelly"],["21","Whisperin' Woody","Van Triloquist"],["22","Shorned Sean","Hy Gene"],["23","Richie Retch","Luke Puke"],["24","Willie Wipe-Out","Spencer Dispenser"],["25","Doughy Joey","Starchy Archie"],["26","Ultra Violet","Tanya Hide"],["27","See More Seymour","Coy Roy"],["28","Otto Whack","Elliot Mess"],["29","Monte Zuma","Pagan Megan"],["30","Newly-Dead Ed","Dyna Mike"],["31","Barfin' Barbara","Valerie Vomit"],["32","Gooey Huey","Bobbi Booger"],["33","Vincent Van Gone","Modern Art"],["34","Short Mort","Noah Body"],["35","Bloody Mary","Donna Donor"],["36","Buck Puck","Lowell Goal"],["37","Pumping Aaron","Will Explode"],["38","Squashed Josh","Squoze Rose"],["39","Cyril Bowl","Soggy Oggie"],["40","Misty Suds","Amelia Airhead"],["41","Bazooka Joanne","Bubbly Babs"],["42","Trap Dora","Rear View Myra"],["43","Ground Chuck","Lean Jean"],["44","Cracked Sheldon","Wally Walnut"],["45","Barnyard Barney","Dick Hick"],["46","Shootin' Newton","Sherman Tank"],["47","Ripped Fletch","Taped Tate"],["48","Ike Spike","Mason Mace"],["49","Impaled Gail","Magic Wanda"],["50","Sally Suction","Teethin' Trina"],["51","Ball 'N Shane","Hard Rocky"],["52","Upset Tommy","Tub O' Lars"],["53","Chiseler Chad","Julius Sneezer"],["54","Dead Letter Debbie","Maimed Mamie"],["55","Seymour Barf","Kent Stand It"],["56","Barfin' Marvin","Over Etan"],["57","Fun Gus","Warty Morty"],["58","Howie Hanging","Rush Hour Russ"],["59","Rocco Socko","Destroyed Boyd"],["60","Doomsday Dom","A-Bomb Tom"],["61","Dial-A-Twyla","Phone Bella"],["62","Burnt-Out Brett","Burne Toast"],["63","Take-Out Dinah","Chow Mame"],["64","Slimy Hymie","Crawlin' Rollin"],["65","Picky Nick","Beulah Ghoul"],["66","Claude Flesh","Slasher Asher"],["67","Prickly Pete","Thorny Barb"],["68","Arach Ned","Web Jeb"],["69","Shadowy Shelia","Vaporized Val"],["70","Dunkin' Duncan","Will Hung"],["71","Stormy Heather","April Showers"],["72","Jolted Joel","Live Mike"],["73","Phony Lisa","Mona Loser"],["74","Bony Tony","Unzipped Zack"],["75","Alien Ian","Outerspace Chase"],["76","Jack O. Lantern","Duncan Pumpkin"],["77","Toothie Ruthie","Dental Flossie"],["78","Chris Mess","Sandy Clod"],["79","Scalped Ralph","Bone-Head Fred"],["80","Bern-Out","Dim-Bulb Bob"],
    ],
  },
];

async function seed() {
  console.log(`Seeding ${sets.length} Flashback sets...\n`);
  for (const setDef of sets) {
    const { data: existing } = await supabase.from("sets").select("id").eq("name", setDef.name).single();
    if (existing) { console.log(`  ${setDef.name} already exists, skipping`); continue; }

    const { data: newSet, error: setError } = await supabase.from("sets").insert({
      name: setDef.name, year: setDef.year, series: setDef.series, total_cards: setDef.cards.length * 2,
      release_date: setDef.release_date, artists: setDef.artists, notable: setDef.notable, description: setDef.description,
    }).select().single();

    if (setError) { console.error(`  Failed: ${setDef.name}:`, setError.message); continue; }

    const BASE = "https://www.geepeekay.com/gallery";
    const cardRows = [];
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
