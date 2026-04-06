// Seeds Late To School, 35th Anniversary, Food Fight, Book Worms
// Run: npx tsx scripts/seed-2020-2022.ts

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const sets = [
  {
    name: "Late To School", year: 2020, series: "Themed Sets",
    release_date: "January 2020", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "Massive 200-card school-themed set with 100 pairs. Features Class Superlatives, GPK Faculty Lounge, and GPK Mascots subsets.",
    description: "Late To School is a school-themed set with 200 base stickers (100 pairs) covering every aspect of school life — from detention to dissection, bullies to band class. Subsets include Class Superlatives, GPK Faculty Lounge (with Adam Bomb as Chemistry teacher), and GPK Mascots.",
    imageFolder: "lts", cards: [
      ["1","Resisting Reese","Dragged Drake"],["2","Homer Schooled","Sheltered Sheldon"],["3","Misty Bus","Bus Stop Becky"],["4","Chrissy Guard","Distracted Denise"],["5","School Buster","Russ Pass"],["6","Slacker Simon","Late Tate"],["7","Ditching Dirk","Truant Trevor"],["8","Wedgie Winston","Pulled Upton"],["9","Ringing Ringo","Alarm Belle"],["10","Al Chemy","Experimenting Xavier"],
      ["11","Dee I.Y.","Decorated Desiree"],["12","Booger Britney","Nose Goldie"],["13","Detained Dwayne","Disciplinary Ashton"],["14","Doug Ate My Homework","Ava Alibi"],["15","Telling Liza","Spreading Rumer"],["16","Hope Scotch","Jumping Jenna"],["17","Hot Flora Teacher","Vanna Halen"],["18","Kick Mia","Pranked Pamela"],["19","Macaroni Art","Crafty Chris"],["20","Payton Airplane","Glider Glenn"],
      ["21","Pepper Rally","Give Me a Gia"],["22","Raising Hans","Call on Carl"],["23","Ricky Recorder","Woody Instrument"],["24","Arlo T.C.","Ulysses Uniform"],["25","Stuck Stuart","Emoting AJ"],["26","Suspended Susan","Punished Paige"],["27","Ben Dreamin'","Kent Wake Up"],["28","Held-Back Hank","First Grady"],["29","Gigi-ography","Greta Globe"],["30","Monkey Barb","Climbing Chloe"],
      ["31","Braun Baggin' It","Leftover Lenny"],["32","Rubbed-Out Robert","Erased Chase"],["33","Heather Ball","Whacked Wanda"],["34","Pass It Juan","Love Lester"],["35","Glittery Glinda","Scarlet Sparkles"],["36","Rita Book","Simple Mindy's"],["37","Sissy Boom Bah","Cher Leader"],["38","Ethan Paste","Gluey Dewey"],["39","Restroom Rocco","Smokin' Joe"],["40","Staple Earle","Stapled Stu"],
      ["41","Brad Influence","Pierce Pressure"],["42","Number 2 Stu","Lou Stool"],["43","Pee Don","Wiz Kid William"],["44","Chuy Gum","Ben Chewed"],["45","Cas Your Vote","Running Ryan"],["46","Rhetta White & Blue","Old Gloria"],["47","Paint Oliver","Messy Marvin"],["48","Tooter Tanya","S.B. Dee"],["49","Built Boris","Level Levi"],["50","Guy Set","Fountain Forest"],
      ["51","Embarrassed Harris","Jim Shower"],["52","Suck-Up Sasha","Peggy Pet"],["53","Absorb Brent","Saw Dusty"],["54","Saul Nighter","Cramming Craig"],["55","Skip Van Winkle","Catchin' Aziz"],["56","Say Cheese Luis","Picture Day Jay"],["57","Left-Behind Leo","Where Are Hugh"],["58","Full Course Mel","Lunch Trey"],["59","Spit Wad Todd","Disruptive Dylan"],["60","Cal Culator","Always Dwight"],
      ["61","Hair Annette","Sani Terry"],["62","Illegal Eli","Contraband Cory"],["63","Carving Carter","Buck Tooth"],["64","Headmaster Astor","Principal Cal"],["65","Climbing Cleveland","Roped Rick"],["66","Jungle Jim","Polly Playground"],["67","Kicked Kyle","Rick Ball"],["68","Fourtune June","Paper Piper"],["69","Funny Floyd","Class Clown Clyde"],["70","Frog Eaton","Dissect Shaun"],
      ["71","Copy Katt","Cheater Peter"],["72","Ned Lice","Cody Closet"],["73","River Block","Pencil Holder"],["74","Divide Ed","50-50 Fin"],["75","Show and Ella","Leaky Lacey"],["76","Sharp Penny","Sharpen Charlene"],["77","Lunch Bag Larry","Benny Bag Lunch"],["78","Cramming Cramer","Memorizing Mike"],["79","Hal Pass","Monty Hall"],["80","Bully Billy","Jerky Jack"],
      ["81","Vampy Val","Goth Gabe"],["82","Speech Les","Burstin' Thurston"],["83","Ira Robot","Detector Dexter"],["84","Mod Dale","Anat-Timmy"],["85","Erupt Shawn","Blue Ribbon Randy"],["86","Elma Glue","Patty Paste"],["87","Bully Billie","Jerky Jackie"],["88","Loose Leif","Sketchy Skippy"],["89","Confiscate Ted","Contra Brandy"],["90","Broken-Back Pat","Archie Back"],
      ["91","Barf Bag Barb","Lunch Packing Pam"],["92","Rainy Daisy","Dawn Wind"],["93","Bea Quiet","Noah Talking"],["94","Donny Dunce","Tim Out"],["95","Fail Dale","F Jeff"],["96","Nervous Neil","Shy Guy"],["97","Year Booker","Memory Lane"],["98","Ted of the Class","Scholar Lee"],["99","Graduation Dayna","Pat Toss"],["100","Summer Blake","Last Dayton"],
    ],
  },
  {
    name: "35th Anniversary", year: 2020, series: "Anniversary",
    release_date: "October 2020", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "9 subsets: All Grown Up (OS characters as adults), Snot Another Anniversary, Flash Forward (futuristic GPK), 35 Years of GPK (one new card per original set), and Battle of the Decades.",
    description: "The 35th Anniversary set reimagines classic GPK characters as adults, looks into the future, and celebrates every era of GPK history. The '35 Years of GPK' subset features one new card representing each of the 35 previous GPK releases.",
    imageFolder: "35th", cards: [
      ["1","Adam Bomb","Adam Apple"],["2","Ashley Can","Jackie Pot"],["3","Blake Flake","Finance Frank"],["4","Bonnie Bunny","Women's Libby"],["5","Apple Cory","Organ Nick"],["6","Claire Stare","Rex Specs"],["7","Dale Snail","Sauteed Sawyer"],["8","Dial-A-Twyla","Phone Bella"],["9","Disgustin' Justin","Motorized Scooter"],["10","Gooey Gabe","Homer Repair"],
      ["11","Holly Wood","Able Table"],["12","Hot Rod","Electric Carl"],["13","Joe Blow","Chip Dip"],["14","Jolly Roger","Yo Ho Joe"],["15","Leather Heather","Judy On Duty"],["16","Max Axe","Axel Throws"],["17","New Wave Dave","Street Art"],["18","Prickly Rick","Bloomin' Braden"],["19","Sally Suction","Mocha Lottie"],["20","Shut Up Sherwin","Winey Winfred"],
      ["21","Adam Bomb","Booger Billy"],["22","Cracked Jack","Runny Reggie"],["23","Fryin' Ryan","Blowin' Buster"],["24","Cranky Frankie","Bogey Brad"],["25","Dizzy Dave","Mucas Lucas"],["26","Jenny Jelly","Pick 'N Flicka"],["27","Spacey Stacy","Dot Rocket"],["28","Split Kit","Snotty Sam"],["29","Sy Clops","Guy Booger"],["30","Tongue Tied Tim","Sinus Linus"],
      ["31","A Issac","Jay I"],["32","Warren Out","Hopeful Harper"],["33","Crashed Craig","Martian Martin"],["34","Automated Audrey","Lazy Susan"],["35","Brock Out","Shreddin' Kevin"],["36","Superior Gene","Designer Bobby"],["37","Draining Dylan","Diaper Donald"],["38","Digital Dan","Upload Ed"],["39","Pete N Greet","Greetings from Earl"],["40","Square Emile","Cubed Caleb"],
      ["41","Gail Power","Jenny Justice"],["42","Rem Brent","Tech Glover"],["43","Rubbish Ben","Trashy Travis"],["44","Mutant Matt","Len a Hand"],["45","Ultra Violet","Sunny Flair"],["46","Social Sophie","Plugged Ina"],["47","Rocketing Rocky","Hurtling Hayden"],["48","Zapped Zack","Ray Gun"],["49","Robert Overlord","Andy Droid"],["50","Sy Borg","Cyber Bert"],
      ["51","Grey-Party Artie","Visible Victor"],["52","Portal Porter","Dale A. Portation"],["53","Transcending Travis","Medi Tate"],["54","Alien Landon","Saucer Sally"],["55","Virtual Val","Unreal Reya"],["56","Jessie Jester","Foolish Felix"],["57","Eroding Ernie","Double Ace"],["58","Lorne Ranger","Masked Manfred"],["59","Tin Manny","Earl Can"],["60","Stink Ira","Tooting Titus"],
      ["61","Dangling Danielle","Jess Hanging Around"],["62","Tattoo Lulu","Inked Ingrid"],["63","Al Chemist","Wally Warlock"],["64","Dynah Might","Waiting Wade"],["65","Tow Mitch","Dragged Drew"],["66","Trey Dent","Po Simon"],["67","Brush 'N Ross","Ruth Brush"],["68","Doug House","Chomping Charles"],["69","Abner Cadabra","Magic Mike"],["70","Sven Sailing","Pillaging Paul"],
      ["71","Randy Virus","Dark Webber"],["72","Feeding Tim","Candice Opener"],["73","Moe Sapien","Devolved Dean"],["74","Wyatt Ape","Swinging Stuart"],["75","U.F. Owen","TP Petey"],["76","Waxy Wesley","Max Wax"],["77","Mandy Manga","Annie-Me"],["78","Brock of Marble","Master Pierce"],["79","Free Mason","Illuminate Nate"],["80","Beat Bart","Wyatt You Little!"],
      ["81","Testy Tony","Little Fred"],["82","Hound Doug","Jailhouse Rick"],["83","Quantum Leif","Sightseeing Sam"],["84","Open Carrie","Gunner Control"],["85","Clashing Clark","London Brawling"],["86","Rockin' Rio","Pasty Pat"],["87","Gourdy Gordon","Pumpkin Patick"],["88","Groovy Greg","Rotten Austin"],["89","Killer Cory","Edgy Edgar"],["90","Milt & Cookies","Dairy Larry"],
      ["91","Tooth Les","T. rex"],["92","Oozy Suzy","Mel Tin"],["93","Adam Bomb","Blastin' Sebastian"],["94","Bony Joanie","Dayna Dead"],["95","Cracked Jack","Esther Basket"],["96","Ghastley Ashley","Ghastley Ashley"],["97","Hot Scott","Fallen Angel"],["98","Joe Blow","Bubble Tate"],["99","Nat Nerd","Comic Conner"],["100","Pete Seat","Wranglin' Rachel"],
    ],
  },
  {
    name: "Food Fight", year: 2021, series: "Themed Sets",
    release_date: "February 2021", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "The largest single base set in modern GPK history with 200 base stickers (100 pairs). All food-themed — every card is a food pun or food-related gross-out.",
    description: "Food Fight is the biggest modern GPK base set with 200 stickers (100 pairs). Every card revolves around food — from Wax Max (wax lips) to Adam Bomb as Blended Billy, from vegan parodies to competitive eating. A feast of gross-out food puns.",
    imageFolder: "ff", cards: [
      ["1","Wax Max","Gummy Gunther"],["2","Piper Bag","Buttercream Maxine"],["3","Dawson Cookies","Choke-a-lot Chip"],["4","Noodle Harriet","Betty Spaghetti"],["5","Lemon Nadine","Zesty Zoe"],["6","Hard Shelly","Taco Tim"],["7","Allergic Nick","Pete Nut Allergy"],["8","Shirley Temple","Greta Dine"],["9","Flakey Fran","Scabby Scarlet"],["10","Three-Course Mel","Third Helping Theo"],
      ["11","Soupy Candice","MM MM Gooden"],["12","Dan Opener","Sid Lid"],["13","Brad Pit","Ripened Ricardo"],["14","Flatu-Lance","Bart Face"],["15","Doughnut Hole Joel","Doughnut Don"],["16","Sawyer Sauce","Fresh Fischer"],["17","Dipping Derrick","Melting Miles"],["18","Hot Dog Dave","Condiment Cody"],["19","Tenderized Travis","Pounded Parker"],["20","Decay Ray","Rotting Rob"],
      ["21","Stick-up Stanley","Meltdown Mark"],["22","Cookie Cutter Cooper","Baked Brent"],["23","Drippy Skippy","Ridiculous Reese"],["24","Tito Burrito","Tex Mex"],["25","Junkatarian John","Snack Attack Jack"],["26","Funnel Finley","Over Etta"],["27","Pokey Penny","Picky Mickey"],["28","Cola Warren","Battling Bev"],["29","Served Sammy","Food Fight Felix"],["30","Garbage Pail Sid","Trashy Trey"],
      ["31","Finger Lick Ken","Fried Hans"],["32","Twin Keith","Creamed Phil"],["33","Butchered Butch","Chuck Steak"],["34","Grated Grady","Foot Cheese Charlie"],["35","Takeout Tom","Carlo Mein"],["36","Moldy Molly","Loaf of Fred"],["37","Livy Linguine","Maca-Ronnie"],["38","Kern Al","Pop Corey"],["39","Wes Quick","Peter Pellets"],["40","Paleolithic Paul","Hunter Gatherer"],
      ["41","Cherry on Top","Ice Cream Sun-Dee"],["42","Joe Blow","Owen Bubbles"],["43","Finger Neil","Peckish Pinky"],["44","Pepping Paige","Marsha Mallow"],["45","Cotton Kandy","Sugar Sheena"],["46","Ice Cream Sandy","Split Brit"],["47","Uh-Oh Rio","Kareem Filling"],["48","Prized Presley","Perry Premium"],["49","Grady Grapefruit","Sour Scott"],["50","Hal n' Oats","Quaker Quinn"],
      ["51","Bib Bob","Messy Jesse"],["52","Bleu Spew","Steve Heave"],["53","Unaware Eddie","Stuck in Keith"],["54","Chet Zit","Chad R. Cheese"],["55","Barf Out Al","Billy Up"],["56","Squeeze Luis","Whizzing Winthrope"],["57","Micro Wade","Zapped Zach"],["58","Adam Bomb","Blended Billy"],["59","Roastin' Ronan","Toast Ed"],["60","Lobster Lonny","Boiled Bonnie"],
      ["61","Spitting Spencer","Vindictive Vinnie"],["62","Herschel Squirts","Chuck Let"],["63","Food Selfie Stephie","Last Mila"],["64","Chomping Chad","Denture Donald"],["65","Bloody Mary","Toni Tomato"],["66","Assault Ted","Saul Shaker"],["67","Pinched Pepper","Over-seasoned Sean"],["68","Vegan Tegan","No Meat Pete"],["69","Balut Luke","Bo Lut"],["70","Sweet Ruth","Cavi- Dee"],
      ["71","Kingston Cake","Marty Gras"],["72","Poe Tato","Tater Todd"],["73","Whipped Cream Ken","Cool Whit"],["74","Play Paul","Concession Stan"],["75","Funnel Cake Drake","Board Walker"],["76","Snow Cone Conner","Joe Cone"],["77","Starving Art","Still Life Stan"],["78","Stomping Stella","Fermented Frieda"],["79","Gummy Gus","Chewy Charles"],["80","Let Saul Go","Logan Lobby"],
      ["81","Spicy Spencer","Flavor Phil"],["82","Termite Terry","Protein Patrick"],["83","Buzzed Barron","Honey Bea"],["84","Hydrate Tate","Drink Upton"],["85","Deveined Valerie","Shrimpy Sheryl"],["86","Getting Ahead Ned","Feastin' Easton"],["87","Ring Poppy","Billie Bling"],["88","Dillon Pickles","Sick Vlad"],["89","Spacey Stacy","Janet Planet"],["90","Cheesy Chester","Charred Chuck"],
      ["91","Cookie Pusher","Thin Mindy"],["92","Spilled Milt","Mary Dairy"],["93","Haggis Hamish","Kilted Kyle"],["94","Sorry Charlie","Alba Corey"],["95","Flea Flo","Parasite Perry"],["96","Woody Blocks","Insect Isaac"],["97","Jarring Jessica","Preserved Priscilla"],["98","Refined Reggie","Connor-seur"],["99","Fridge Frankie","Bad Food Brad"],["100","Irritable Lowell","Inflamed Colin"],
    ],
  },
  {
    name: "Book Worms", year: 2022, series: "Themed Sets",
    release_date: "July 2022", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "7 subsets, all literature-themed. Parodies classic and modern books — from Lord of the Rings to Harry Potter, Moby Dick to Captain Underpants. 100 base pairs (200 cards).",
    description: "Book Worms celebrates literature with 200 base stickers (100 pairs) parodying classic and modern books. From Gandalf the Grave to Wimpy Kitt (Diary of a Wimpy Kid), from Hexing Hermione to the Neverending Ed — every beloved book gets the GPK treatment.",
    imageFolder: "bwgpk", cards: [
      ["1","Ambushed Art","Poked Pendragon"],["2","Paige Holder","Pinched Preston"],["3","Myopic Mya","Nearsighted Nadia"],["4","Researching Ralph","Experimental Xavier"],["5","Ronnie Nose","Coloring Brooke"],["6","Library Ann","Stacked Stella"],["7","Cat Hattie","Zitty Kitty"],["8","Crappy Camilla","Striped Stephanie"],["9","Marcus of Zorro","Disemboweled Diego"],["10","Dive Don","Crushed Capsian"],
      ["11","Frostbite Buck","Cal of the Wild"],["12","Dueling D'Artagnan","Pierced Porthos"],["13","Gandalf the Grave","Pilfered Precious"],["14","Gobbled Grover","Page Turner"],["15","Homeless Hazel","Wrecked Warren"],["16","Jet Stream Jonathan","Light-Speed Livingston"],["17","Mucus Martin","Carmine Cold"],["18","Winnie The Pooper","Poo Barry"],["19","Wormy Walker","Dune Boone"],["20","Red-Eyed Robin","Leering Loxley"],
      ["21","Retching Romeo","Jabbed Juliet"],["22","Sam Sprayed","Dashiell Droppings"],["23","Shady Charlotte","Worried Wilbur"],["24","Whittled Woody","Chiseled Chip"],["25","Wingy Winthorpe","Revealed Vlad"],["26","Watching Hugh","Big Brody"],["27","Audio Brooklyn","Listening Lisa"],["28","Book Edna","Tidy Tina"],["29","Ides of Marc","Jagged Julius"],["30","Crispy Calvin","Hot-Stuff Hobbes"],
      ["31","Crafty Caroline","Buttoned Betty"],["32","Fabulous Fabio","Romantic Roman"],["33","Spammed Sam","Eggy Edgar"],["34","Hooligan Harold","Purple Pryor"],["35","Hexing Hermione","Winnie - Gardium Leviosa"],["36","Hitchhiking Harvey","Don Panic!"],["37","Mocking Janie","Hungry Katniss"],["38","Loren of the Rings","Mike Precious!"],["39","Modest Madeline","Vera La France!"],["40","No Clue Nancy","Daft Drew"],
      ["41","Lionel, The Witch & the Wardrobe","Norm Narnia"],["42","Pierced Percy","Jabbed Jackson"],["43","Unraveled Annie","Raggedy Regan"],["44","Stuck Scotty","Jammed Jason"],["45","Saul Shank","Andy Duframed"],["46","Holden A Grudge","Catching Ryan"],["47","Shadowy Shawn","Pulp Payton"],["48","Thing Juan","Thing Sue"],["49","Mad Max","Wild Willy"],["50","Charmed Charlee","Bewitched Whitney"],
      ["51","Treasure Travis","Long John"],["52","Decaying Dorian","Gruesome Gray"],["53","Shattered Sherlock","Detective David"],["54","Wormy Wilder","Bookworm Brent"],["55","Peppy Pippi","Stocking Stella"],["56","Book of the Ted","Necronomicon Ron"],["57","Well-Read Rita","Wedged Wendy"],["58","Stacked Jack","Leisure Lee"],["59","Chesire Pat","Frisky Frieda"],["60","Adam Apple","Jammed-Up Johnny"],
      ["61","Panicked Piper","Nat Rat"],["62","Barbarian Brandon","Howard Havoc"],["63","Comic Carl","Funny Sonny"],["64","Metamorphosis Matt","Freaky Franz"],["65","Abner Underpants","Pooting Porter"],["66","Angry Ahab","Wyatt Whale"],["67","Book Mark","Wormy Willis"],["68","Aardvark Aaron","Awful Arthur"],["69","Hairy Hailey","Radical Rapunzel"],["70","Carnivorous Carrie","Hoody Heidi"],
      ["71","Flattened Frank","Bopped Boris"],["72","Adam Book","Mind-Blown Sloan"],["73","Crammed Chris","Dewey Decimal"],["74","Magic Merlin","Abe -Racadabra"],["75","Ella Phant","Knotty Noah"],["76","Audio Phil","Zed Phones"],["77","Bearstained Stan","Hungry Hank"],["78","Big Bucks Biff","Al -manac"],["79","Bookseller Shelly","Anna Achoo"],["80","Curious Carter","Craziness George"],
      ["81","Fahrenheit Ferris","Book Bernie"],["82","Goodnight June","Good Nia"],["83","Grim Jim","Beth Death"],["84","Hungry Henry","Caterpillar Eaton"],["85","i Robby","Sy Fy"],["86","Magic School Bess","Freaky Frizzle"],["87","Ned Head","Still Jill"],["88","Off-The-Wall Paul","Knock Knock Nick"],["89","Pop Upton","Skewered Stuart"],["90","Savage Simon","Asa You Wish"],
      ["91","Reading Rain Bo","Levar Burpin"],["92","Rippin' Riley","Tearin' Terry"],["93","Slappy Sly","Goosebump Ben"],["94","Snot Jame Anne","Green Maureen"],["95","Splatty Patty","Slammin' Sammy"],["96","Split Kit","Mixed Up Mitch"],["97","Story Book Bastian","Neverending Ed"],["98","Giving Tre","Sharing Shel"],["99","Too Hot Tom","Sweet Treat Sawyer"],["100","Wimpy Kitt","Diary Danny"],
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
