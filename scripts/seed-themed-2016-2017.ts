// Seeds themed sets: Apple Pie, Trashy TV, Adam-Geddon, Battle of the Bands
// Run: npx tsx scripts/seed-themed-2016-2017.ts

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

interface SetDef {
  name: string; year: number; series: string; release_date: string; artists: string; notable: string; description: string; imageFolder: string;
  cards: [string, string, string][];
}

const sets: SetDef[] = [
  {
    name: "American As Apple Pie", year: 2016, series: "Themed Sets",
    release_date: "January 2016",
    artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore, JungHwa Im, Miran Kim",
    notable: "17 subsets covering Americana themes. Card 3 'Donald Dump / Tumultuous Trump' in the 2016 Presidential Candidates subset was prescient. 8 color parallels per card.",
    description: "American As Apple Pie celebrates (and mocks) American culture with 84 base stickers (42 pairs) plus subsets covering Americana, Presidential Candidates, American Icons, Inventors, Historical Events, Pastimes, and Summer Olympics. Every card comes in 8 color parallels including Snot Green and Pee Yellow.",
    imageFolder: "pie",
    cards: [
      ["1","Picket Polly","Freda Fence"],["2","Belt Buck L.","Cow Boyd"],["3","Bill Grill","Cody Cook"],["4","Big Mack","Sam Burger"],["5","U.S. Arnie","Bald Edgar"],["6","Wriggley Rene","Curly Carla"],["7","Party Marty","Two-Party Cyst Tim"],["8","Happy Mel","Delightful Donald"],["9","Muscle Carl","Motor Ed"],["10","Competitive Etan","Nasty Nathan"],["11","Andy Apple","Paton Pie"],["12","Redwood Ralph","Red Woody"],["13","Capital Cal","U.S. Bill Ding"],["14","Brawling Barb","Missy America"],["15","Stinkin' Lincoln","Memori-Al"],["16","Grand Grant","Carrie Canyon"],["17","Ole Faithful","Yellow Stone"],["18","Rodeo Rod","Bill Rider"],["19","Spencer of '76","Yankee Doodle Randy"],["20","Don't Tread On Mia","Dee Party"],["21","Wallace Street","Golden Bill"],["22","Poodle Skylar","Sock Hope"],["23","Tom Prom","Social Sal"],["24","Sutton Surfer","Shark Attack Zack"],["25","Skip Skater","Hurt Burt"],["26","Holly Woody","Direct Tor"],["27","Carni-Val","Whack Jack"],["28","Nas Carl","Pile Up Kyle"],["29","Ice Capade Jade","Figures Kate"],["30","Firework Kirk","In-Jory"],["31","Wrinkly Randy","Har Lee"],["32","Broadway Jay","Music Cal"],["33","Struck It Rich","Crude Craig"],["34","U.S. Dale","Post Al"],["35","Addict Ted","Phony Phil"],["36","Buddy Blues","Teary Terry"],["37","Hitchhike Mike","Raoul Route"],["38","Casino Gino","Neon Leon"],["39","Frat Matt","Toga Todd"],["40","Sports Jan","Fanatic Mick"],["41","Log Droppin' Lincoln","Logan Cabin"],["42","Area 50 Juan","Cover Up Chuck"],
    ],
  },
  {
    name: "Prime Slime Trashy TV", year: 2016, series: "Themed Sets",
    release_date: "October 2016",
    artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "23 subsets organized by TV genre — Comic Book, Horror, Crime, Reboot, Cartoon, Streaming, Reality, Food, Syndicated, News, Comedy, Game Show, Drama, Late Night, Sci-Fi, and Daytime Talk. Parodies Game of Thrones, Walking Dead, Simpsons, and more.",
    description: "Prime Slime Trashy TV is organized by TV genre with 23 subsets. Every major TV show gets the GPK treatment — from Game of Thrones (Jon Snowy, Draggin' Daenerys) to The Simpsons (Merged Marge) to SpongeBob (Grungy Bob). A love letter to television through the gross-out GPK lens.",
    imageFolder: "tv",
    cards: [
      // Comic Book TV
      ["1","Green Aaron","Hawk Ira"],["2","Flashin' Ash","Bare Barry"],["3","Hawk Manny","Caged Carter"],["4","Sue Pearl Girl","Cutting Kara"],["5","Oz Waddle","Goth Adam"],["6","I.Zom Bea","Not Liv"],["7","Sy Borg","Teen Ty Tim"],["8","Unlucky Leo","Un Sheldon"],
      // Horror TV
      ["9","Matt Ress","American Horror Rory"],["10","Vanna Pyre","di Ary"],["11","Mo Tel","Ab Norma"],["12","Sleepy Hal O.","Ichabod iless"],["13","Gene Wolf","Hairy Harry"],["14","Red Ned","Devilish Devin"],["15","Evil Ted","Ash Can"],["16","Dusky Dustin","Till Don"],
      // Crime TV
      ["17","American Crime Jory","Criminal Cuba"],["18","Cy Ber","Crime Scene Jean"],["19","Margot, North Dakota","Murder Molly"],["20","Bony Bonnie","Forensic Florence"],["21","Blind Dot","Tatted Tatiana"],["22","Crimin-Al","Mind Over Matt"],
      // Reboot TV
      ["23","Open Scully","Disguised Dana"],["24","Twin Finn","Cherry Cooper"],["25","Twen-Ty","Whacked Jack"],["26","Hawaii Five Owen","Surf's Upton"],["27","Full Klaus","Stuffed Stephanie"],["28","Odd Todd","Cup-Paul"],["29","Powerpuff Polly","Bumped Blossom"],["30","Torn Tom","Scary Jerry"],
      // Cartoon TV
      ["31","Merged Marge","Melded Maggie"],["32","South Mark","Killer Kenny"],["33","Burger Bob","Pat Patty"],["34","Regular Joe","Barfin' Benson"],["35","Grungy Bob","Spongy Spencer"],["36","My Little Polly","Elma's Glue"],["37","Nervous Norville","Meddling Mel"],
      // Streaming TV
      ["38","Fragile Frank","Kevin Cards"],["39","Make Jake","Set-up Steven"],["40","Black Jack","Michael Mirror"],["41","Unbreakable Annabelle","\"Grim\" Kim"],["42","Messed-up Mindy","Self Fi"],
      // Reality TV
      ["43","Kim Kar Trashy N.","Nasty Noel"],["44","Pained Pharrell","Bloody Blake"],["45","Angry Arnold","Termin Nate"],["46","Project Ron Way","Fash Sean"],["47","The Biggest Louise R.","Jacked-up Jillian"],["48","Catfishy Finn","Nervous Nev"],["49","Fishin' Frank","Mucus Mike"],["50","Face Ophelia","Messed-up McKenzie"],["51","Botch Ed","Plastic Paul"],["52","Moody Judy","Insane Jane"],["53","Painful Penn","Torn Teller"],["54","The Isl-Andy","Lone Lee"],
    ],
  },
  {
    name: "Adam-Geddon", year: 2017, series: "Themed Sets",
    release_date: "January 2017",
    artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "Apocalypse-themed set with 17 subsets: Dumb Deaths, Pollution, Bio & Tech, The Plagues, Apocalypse, Alien Invasion, Monsters, Natural Disasters, and Nuclear. Card 17 of Nuclear brings back Adam Bomb / Adam Geddon.",
    description: "Adam-Geddon imagines every possible apocalypse scenario through the GPK lens. From nuclear war to alien invasion, plagues to natural disasters — every end-of-the-world scenario gets the gross-out treatment. The Nuclear subset's card 17 features Adam Bomb / Adam Geddon as the ultimate finale.",
    imageFolder: "adam",
    cards: [
      // Dumb Deaths
      ["1","Shane Saw","Jesse Juggler"],["2","Potty Scotty","Jerry Bomb"],["3","Furry Frankie","Cosplay Jay"],["4","Beth Tub","Ellie Electro"],["5","Whipped Kareem","Stuffed Stephan"],["6","Hunt Earl","Ivory Hunter"],["7","Shocked Jacque","Ira Socket"],["8","Pedestr-Ian","Obsessed Jess"],["9","Harriet Headphones","Loud Lucy"],["10","Haddie Hadron","Collided Carrie"],
      // Pollution
      ["11","Cameron Chemtrail","Connar Contrail"],["12","Overpopulate Ted","Noah Room"],["13","Bye-Bye Bea","Noah More"],["14","Fallout Phil","Contami-Nate"],["15","Newt Clear","Nuclear Pow Earl"],
      // Bio & Tech
      ["16","Rabid Rob","Ethan Foam"],["17","Moe Skeeto","Vinnie Virus"],["18","Barry Bacteria","Super Bac-Terry"],["19","Francis Fungus","Monty Mushroom"],["20","Engineered Eric","Man-Made Wade"],["21","Tyrone Drone","Strike Mike"],["22","Rob Slob","Lord of the Frye"],["23","Acid Rayne","Rainy Janie"],
      // The Plagues
      ["24","Buggy Buddy","Bug Spray Jay"],["25","Locust Lucas","Swarmin' Norman"],["26","Buggy Betty","Green Jean"],["27","Ed Lice","Bud Sucker"],["28","Toady Terry","Croakin' Colin"],["29","Plagued Jade","Tongue-Tied Ty"],["30","Boily Boyde","Pus Gus"],["31","Drippy Dan","Leaky Lou"],["32","Craig Plague","Cursed Chris"],
      // Apocalypse
      ["33","May N. Calendar","Enid Date"],["34","Cultish Carl","Kool Aiden"],["35","Anti-Chris","Devilish Damien"],["36","Predict Ted","Right Ryan"],["37","Nasty Noah","Flood Ed"],["38","Rapture Robert","Holy Hollie"],["39","Four Horse-Manny","Apocalyptic Ric"],["40","Demonic Dante","Villainous Virgil"],["41","Grim Kim","Beth Death"],["42","Dry Guy","Famished Mitch"],["43","Mad Mike","War and Warren"],["44","Virus Iris","Plagued Paula"],
      // Alien Invasion
      ["45","Skin Walker","Disguised Guy"],["46","Destroying A. Doug","Alien Ivan"],["47","Alien Ian","Outer Space Chase"],["48","Squashed Josh","Squoze Rose"],["49","Independence Dale","Inva-Sean"],
      // Monsters
      ["50","Cracked Jack","Soft Boiled Sam"],["51","Fryin' Ryan","Charred Chad"],["52","Cyber Billy","Tommy Tech"],["53","Dragged to Helen","Final Selfie Sophie"],["54","New Wave Dave","Graffiti Petey"],
      // Natural Disasters (partial)
      ["55","Spitfire Spencer","Warming Warren"],["56","Polar Barry","Habit Tate"],["57","Forrest Fire","Sappy Sarah"],["58","Raina Drought","Dee Hydrated"],["59","Sandy Wich","Starvin' Marvin"],["60","Earthquake Jake","Tremor Trevor"],["61","Val Cano","Erupt Tina"],["62","Haley Comet","June Moon"],["63","Black Joel","Hole Noel"],
      // Nuclear (partial)
      ["64","Grim Jim","Scared to Beth"],["65","Doomsday Donald","Trump Terror"],["66","Adam Bomb","Adam Geddon"],
    ],
  },
  {
    name: "Battle of the Bands", year: 2017, series: "Themed Sets",
    release_date: "October 2017",
    artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "7 music genre subsets: Alternative, Classic Rock, Hard Rock, Metal, New Wave & Punk, Pop, and Rap & R&B. Parodies everyone from The Beatles to Beyonce, Nirvana to Nine Inch Nails.",
    description: "Battle of the Bands is a music-lover's GPK dream. Seven genre subsets cover the entire spectrum of popular music — from Beatles and Stones to Nirvana and Metallica, from Michael Jackson to Beyonce. Every major music icon gets the gross-out GPK treatment.",
    imageFolder: "botb",
    cards: [
      // Alternative
      ["1","Rip Van Michael","Sleeping Stipe"],["2","Crashing Kim","Fouled Frank"],["3","In Control Curt","Pete Puppets"],["4","Thurston Morgue","Sonic Senior Steve"],["5","Canned Kurt","Dirty Dave"],["6","Bashing Billy","Cracking Corgan"],["7","Flaming Liam","Weird Wayne"],["8","Raw Rivers","Uncooked Cuomo"],["9","OK Gordon","Harry It Goes Again"],["10","Dragon Dan","Imaginative Ira"],
      // Classic Rock
      ["11","Johnny Crash","Ringo of Fire"],["12","Beached Brian","Waves Wilson"],["13","Lonely Lennon","Palpitating Paul"],["14","Mick Lick","Jacked Up Jagger"],["15","Mod Rodge","Targeted Townshend"],["16","For the Boyds","Rancid Roger"],["17","Jammed Jim","Slammed Dory"],["18","Grateful Ted","Bear Attack Bob"],["19","Glowin' Jimi","Heating Hendrix"],["20","Elaborate Elton","Rocket Manny"],["21","Glass Fracturin' Freddie","Bursting Brian"],["22","Bearded Billy","Frank Beardless"],["23","Clawed Cougar","Mauled Mellencamp"],
      // Hard Rock
      ["24","Lead Zep","Ridiculous Icarus"],["25","Bashed Buck","Demolished Dharma"],["26","Asphyxiated Alice","Choking Cooper"],["27","Motor Ed","Lumpy Lemmy"],["28","Aching Angus","Ballbreak Earl"],["29","Swallowing Steven","Big Trap Tyler"],["30","Dueling David","Sammy Hater"],["31","Burned Brett","Mutilated Michaels"],["32","Joyless Jon","Bad Name Bon"],
      // Metal
      ["33","Oozing Ozzy","Jack Sabbath"],["34","Met Al","Aster of Puppets"],["35","Mega Seth","Rattle Ed"],["36","Nine Inch Neil","Tacked Trent"],["37","Zombie Robbie","Hot Rob"],["38","Marilyn Oh No","\"Handsome\" Manson"],["39","I. Ron Maiden","Iron Irene"],["40","Andy Thrax","Hurt Ian"],["41","Phantom Forge","Ghostly Goore"],["42","Masto Don","Beassty Brent"],
      // New Wave & Punk
      ["43","Are We Not Manny?","Dee Vo"],["44","Sinking Sting","Sunk Stewart"],["45","Bea Hive","Love Shack Cindy"],["46","Debbie Scary","Heartless Harry"],["47","Stung Sting","Stinging Sumner"],["48","Ruined Ramone","Graffitti Dee Dee"],["49","Safety Pin Sid","Pierced Paul"],["50","Misfit Manny","Ghost Glenn"],["51","Green Dave","Barfin' Billie"],
      // Pop
      ["52","Monarch Michael","King of Plop"],["53","Magic Michael","Jack Sen-Sational"],["54","Hairy Barry","Gross Gibb"],["55","Torturing Taylor","Swift Break-Up"],["56","Gasp-Inducing Gaga","Bachelor Bennett"],["57","Awful Ariana","Grande Latte"],
      // Rap & R&B
      ["58","Deafening Darryl","Sonorous Simmons"],["59","Flava Dave","Stuck Chuck"],["60","Beastie Boyd","Mixed-Up Mike"],["61","Purple Prince","Rainy Rogers"],["62","Bruno Martian","Mars Attacks"],
    ],
  },
];

async function seed() {
  console.log(`Seeding ${sets.length} themed sets...\n`);
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
