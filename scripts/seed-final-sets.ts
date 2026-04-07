// Seeds Chrome Series 3-7, GPK Goes On Vacation, Intergoolactic Mayhem, Kids At Play, Worst 40th Anniversary
// Run: npx tsx scripts/seed-final-sets.ts

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const sets = [
  {
    name: "Chrome Series 3", year: 2020, series: "Chrome Series",
    release_date: "December 2020", artists: "John Pound, Tom Bunk, James Warhola (original OS art on chrome cardstock)",
    notable: "Chrome reprints of OS3 cards (84-124) plus 9 new All-New cards. First Chrome set with new original characters.",
    description: "Chrome Series 3 puts OS3 cards (84-124) on premium chrome/refractor cardstock with 9 brand new All-New cards exclusive to the Chrome line.",
    imageFolder: "cs3", cards: [
      ["84","Joe Blow","Rod Wad"],["85","Stuck Chuck","Pinned Lynn"],["86","Horsey Henry","Galloping Glen"],["87","Hot Head Harvey","Roy Bot"],["88","Dinah Saur","Farrah Fossil"],["89","Hurt Curt","Pat Splat"],["90","Stoned Sean","Thick Vic"],["91","Blake Flake","Hippie Skippy"],["92","Marvin Gardens","Spittin' Spencer"],["93","Drew Blood","Bustin' Dustin"],
      ["94","Bruised Lee","Karate Kate"],["95","Grim Jim","Beth Death"],["96","Distorted Dot","Mirror Imogene"],["97","Punchy Perry","Creamed Keith"],["98","Charlotte Web","Didi T."],["99","Beaky Becky","Picky Mickey"],["100","Ali Gator","Marshy Marshall"],["101","Mushy Marsha","Basking Robin"],["102","Mugged Marcus","Kayo'd Cody"],["103","Wriggley Rene","Curly Carla"],
      ["104","Silent Sandy","Barren Aaron"],["105","Juicy Jessica","Green Dean"],["106","Fowl Raoul","Mack Quack"],["107","Totem Paula","Tatum Pole"],["108","Smelly Sally","Fishy Phyllis"],["109","Toady Terry","Croakin' Colin"],["110","Snooty Sam","U.S. Arnie"],["111","Target Margaret","Bullseye Barry"],["112","Frank N. Stein","Undead Jed"],["113","Alice Island","Liberty Libby"],
      ["114","Starin' Darren","Peepin' Tom"],["115","Warmin' Norman","Well Done Sheldon"],["116","Eerie Eric","Berserk Kirk"],["117","Rocky N. Roll","Les Vegas"],["118","Half-Nelson","Glandular Angela"],["119","Ned Head","Still Jill"],["120","Babbling Brooke","Jelly Kelly"],["121","Apple Cory","Dwight Bite"],["122","Broad Maud","Large Marge"],["123","Glooey Gabe","Sticky Rick"],
      ["124","Hugh Mungous","King-Size Kevin"],
    ],
  },
  {
    name: "Chrome Series 4", year: 2022, series: "Chrome Series",
    release_date: "August 2022", artists: "John Pound, Tom Bunk, James Warhola, David Burke (original OS art)",
    notable: "Chrome OS4 cards (125-166) plus 6 new All-New cards. Massive parallel set with 18+ refractor variants.",
    description: "Chrome Series 4 chromes the OS4 cards (125-166) with 6 new exclusive characters and an expanded parallel rainbow.",
    imageFolder: "cs4", cards: [
      ["125","Holly Wood","Woody Alan"],["126","Armpit Britt","Shaggy Aggie"],["127","Travelin' Travis","Flat Tyler"],["128","Sloshed Josh","Low Cal"],["129","Second Hand Rose","Trashed Tracy"],["130","Nicky Hickey","Hank E. Panky"],["131","Stuffed Stephen","Rutherford B. Hay"],["132","Bony Tony","Unzipped Zack"],["133","Furry Murray","Foxy Francis"],["134","Hip Kip","Walt Witless"],
      ["135","Rock E. Horror","Marty Gras"],["136","Swollen Sue Ellen","Bloated Blair"],["137","Maxe Axe","Deadly Dudley"],["138","Alien Ian","Outerspace Chase"],["139","Double Iris","4-Eyed Ida"],["140","Mouth Phil","Tooth Les"],["141","Ashley Can","Greta Garbage"],["142","Bruce Moose","Hunted Hunter"],["143","Melba Toast","Hy Rye"],["144","Horny Hal","Rudy Toot"],
      ["145","Dale Snail","Crushed Shelly"],["146","Baked Jake","Dry Guy"],["147","Amazin' Grace","Muscular Molly"],["148","Turned-On Tara","Tiffany Lamp"],["149","Reese Pieces","Incomplete Pete"],["150","Hairy Harriet","Bushy Bernice"],["151","Losing Faith","Dyin' Dinah"],["152","Whisperin' Woody","Van Triloquist"],["153","Jack O. Lantern","Duncan Pumpkin"],["154","Basket Casey","Dribblin' Derek"],
      ["155","Spikey Mikey","Nailed Neil"],["156","Warrin' Warren","Brett Vet"],["157","Larry Lips","Distortin' Morton"],["158","Meltin' Elton","Crystal Gale"],["159","Catty Kathy","Kitty Litter"],["160","Decapitated Hedy","Formalde Heidi"],["161","Shorned Sean","Hy Gene"],["162","Yicchy Mickey","Barfin' Bart"],["163","Trish Squish","Ruby Cube"],["164","Teddy Bear","Salvatore Dolly"],
      ["165","Dana Druff","Flakey Fay"],["166","Gored Gordon","No Way Jose"],
    ],
  },
  {
    name: "Chrome Series 5", year: 2022, series: "Chrome Series",
    release_date: "December 2022", artists: "John Pound, Tom Bunk, James Warhola (original OS art)",
    notable: "Chrome OS5 cards (167-206) plus new Chrome-exclusive characters. Features 'no blue ink' error cards.",
    description: "Chrome Series 5 continues with OS5 reprints (167-206) on chrome cardstock plus new exclusive Chrome characters and variants.",
    imageFolder: "cs5", cards: [
      ["167","Mick Dagger","Slayed Slade"],["168","Handy Randy","Jordan Nuts"],["169","Dee Faced","Terri Cloth"],["170","Richie Retch","Luke Puke"],["171","Willie Wipe-Out","Spencer Dispenser"],["172","Nat Nerd","Clark Can't"],["173","Menaced Dennis","Wormy Shermy"],["174","Fred Thread","Repaired Rex"],["175","Windy Winston","Johnny One-Note"],["176","Condo-Minnie","Bill Ding"],
      ["177","Meltin' Milton","Lazy Louie"],["178","Earl Painting","Blue-Boy George"],["179","Moe Skeeto","Sting Ray"],["180","Haunted Hollis","Batty Barney"],["181","Cliff Hanger","Neck Ty"],["182","Sprayed Wade","Tagged Tad"],["183","Diaper Dan","Pinned Penny"],["184","Upside-Down Donald","Hugh Turn"],["185","Fran Furter","Hot Doug"],["186","Iron-Jaw Aaron","Jean Machine"],
      ["187","Ginger Snapped","Edible Ernie"],["188","Mel Meal","Ross Roast"],["189","Brenda Blender","Juicy Lucy"],["190","Gory Rory","Gil Grill"],["191","Ben Bolt","Fried Franklin"],["192","Delicate Tess","Hamburger Pattie"],["193","Shattered Shelby","Cracked Craig"],["194","Nasty Nancy","Razzin' Roslyn"],["195","Lucas Mucus","Dotty Dribble"],["196","Dangling Dolly","Surreal Neal"],
      ["197","Doughy Joey","Starchy Archie"],["198","Gore May","Connie Sewer"],["199","Ruptured Rupert","Gassy Gus"],["200","Flouride Floyd","Dental Daniel"],["201","Michael Mutant","Zeke Freak"],["202","Ultra Violet","Tanya Hide"],["203","Toothie Ruthie","Dental Flossie"],["204","Jules Drools","Kit Spit"],["205","Hot Rod","Bud Buggy"],["206","Deaf Geoff","Audio Augie"],
    ],
  },
  {
    name: "Chrome Series 6", year: 2023, series: "Chrome Series",
    release_date: "August 2023", artists: "John Pound, Tom Bunk, James Warhola (original OS art)",
    notable: "Chrome OS6 cards (207-250) plus new Chrome exclusives. Features color error cards and C-name variations.",
    description: "Chrome Series 6 chromes the OS6 cards (207-250) plus new exclusives with the most parallels of any Chrome set to date.",
    imageFolder: "cs6", cards: [
      ["207","Over Flo","Moist Joyce"],["208","Joel Hole","Teed-Off Tom"],["209","Whacked-Up Wally","Paddlin' Madeline"],["210","Intense Payne","First Ada"],["211","See More Seymour","Coy Roy"],["212","Upliftin' Clifton","Air-Head Jed"],["213","Otto Whack","Elliot Mess"],["214","Off-Color Clara","Brushed-Off Brenda"],["215","Gnawing Nora","Nervous Nellie"],["216","Tiny Tim","Small Saul"],
      ["217","Trashy Trudy","Rose Dispose"],["218","Tom Thumb","Bridget Digit"],["219","George Washingdone","Pressed Preston"],["220","Joan Clone","Warty Ward"],["221","Cracked Crystal","Shrill Jill"],["222","Troy Toy","Loose Spring"],["223","Lolly Poppy","Lily Popped"],["224","Michael Idol","Pagan Megan"],["225","Nasal Hazel","Snotty Lottie"],["226","Pierced Pearl","Cheap Jewel"],
      ["227","Bea Sting","Screaming Mimi"],["228","Casper Gasper","Uncool Carl"],["229","Claire Stare","Bloodshot Scott"],["230","Manuel Labor","Handy Andy"],["231","Ashley Tray","Bernie Burns"],["232","Pam Ham","Cole Cut"],["233","Wes Mess","Trash-Can Ken"],["234","Harry Canary","Burt Cage"],["235","Ugly Hans","Jan Hand"],["236","Trina Cleaner","Suckin' Sybil"],
      ["237","Totaled Todd","Towin' Owen"],["238","Marc Spark","Cherry Bomb"],["239","Jerry Atric","Abraham Wrinklin'"],["240","Radar Ray","Eve Droppin'"],["241","Old Gloria","Jose Can You See"],["242","Clean Maureen","Dryin' Ryan"],["243","Lee Tree","Sherwood Forest"],["244","Welcome Matt","Muddy Maud"],["245","Shish K. Bob","Barbie Q."],["246","John John","Flushing Floyd"],
      ["247","Rusty Heap","Rustin' Justin"],["248","Hector Collector","G.P. Kay"],["249","Many Lenny","Lotta Carlotta"],["250","Newly-Dead Ed","Dyna Mike"],
    ],
  },
  {
    name: "Chrome Series 7", year: 2025, series: "Chrome Series",
    release_date: "February 2025", artists: "John Pound, Tom Bunk, James Warhola (original OS art)",
    notable: "Chrome OS7 cards (251-292) plus 8 new All-New cards. The latest Chrome release with more parallels than any prior Chrome set.",
    description: "Chrome Series 7 continues the Chrome line with OS7 reprints (251-292) on premium chrome cardstock plus 8 new exclusive characters.",
    imageFolder: "cs7", cards: [
      ["251","Barfin' Barbara","Valerie Vomit"],["252","Milky Wayne","Dairy Cari"],["253","Russ Pus","Louise Squeeze"],["254","Chris Mess","Sandy Clod"],["255","On The Mark","Bull's Ira"],["256","Jack Pot","Monte Carlo"],["257","Cut-Up Carmen","Dotted Lionel"],["258","Mickey Mouths","Oral Laurel"],["259","Grilled Gil","Well Don"],["260","Adam Boom","Blasted Billy II"],
      ["261","Gooey Huey","Bobbi Booger"],["262","Brainless Bryan","Jughead Ted"],["263","Vincent Van Gone","Modern Art"],["264","Pete Seat","Noel Bowl"],["265","Curly Shirley","Blown Joan"],["266","Roy L. Flush","Shuffled Sherman"],["267","Tongue Tied Tina","Braided Brandy"],["268","Phil Grim","William Penned"],["269","Sharpened Sheena","Cranky Kristin"],["270","Cannibal Stu","Brewin' Bruno"],
      ["271","Bratty Maddy","Dirty Birdie"],["272","Elastic Elwood","Fletcher Stretcher"],["273","Haunted Forrest","Sappy Sarah"],["274","Reptilian Lillian","Jay Prey"],["275","Wheel Barry","Rollin' Roland"],["276","Vanessa Undresser","Banana Anna"],["277","Reuben Cube","Blockhead Blake"],["278","Have A Nice Dave","Miles Smiles"],["279","Short Mort","Noah Body"],["280","Shut-Up Sherwin","Filled up Philip"],
      ["281","Soured Howard","Paul Bunion"],["282","Screwey Dewey","Bent Brent"],["283","Alien Alan","Martian Marcia"],["284","Manny Heads","Max Stacks"],["285","Wind Sheila","Hit N' Ronni"],["286","Hayley Comet","June Moon"],["287","Christine Vaccine","Medi Kate"],["288","Grant Ant","Sticky Nikki"],["289","Stair Casey","Alexander The Grate"],["290","Busted Armand","Jim Nauseum"],
      ["291","Homer Runt","Screwball Lew"],["292","Staple Gunther","Clipped Claude"],
    ],
  },
  {
    name: "GPK Goes On Vacation", year: 2023, series: "Themed Sets",
    release_date: "February 2023", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "7 subsets, 100 base pairs. Features state quarter insert cards for all 50 US states (/99 each). Card 21 brings Nasty Nick/Evil Eddie on vacation.",
    description: "GPK Goes On Vacation takes the Garbage Pail Kids on a world tour with 200 base stickers (100 pairs). From beach mishaps to cruise ship chaos, roller coasters to road trips — every vacation nightmare gets the GPK treatment.",
    imageFolder: "vacation", cards: [
      ["1","Sand Potty Scotty","Jason Beach Basin"],["2","Cruisin' Susan","Cruise Ship Sherry"],["3","Rocko Fella","Slimey Riley"],["4","Poled Paul","Impaled Dale"],["5","Fightin' Phil","Furious Phyllis"],["6","Will You Shut Up!","Annoyed Andy"],["7","Peaked Pete","Mt. Everett"],["8","Hitch Hiker","Theo Thumb"],["9","Jackie Pot","Vivian Vegas"],["10","Lethal Cecil","Hunted Hunter"],
      ["11","Rain Forrest","Amad Amazon"],["12","Mobile Homer","Camper Cara"],["13","Lighter Than Aaron","Balloon Bailey"],["14","Suitcase Chase","Unstuffed Steffan"],["15","Esther Island","Stone-Faced Stella"],["16","Sandy Sandy","Bea Beach"],["17","Pooped Pierre","Grunting Gaston"],["18","Tyler Tanic","Bobbin' Bob"],["19","Artie of Massage","Shiat-Stu"],["20","Whirl Wendy","Tina Cup"],
      ["21","Nasty Nick","Evil Eddie"],["22","Wyatt Water","Rafting Rick"],["23","Scott Tub","Jacque Cuzzi"],["24","Ben Snorkeling","Fishy Fisher"],["25","Nutty Buddy","Plane Snack Pete"],["26","Tiki Bart","Mai Ty"],["27","Brain Les","Vacate Ted"],["28","Up Chuck","Gagging Gary"],["29","Conch Shelly","Oh Shawna"],["30","Frida Roam","Fastened Fanny"],
      ["31","Passed Porter","Denied Denny"],["32","Floral Laurel","Hawaii Howie"],["33","Hardwood Heidi","Unclogged Chloe"],["34","Rough Landon","Turbu Lance"],["35","Husky Howie","Carved Carlos"],["36","Gary Gas Pump","Fueled Floyd"],["37","Cliff Hanger","Clint Clinger"],["38","Tent Trent","Grey Pooped On"],["39","Garth Goyle","Norton Dame"],["40","Zipping Zeke","Weeee! Weaver"],
      ["41","Space Bill","Winnie Bago"],["42","Wallopped Wally","Crashin' Clark"],["43","Blow Holly","Snots Anya"],["44","Buried Barry","Beach Head Jed"],["45","Ari BNB","Bud n' Breakfast"],["46","Coco Nat","Cracked Zack"],["47","Cara Carousel","Claimed Clarice"],["48","Splash Milton","Log Flume Logan"],["49","Metal Ted","Heavy Harvey"],["50","Billie Bidet","Hygenic Heine"],
      ["51","Kerry On","Suit Cassie"],["52","Cowabunga Cal","Gnarly Niles"],["53","Lei Lou","Nate Strangulate"],["54","Sis Tina","Rowdy Renee"],["55","Twilight Joan","Airplane Jane"],["56","Observation Decker","Doan Look Down"],["57","Flighty Faith","Inflated Irena"],["58","Mask Off Maddie","Face Peel Fay"],["59","Pool Paul","Wet Wade"],["60","#Oopsie Daisy","#Missy-Stake"],
      ["61","Hank Ten","Wavy Davy"],["62","PalmTrina","Carrie Bean"],["63","Smoke Ken","Forrester Fire"],["64","Chet T-Shirt","Spring Brock"],["65","Hit the Rhoda","Lydia Liberty"],["66","Absconding Abby","Stealing Stella"],["67","Marty Cycle","Handlebar Howard"],["68","Bonnie Ears","Rockin' Roland"],["69","Drenched Dakota","State Parker"],["70","Urinate Ted","Pee King"],
      ["71","Feather Heather","Rita Rio"],["72","Coney Conner","Pier Pierre"],["73","Clogged Duane","Swirl Earl"],["74","Thelma Theme Park","Amusement Lark"],["75","Royal Guard","Palace Preston"],["76","Manny Eater","Chomped Chester"],["77","Water Ski Brie","Leaky Lindsay"],["78","Lava Flo","Melty Mel"],["79","Half Nelson","Summer Chillin'"],["80","Tour Reece","Guide Beck"],
      ["81","Sue Venir","Flo Rita"],["82","Canoe Lou","Deliver Vince"],["83","Horseback Holly","Holda Horses"],["84","Walker of Fame","Hollywood Woody"],["85","Skylar Ski Lift","Brad Taste"],["86","Hanna Lulu","Wai Kiki"],["87","Joan Henge","Last Juan Standing"],["88","Angela A-Roma","Fartin' Flora"],["89","Sailing Sal","Adrift Adrian"],["90","Tee-Vee Stevie","Geeky Gary"],
      ["91","Cole Faithful","Gusher Gus"],["92","Sun Bernie","Tanner Lines"],["93","Tourist Trapper","Scam Pam"],["94","Boozin Suzan","Winnie Wienerschnitzel"],["95","Leaning Lena","Posing Posey"],["96","Rollin' Rolland","Luggage Wheel Lee"],["97","Sly Sly","Sockin' Rocky"],["98","Wizarding Wanda","Universal Ursula"],["99","Adam Bomb","Murray Mural"],["100","Water Fallon","Cascading Casey"],
    ],
  },
  {
    name: "Intergoolactic Mayhem", year: 2023, series: "Themed Sets",
    release_date: "November 2023", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "6 subsets, 100 base pairs — all sci-fi themed. Parodies every major sci-fi franchise from Star Wars to Rick & Morty, Alien to Back to the Future.",
    description: "Intergoolactic Mayhem blasts GPK into outer space with 200 base stickers (100 pairs) parodying every sci-fi franchise imaginable — Star Trek, Star Wars, Alien, Terminator, Planet of the Apes, and more.",
    imageFolder: "goo_23", cards: [
      ["1","Mucus Moone","Leaky Luna"],["2","Smellin' Ellen","Rippin' Ripley"],["3","Oozing Otto","Gunky Greyson"],["4","Triumphant Taylor","Zealous Zaius"],["5","Repli-Kent","Blake Runner"],["6","Burnt Buck","Roasted Roger"],["7","Cratered Kramer","Moonscape Monroe"],["8","Devin Girl","Lynn-flated"],["9","Snake Drake","Disgorged George"],["10","Firefly Guy","Mal-content"],
      ["11","Ima Thermian","Lavender Laliari"],["12","Vogon Viktor","Demo-Lucian"],["13","Jocular Jumbo","Crusty Dusty"],["14","Celine Stack","Landon Lost"],["15","Logged-out Logan","Glow Gun Ron"],["16","Jupiter Drew","Lost N. Stace"],["17","Sinister Smith","Zany Zachary"],["18","Obliv-Ian","Hostile Harper"],["19","Viscous Vina","Shirley Sniffles"],["20","Mind Milt","Vulgar Vul-Ken"],
      ["21","Galvanized Gort","Stan Still"],["22","Eloi Stu","Forked Fanny"],["23","Atom Mick","Grady-oactive"],["24","Anna-matronic","Otto-mated"],["25","Unmasked Martin","Twilight Zayne"],["26","Horrible Hal","2001: A Space Ollie"],["27","Carved Carter","Mark Martian"],["28","Barbara Ella","Space Gal"],["29","Cy-Lon","Galactic Greg"],["30","Bogus Bill","Triumphant Ted"],
      ["31","Simon Said","Demolished Danny"],["32","Doctor Hugh","Dale Dalek"],["33","Fallout Boyd","Nuclear Walter"],["34","Leelou Loo","Ellie Element"],["35","Questing Quincy","Beryl Liam Sphere"],["36","Mad Maxine","Furious Furiosa"],["37","Marsha Attacks!","Norma Saunter"],["38","Holey Neo","Overconfident Connor"],["39","Mendel in Black","Wiped Will"],["40","Slurping Samus","Met Rosie"],
      ["41","Metrop-Lois","Maria Machine"],["42","Pacific Tim","Kai-Jude"],["43","Power Rana","Morphin' Maureen"],["44","Resident Eva","Alice Apart"],["45","Schwartzy Saul","Helmeted Henry"],["46","Starship Cooper","Wrecked Rico"],["47","Seven of Nina","Val Voyager"],["48","Tanked Tammy","Rebellious Rebecca"],["49","Savage Sarah","Terminating Teresa"],["50","Recalled Ryan","Deranged Doug"],
      ["51","Infrared Fred","Predator Prescott"],["52","Must-See Malcolm","Pried Ira"],["53","Bing Thing","Kill it Kurt"],["54","Bionic Byron","Si Borg"],["55","Zany Zed","Shunned Sean"],["56","Spacin' Jason","Floating Floyd"],["57","Knockout King","Dukin' Duke"],["58","Dorothy Droid","Baby-Bot Bobby"],["59","Mel Function","Wesley World"],["60","Pooting Paul","Bart Fart"],
      ["61","Chester Buster","Perry Site"],["62","Lucky Bucky","Robert Rabbit"],["63","Dan-Tastic","Parker Planet"],["64","Steve Starfighter","Lanced Lance"],["65","Warty Morty","Sick Rick"],["66","Attack Mac","Stretched Stanley"],["67","Limit Ted","Outer Chase"],["68","Battlefield Brad","Earthy Erik"],["69","Presidential Preston","Macho Monty"],["70","Jurassic Mark","Can't Reach Rich"],
      ["71","Judd Dread","Judge Ed"],["72","Herman A. Tor","I'll B. Jack"],["73","Ella-ment","5-octave Olivia"],["74","Ghost Buster","Paranormal Peter"],["75","Eddy Enterprise","Trekkie Bekki"],["76","A.I. Al","Mitch Mech"],["77","Allen Nation","Alien Nathan"],["78","Ava Tar","Ava Tara"],["79","Barf Ball Brian","Ace Balls"],["80","Barf Bot Bob","Robby Retch"],
      ["81","Conehead Carl","Cone Ned"],["82","Deformed Dana","Mutant Mulder"],["83","Digital Data","Brent Bot"],["84","Engineer Eric","Prometheus Pete"],["85","Extra Elliott","Terrestrial Thomas"],["86","Painting Pris","Half Paint Hannah"],["87","Hurley Hallie","Sick Celeste"],["88","Innerspace Jace","Diminutive Dennis"],["89","Kim Cardassian","Star Trekkinvillain"],["90","Dining Diana","Vivi V"],
      ["91","Mind Over Matt","Telly-kinesis"],["92","Multi Marty","Mack to the Future"],["93","Not Mine Mike","Denying Dylan"],["94","Perturbed Picard","Snowy Stewart"],["95","Quentin Leap","Quantum Lee"],["96","Ready Player Juan","Randy Player One"],["97","Scott Tub Time Machine","Time Jump John"],["98","Snow Pierce","Piercing Snow Sam"],["99","Total Re-Cal","Queasy Kuato"],["100","Twyla Zone","Beauty Bea"],
    ],
  },
  {
    name: "Kids At Play", year: 2024, series: "Themed Sets",
    release_date: "February 2024", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "7 subsets, 100 base pairs — playground and toy themed. Features Game Over (video game parodies), Ill Influencers, and GPK TCG subsets.",
    description: "Kids At Play is a playground and toy-themed set with 200 base stickers (100 pairs). From board games to video games, dolls to action figures — every childhood toy and game gets the GPK treatment.",
    imageFolder: "kap_24", cards: [
      ["1","Doug of War","Tug of Warren"],["2","Patchy Patricia","Merit Midge"],["3","Socked Simon","Beepin' Tom"],["4","Twirling Twyla","Lula Hoop"],["5","Block Ed","Toy Brock"],["6","Dress Upton","Disguised Guy"],["7","Tim Can","Telly Phone"],["8","Rotate Nate","Tip Top"],["9","Hyde and Seek","In Ward"],["10","Swinging Sallie","Resourceful Rita"],
      ["11","Cupped Cooper","Missing Missy"],["12","Scotty Screen Time","Obsessed Oskar"],["13","Sid and Spin","Sit and Sven"],["14","Dwire Swing","Defy Gravity Greg"],["15","Peter Paper","Airplane Jane"],["16","Jumping July","Sloppy Sloan"],["17","D & Dee","Dale Fire Club"],["18","Twisty Kristy","Curvy Carlie"],["19","Hugh Finder","Brainy Brandon"],["20","Sculpt Ted","Fred Food"],
      ["21","Tate Ball","Truthful Trudie"],["22","Connected Conner","4 in a Rowan"],["23","Kate Board","Tooth Lesley"],["24","Boxed Bo","Jack Attack"],["25","Fris Bea","Frisbee Frita"],["26","Pool Shark Mark","Billiard Willard"],["27","Connect Ted","Lee Go"],["28","Frog Hunter","Andy Phibian"],["29","Fetching Fletcher","Here Boyd"],["30","Floyd is Lava","Molten Maxwell"],
      ["31","Pretty Millie","Too Much Mindy"],["32","Willow Fight","Rocky Roxanne"],["33","Pinata Pierce","Whacked Wayne"],["34","Three Dean","Percy Prints"],["35","Barfin' Barbie","Malibu Mindy"],["36","Luna Balloon","Helium Liam"],["37","Carrie - Cature","Exaggerated Eloise"],["38","Loop de Lou","Die-cast Cary"],["39","Noah Clue","Victor Victim"],["40","Connor Cosplay","Alan Bomb"],
      ["41","Digging Darla","Hole to Chyna"],["42","Fun Cole","Petey Pop!"],["43","Puzzling Paula","Mazey Daisy"],["44","Bryce Mice","Trapped Trevor"],["45","Fisher Price","Doctor Derek"],["46","Rocky P. Scissors","Eddie Scissorhands"],["47","Roddy Coaster","Thrill Ryder"],["48","Silly Billy","Spray Trey"],["49","Sleepy Selena","PJ Party"],["50","Staring Spence","Lenny Leer"],
      ["51","Tea Patti","Dolly Date"],["52","Magnetic Vic","Wooly Willy"],["53","Andrew Dice","Tommy Tooth"],["54","Billy Putty","Stretchy Steven"],["55","Bouncing Byron","Hurlin' Henry"],["56","Bouncy Bill","Pogo Joe"],["57","Buster Balloon","Balloon Bite Mark"],["58","Chutes and Laddie","Shute and Larry"],["59","Claude Machine","Clay Claw"],["60","Double Heather","Patty Ball"],
      ["61","Dumpin' Darrel","Ploppy Porter"],["62","Eyeball Pit Pete","Ira Ball Pit"],["63","Garbage Gary","Toy Can Ken"],["64","Hatchi Mal","Hatchy Cathy"],["65","Horace Shoes","Horse Shoe Drew"],["66","Kinetic Sandy","Leaky Lita"],["67","Loelle Surprise","Surprise Suri"],["68","Magic Misty","Mixie Micki"],["69","Paul My Finger","Stank Hank"],["70","Poppy It","Bubble Fidget Bridget"],
      ["71","Potato Sack Ace","Shaq Sack"],["72","Ray Blades","Bey Wade"],["73","Rocket Rick","Launce Lance"],["74","Slip n' Sly","Slide Clyde"],["75","Spin Bryn","Tina Turn"],["76","Trampoline Trina","Tramp O' Lina"],["77","Treasure Xavier","Oozy Oscar"],["78","Twister Tyler","Broken Bradley"],["79","Walter Balloon","Splash Ash"],["80","Ripped Ryder","Sketchy Skeeter"],
      ["81","Beryl O. Monkey","Harry Hook Up"],["82","Blabby Gabby","Phony Fisher"],["83","Crayola Crandall","Colorful Carlton"],["84","Dart Gunner","Yoo Missed"],["85","Dee Won","Sneaky Minerva"],["86","Foos Bill","Jolted Jules"],["87","Holden Boogers","Robin Nostrils"],["88","Hot Wheeler","Mack Track"],["89","Jumpy Ginger","Ruthless Ruby"],["90","Kerri Ok","Spitting Onya"],
      ["91","Kurt Plunk","Plastic Pierce"],["92","Lawn Dot","Lona Darts"],["93","Peek a Boone","Defaced Grace"],["94","Poor Aman","Rick O'Shea"],["95","Popping Payne","Peppy Polly"],["96","Redd Rooter","Rick M. Stick Em'"],["97","Rhett Rover","Neil Armstrung"],["98","Ring Around Rosie","Stacked Stella"],["99","Un-Picked Parson","Sticky Micky"],["100","Wind Up Troy","Wanda Round"],
    ],
  },
  {
    name: "Worst 40th Anniversary", year: 2025, series: "Anniversary",
    release_date: "July 2025", artists: "Brent Engstrom, Joe Simko, David Gross, Mark Pingitore",
    notable: "The newest GPK set. 100 base cards featuring the 'worst' of 40 years of GPK — a greatest hits of the most iconic characters. A-side only base set.",
    description: "The Worst of GPK 40th Anniversary celebrates 40 years of Garbage Pail Kids with 100 base cards featuring the most iconic characters across all eras. This is the definitive 'greatest hits' collection.",
    imageFolder: "40th", cards: [
      ["1","Adam Bomb",null],["2","Ailin' Al",null],["3","Alice Island",null],["4","Alien Alan",null],["5","Alien Ian",null],["6","Ali Gator",null],["7","Art Apart",null],["8","Bad Breath Seth",null],["9","Barfin' Barbara",null],["10","Barfin' Bart",null],
      ["11","Beasty Boyd",null],["12","Ben Bolt",null],["13","Bony Tony",null],["14","Boozin' Bruce",null],["15","Brainy Janie",null],["16","Buggy Betty",null],["17","Catty Kathy",null],["18","Charlie Horse",null],["19","Clogged Duane",null],["20","Con Vic",null],
      ["21","Corroded Carl",null],["22","Cracked Jack",null],["23","Creepy Carol",null],["24","D. Jay",null],["25","Dangling Dolly",null],["26","Dead Ted",null],["27","Decapitated Hedy",null],["28","Dial-A-Twyla",null],["29","Disgustin' Justin",null],["30","Doomsday Dom",null],
      ["31","Double Heather",null],["32","Double Iris",null],["33","Drew Blood",null],["34","Drippy Dan",null],["35","Eerie Eric",null],["36","Fiery Francis",null],["37","Frank N. Stein",null],["38","Fryin' Ryan",null],["39","Fun Gus",null],["40","Ghastly Ashley",null],
      ["41","Gored Gordon",null],["42","Gorgeous George",null],["43","Grim Jim",null],["44","Hailey Comet",null],["45","Half-Nelson",null],["46","Heartless Hal",null],["47","Hector Collector",null],["48","Holly Wood",null],["49","Hot Scott",null],["50","Hurt Curt",null],
      ["51","Itchy Richie",null],["52","Jack O. Lantern",null],["53","Jolly Roger",null],["54","Jolted Joel",null],["55","Juicy Jessica",null],["56","Junkfood John",null],["57","Junky Jeff",null],["58","Kim Kong",null],["59","Leaky Lindsay",null],["60","Mad Mike",null],
      ["61","Meg A-Volt",null],["62","Meltin' Elton",null],["63","Michael Mutant",null],["64","Nasty Nick",null],["65","New Wave Dave",null],["66","Odd Todd",null],["67","Off-Color Clara",null],["68","On The Mark",null],["69","Patty Putty",null],["70","Phony Lisa",null],
      ["71","Potty Scotty",null],["72","Prickly Rick",null],["73","Rubber Robert",null],["74","Run Down Rhoda",null],["75","Russell Muscle",null],["76","Sally Suction",null],["77","Scalped Ralph",null],["78","Sewer Sue",null],["79","Seymour Barf",null],["80","Shish K. Bob",null],
      ["81","Sk8 Nate",null],["82","Slimy Sam",null],["83","Sloshed Josh",null],["84","Smelly Kelly",null],["85","Smelly Sally",null],["86","Starin' Darren",null],["87","Stormy Heather",null],["88","Sy Clops",null],["89","Tattoo Lou",null],["90","Tee-Vee Stevie",null],
      ["91","Trashed Tracy",null],["92","Unstitched Mitch",null],["93","Varicose Wayne",null],["94","Vermin Herman",null],["95","Virus Iris",null],["96","Weird Wendy",null],["97","Windy Winston",null],["98","Wrappin' Ruth",null],["99","Wrinkly Randy",null],["100","3-Dee",null],
    ],
  },
];

async function seed() {
  console.log(`Seeding ${sets.length} sets...\n`);
  for (const s of sets) {
    const { data: existing } = await supabase.from("sets").select("id").eq("name", s.name).single();
    if (existing) { console.log(`  ${s.name} already exists, skipping`); continue; }
    const totalCards = s.cards.some(([, , b]) => b === null) ? s.cards.length : s.cards.length * 2;
    const { data: newSet, error: setError } = await supabase.from("sets").insert({
      name: s.name, year: s.year, series: s.series, total_cards: totalCards,
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
