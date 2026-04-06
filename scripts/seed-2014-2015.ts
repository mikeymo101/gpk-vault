// Seeds 2014 Series 1 & 2, 2015 Series, and 30th Anniversary
// Run: npx tsx scripts/seed-2014-2015.ts (with env vars exported)

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

interface SetDef {
  name: string; year: number; series: string; release_date: string; artists: string; notable: string; description: string; imageFolder: string;
  cards: [string, string, string][];
}

const sets: SetDef[] = [
  {
    name: "2014 Series 1", year: 2014, series: "2014 Series",
    release_date: "January 2014",
    artists: "Brent Engstrom, Joe Simko, David Gross, Layron DeJarnette",
    notable: "Features Winter Olympics parodies (cards 56-65) and card 66 brings back Adam Bomb with a bobsled twist.",
    description: "The 2014 Series 1 features 132 base stickers (66 pairs) with heavy pop culture and Winter Olympics parodies. Walking Dead, Game of Thrones, and Hunger Games references abound. Adam Bomb closes the set as card 66 alongside Bobsled Ned.",
    imageFolder: "2k14s1",
    cards: [
      ["1","Tic-Tac-Joe","Playful Pablo"],["2","Adventure Tim","Failin' Finn"],["3","Fishbowl Phil","Feeding Fritz"],["4","Freddy the 13th","Bad Luck Chuck"],["5","Conner Stellation","Picked Parker"],["6","Cindy Smella","Gladdis Slipper"],["7","Stung Steve","Poisoned Perry"],["8","Head Butler","Served Sawyer"],["9","Bug Zack","Scorched Scott"],["10","Wanda Sock","Airy Arielle"],["11","Vanilla Kareem","Paste Trey"],["12","Bath Tymon","Cthu Lou"],["13","Runny Ricky","Fleet-footed Frank"],["14","Show Don","Drew Slowly"],["15","Gangnam Kyle","Jumpin' Jae"],["16","Burt House","Stuffed Steph"],["17","Boxed Bill","Locked Luis"],["18","Dull Dorothy","Colorless Colleen"],["19","Ira Booger","Walter E. Eyes"],["20","Jawin' Julie","Da-da Donna"],["21","Origami Tommy","Folded Felix"],["22","Armpit Claire","Braided Britney"],["23","Ellis Vator","Decapi Tate"],["24","Benny Bag","Relaxed Jax"],["25","Ringo Pop","Precious Preston"],["26","Stalked Jack","Ben Stalk"],["27","Rotten Art","Still Leif"],["28","Pained Pete","Smashing Smith"],["29","Condo Minnie","Complex Connie"],["30","T. Rex","Bad Pitch Mitch"],["31","Excali Bert","Sword In The Stone"],["32","Royal Flush Russ","Tyrone Throne"],["33","Bogey Manuel","Monroe In The Closet"],["34","Jake Charmer","Snaky Samir"],["35","Kat Miss","Hungry Jane"],["36","Otto Pus","Scuba Godiva"],["37","Mahmud Flap","Tired Tyler"],["38","Tomb Raedine","Lara Crackers"],["39","Three Wise Monty","See No Evin"],["40","Cerber Gus","Watch Doug"],["41","Che Goo Vara","Picky Pedro"],["42","Lone Lee","Satellite Dwight"],["43","Wendy Chimes","Rattled Ruth"],["44","SplAtlas","Jobe Globe"],["45","Anglin' Andy","Fishy Flora"],["46","Clownin' Clyde","Eyed Ivan"],["47","Dan D. Lion","Dandy Leon"],["48","Wayne N' Moon","Transformin' Norman"],["49","Hy dra","Sammy Serpent"],["50","Taste Bud","Sore Sophie"],["51","Temple Ron","Fecal Francis"],["52","Mustache Max","Barry Barber"],["53","Attractive Albert","Magnetic Mick"],["54","Jenny Fish Sandwich","Jellyfish Sandra"],["55","Walking Ted","Biter Byron"],["56","Kate Skate","Speed Demona"],["57","Skiin' Ian","Downhill Till"],["58","Buck Puck","Ike Hockey"],["59","Hurt Curt","Bailed Bart"],["60","Dizzy Dave","Luke Lutz"],["61","Patty Putty","Luge Luz"],["62","Mean Gene","Biath Lon"],["63","Wrinkly Randy","Curling Sterling"],["64","Frigid Bridget","Nordic Nessie"],["65","Bony Joanie","Skele Tonya"],["66","Adam Bomb","Bobsled Ned"],
    ],
  },
  {
    name: "2014 Series 2", year: 2014, series: "2014 Series",
    release_date: "October 2014",
    artists: "Brent Engstrom, Joe Simko, David Gross, Layron DeJarnette",
    notable: "Continues numbering from 2014 S1 (67-132). Card 119 'G. P. Keir' is another meta-reference to the GPK community.",
    description: "2014 Series 2 completes the year with 132 base stickers (cards 67-132). Pop culture parodies hit hard with Frozen, Duck Dynasty, and Walking Dead references. The set continues the modern GPK tradition of mixing gross-out humor with current trends.",
    imageFolder: "2k14s2",
    cards: [
      ["67","Sharp Shaw","Toothy Tommy"],["68","Scary Tory","Freaky Freda"],["69","Frozen Frank","Ice Trey"],["70","Row Tate","Rollin' Roland"],["71","Must Ash","Crumby Carl"],["72","Connect the Dot","Drawn Dawn"],["73","Skee Bill","Arcarde Jade"],["74","Gauged Gage","Loopy Luke"],["75","Furry Farrah","Foxy Fiona"],["76","Insta Graham","Pola Roy"],["77","Moe Angel","Turned Leif"],["78","Rope Bernie","Gym Jim"],["79","Haunted Howie","Scary Larry"],["80","Jen Ga","Tonya Tower"],["81","Barfy Bart","Projectile Giles"],["82","Nutty Ned","Cracked Mack"],["83","Stony Stephen","Chiseled Chad"],["84","Guiding Dwight","Foggy Augie"],["85","Inside Clyde","Shed Jed"],["86","Shay Sway","Serene Irene"],["87","Duck Cal","Dirk Dynasty"],["88","Hairy Hubert","Nosey Norb"],["89","Bubble Bobby","Popped Pollux"],["90","Back Jack","Schooled Scout"],["91","Door Knox","Knocked Nolan"],["92","Bomb Ed","Bomb Squad Squire"],["93","Rick Grimey","Sheriff Biff"],["94","Airelle Dancer","Inflate Abel"],["95","Mo Moon","Jumpin' Jess"],["96","Krak Ken","Monstrous Mark"],["97","There's Waldo","Found Flint"],["98","Head Brice","Surf Earl"],["99","Tim Skim","Nat Net"],["100","Audacious Andy","Hans Picked"],["101","Mashed Miley","Wrecked Wren"],["102","Eva Lution","Land Walker"],["103","Serena Serpent","Menacing Medina"],["104","Best Bud","Friendly Francis"],["105","Split Krit","Connie Science"],["106","Eyecicle Ira","Eye Cy"],["107","Walter Balloon","Watery Will"],["108","Dee N A","Mad Brad"],["109","Back Harry","Wade Braid"],["110","Mucus Gus","Nintendon't 3 Dennis"],["111","Original Art","One Of Juan"],["112","Eerie Ethan","Hairy Holden"],["113","Hanging Herb","Picture Prescott"],["114","Icy Iris","Cold Colette"],["115","Horse Manny","Heady Hector"],["116","Gerry Rigged","Pat Work"],["117","Jugular Jeff","Pressured Preston"],["118","Wayco Wishbone","Split Spencer"],["119","G. P. Keir","Bright Brian"],["120","Amped Andrea","Surfin' Sophie"],["121","Cuckoo Kevin","Clocked Cloyd"],["122","Swiss Arnie","Loaded Logan"],["123","Quick Lee","Bare Bones Barry"],["124","Knot Ted","Unfreed Reed"],["125","Flo Sing","Dental Diana"],["126","Trey Cycle","Johnny Junior"],["127","Greed Dee","Heinous Hal"],["128","Rust Ty","Trashy Tony"],["129","Anton Bite","Hurt Hank"],["130","One Ivan","Hot Shot Scott"],["131","Team Upton","Bruce Pain"],["132","Eight Armand","Peter Pooper"],
    ],
  },
  {
    name: "2015 Series 1", year: 2015, series: "2015 Series",
    release_date: "March 2015",
    artists: "Brent Engstrom, Joe Simko, David Gross, Layron DeJarnette",
    notable: "Baseball-themed cards throughout. Card 66 'Otto Graph / Collector Kyle' is a nod to the collector community.",
    description: "The 2015 Series features 132 base stickers (66 pairs) with a strong baseball theme running through the set. Pop culture references include Willy Wonka, Frankenstein, and various sports parodies. Card 66 closes with a collector self-reference.",
    imageFolder: "2k15s1",
    cards: [
      ["1","Brian Drain","Grey Matter"],["2","Big Ed","Heady Hank"],["3","Froggy Frank","Leggy Peggy"],["4","Molting Mitch","Insect Ike"],["5","Bowling Ali","Louis Lane"],["6","All-Seeing Ivan","Pierre Amid"],["7","Magic Ian","Patrick Hat Trick"],["8","Twin Brin","Split Whit"],["9","Reflect Shawn","Mirror Mick"],["10","Monstrous Matt","Jed Bed"],["11","Muscle Manny","Gunther Guns"],["12","Tree Milhouse","Fort Knox"],["13","Slipper Stephan","Bunny Billy"],["14","Stalag Mike","Cal Cavern"],["15","County Ferris","Rung Ron"],["16","Rollin' Roger","Hamster Hal"],["17","Curt Squirt","Spencer Sprinkler"],["18","Corkscrew Lou","Turned Ted"],["19","Bicycle Locke","Locked Lorne"],["20","Leaving Levon","Gone Juan"],["21","Jack in the Box","Surprised Shannon"],["22","Dice Bryce","Rolled Joel"],["23","Lady Justine","Supreme Courtney"],["24","Nested Ned","Russ N. Dolls"],["25","Rainbow Racine","Looming Laura"],["26","Brony Tony","Horse Pie Paul"],["27","Pepper Milton","Fresh Freddy"],["28","Jace Bass","Kicked Kit"],["29","Ken Tucky","K.F. Cecil"],["30","Kat Hat","Irresponse Able"],["31","Layered Lester","Veggie Val"],["32","Atomic Reggie","Waist Brand"],["33","Ven E. Sean","Wade Shade"],["34","Limbo Lois","Popped Paula"],["35","Flap Jack","Patty Pancake"],["36","Blue Prince","Dia Graham"],["37","Maggie Magot","Larval Lara"],["38","Buggy Brie","Squashed Sasha"],["39","Grave Grover","Six Feet Deepak"],["40","Enema Eric","Cleansed Clem"],["41","Armpit Annie","Long Harriet"],["42","Wonky Willy","Candy Andy"],["43","Alarming Adam","Fiery Phil"],["44","Branch Brad","Tree Lee"],["45","Boxing Glover","Heavyweight Harry"],["46","Selfie Sophie","Duck Faith"],["47","Seth O. Scope","Check Upton"],["48","Sammy Spurs","Ridin' Rick"],["49","Bugged Brenda","Hit Britt"],["50","Ink Blot Dot","Rory Shack"],["51","Eyeball Evan","Re Tina"],["52","Sunny Side Up","Oliver Easy"],["53","Urine Al","Flushed Flint"],["54","Sky Writer","Gaseous Gus"],["55","Cole Cuts","Sandy Wich"],["56","Care Les","Clumsy Carl"],["57","Homer Plate","Basil Base"],["58","Streak Earl","Naked Ned"],["59","Busted Wally","Caught Scott"],["60","Franklin Stein","Stitched Steve"],["61","Clyde Slide","Burned Verne"],["62","Grant Slam","Base Bill"],["63","Stolen Nolan","Safe Seth"],["64","Spitting Spaulding","Chewing Che"],["65","Catcher's Mitt","Calvin Catcher"],["66","Otto Graph","Collector Kyle"],
    ],
  },
  {
    name: "30th Anniversary", year: 2015, series: "Anniversary",
    release_date: "July 2015",
    artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore, Adam Goldberg",
    notable: "Massive set with 25 subsets including 80s Spoof, Garbage Pail Presidents, GPK Kids' Kids, GPK Pets, Artistic Influence, and Comic Book Covers. Every card comes in 12 color parallels.",
    description: "The 30th Anniversary celebration is the most complex GPK set ever released. Instead of a traditional base set, it features 25 themed subsets — 80s Spoof (spoofing 80s movies/games), Garbage Pail Presidents, GPK Kids' Kids (children of OS characters), Garbage Pail Pets, Artistic Influence, Comic Book Covers, and more. Each card exists in 12 parallel colors (Base, Green, Black, Red, Brown, Blue, Pink, Silver, Character Back Black/Blue, Sepia, Gold).",
    imageFolder: "xxxv",
    cards: [
      // 80s Spoof subset (main base cards)
      ["1","Tardy Marty","Nick Of Time"],["2","Beetle Jace","Messed-Up Michael"],["3","Deepak Man","Arcade Wade"],["4","Marshmallow Manny","Ghost Buster"],["5","Max No Room","Crashed Carter"],["6","Thunder Katsuo","Lion-Owen"],["7","Mad Michael","Jumpin' Jordan"],["8","Giz Moe","Grem Lynn"],["9","Fed Alfred","Gorged Gordon"],["10","Bad Blair","Karen Bear"],["11","Doomed Duke","Jointed Joe"],["12","King Of Konner","Don Key"],["13","Aweless Andy","Terrible Tony"],["14","Legendary Lincoln","Heart Les"],["15","Cruel Cal","Brutal Bill"],["16","Mega Manny","Rock Manuel"],["17","Die Hardy","Bruised Bruce"],["18","Limber Luigi","Messed-Up Mario"],["19","Ejected Elwood","Jazzy Jake"],["20","Hey U. Guy","Lethargic Lotney"],["21","Preda Tory","Armed Arn"],["22","Moonwalkin Michael","Backward Jack"],["23","Inspect Tor","Jerky John"],["24","Mad Mike","Testy Ty"],["25","N. E. S. Ness","Plugged Pete"],
    ],
  },
];

async function seed() {
  console.log(`Seeding ${sets.length} sets...\n`);
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
